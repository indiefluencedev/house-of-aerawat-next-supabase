// app/api/auth/callback/route.js
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error_code = searchParams.get('error');
    const error_description = searchParams.get('error_description');

    // Handle OAuth errors
    if (error_code) {
      console.error('OAuth error:', error_code, error_description);
      return NextResponse.redirect(
        new URL(`/auth/login?error=${error_code}`, request.url)
      );
    }

    if (!code) {
      return NextResponse.redirect(
        new URL('/auth/login?error=no_code', request.url)
      );
    }

    const supabase = createSupabaseServerClient();

    // Exchange code for session
    const { data: sessionData, error: sessionError } =
      await supabase.auth.exchangeCodeForSession(code);

    if (sessionError) {
      console.error('Session exchange error:', sessionError);
      return NextResponse.redirect(
        new URL('/auth/login?error=session_error', request.url)
      );
    }

    if (!sessionData.user) {
      return NextResponse.redirect(
        new URL('/auth/login?error=no_user', request.url)
      );
    }

    // Check if this is email verification or Google OAuth
    const isEmailVerification =
      sessionData.user.app_metadata?.provider === 'email';
    const isGoogleAuth = sessionData.user.app_metadata?.provider === 'google';

    // For email verification, redirect to login page
    if (isEmailVerification) {
      // Create user profile if it doesn't exist
      try {
        console.log('[DEBUG] Checking for existing user profile', sessionData.user.id);
        const { data: existingProfile, error: profileFetchError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', sessionData.user.id)
          .single();
        console.log('[DEBUG] Profile fetch result', { existingProfile, profileFetchError });

        if (profileFetchError && profileFetchError.code !== 'PGRST116') {
          console.error('[DEBUG] Error fetching user profile:', profileFetchError);
          return NextResponse.redirect(
            new URL('/auth/login?error=profile_fetch_error', request.url)
          );
        }

        if (profileFetchError && profileFetchError.code === 'PGRST116') {
          // Profile does not exist, create it
          const profilePayload = {
            id: sessionData.user.id,
            email: sessionData.user.email,
            name: sessionData.user.user_metadata?.name || 'User',
            phone: sessionData.user.user_metadata?.phone || '',
            role: sessionData.user.user_metadata?.role || 'user',
            provider: sessionData.user.app_metadata?.provider || 'email',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          console.log('[DEBUG] Inserting new user profile', profilePayload);
          const { error: profileInsertError, data: profileInsertData } = await supabase
            .from('user_profiles')
            .insert([profilePayload])
            .select()
            .single();
          console.log('[DEBUG] Profile insert result', { profileInsertError, profileInsertData });
          if (profileInsertError) {
            console.error('[DEBUG] Error creating user profile:', profileInsertError);
            return NextResponse.redirect(
              new URL('/auth/login?error=profile_create_error', request.url)
            );
          }
        }
      } catch (profileError) {
        console.error('[DEBUG] Profile creation error:', profileError);
        return NextResponse.redirect(
          new URL('/auth/login?error=profile_create_error', request.url)
        );
      }
      return NextResponse.redirect(
        new URL('/auth/login?verified=true', request.url)
      );
    }

    // For Google OAuth, proceed with login
    if (isGoogleAuth) {
      // Set auth cookie for Google users
      const cookieStore = await cookies();
      cookieStore.set('supabase-auth-token', sessionData.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      // Create user profile if it doesn't exist
      try {
        console.log('[DEBUG] Checking for existing user profile', sessionData.user.id);
        const { data: existingProfile, error: profileFetchError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', sessionData.user.id)
          .single();
        console.log('[DEBUG] Profile fetch result', { existingProfile, profileFetchError });

        if (profileFetchError && profileFetchError.code !== 'PGRST116') {
          console.error('[DEBUG] Error fetching user profile:', profileFetchError);
          return NextResponse.redirect(
            new URL('/auth/login?error=profile_fetch_error', request.url)
          );
        }

        if (profileFetchError && profileFetchError.code === 'PGRST116') {
          // Profile does not exist, create it
          const profilePayload = {
            id: sessionData.user.id,
            email: sessionData.user.email,
            name: sessionData.user.user_metadata?.name || 'User',
            phone: sessionData.user.user_metadata?.phone || '',
            role: sessionData.user.user_metadata?.role || 'user',
            provider: sessionData.user.app_metadata?.provider || 'google',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          console.log('[DEBUG] Inserting new user profile', profilePayload);
          const { error: profileInsertError, data: profileInsertData } = await supabase
            .from('user_profiles')
            .insert([profilePayload])
            .select()
            .single();
          console.log('[DEBUG] Profile insert result', { profileInsertError, profileInsertData });
          if (profileInsertError) {
            console.error('[DEBUG] Error creating user profile:', profileInsertError);
            return NextResponse.redirect(
              new URL('/auth/login?error=profile_create_error', request.url)
            );
          }
        }
      } catch (profileError) {
        console.error('[DEBUG] Profile creation error:', profileError);
        return NextResponse.redirect(
          new URL('/auth/login?error=profile_create_error', request.url)
        );
      }

      // Check if user is admin based on email or user metadata
      const userEmail = sessionData.user.email;
      const isAdmin =
        sessionData.user.user_metadata?.role === 'admin' ||
        userEmail === 'admin@yourcompany.com'; // Replace with your admin email

      // Determine redirect based on role
      const redirectPath = isAdmin ? '/admin' : '/dashboard';
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }

    // Default fallback
    return NextResponse.redirect(new URL('/auth/login', request.url));
  } catch (error) {
    console.error('Callback error:', error);
    return NextResponse.redirect(
      new URL('/auth/login?error=callback_error', request.url)
    );
  }
}
