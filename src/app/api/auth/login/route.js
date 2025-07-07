// app/api/auth/login/route.js
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const supabase = createSupabaseServerClient();

    // Sign in user (authenticates against auth.users table)
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) {
      console.error('Auth error:', authError);

      // Check if it's an email not confirmed error
      if (authError.message?.includes('Email not confirmed')) {
        return NextResponse.json(
          {
            success: false,
            error:
              'Please verify your email before logging in. Check your inbox for the verification link.',
          },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    if (!authData.user) {
      return NextResponse.json(
        { success: false, error: 'Authentication failed' },
        { status: 401 }
      );
    }

    // Check if email is verified for email providers
    if (
      authData.user.app_metadata?.provider === 'email' &&
      !authData.user.email_confirmed_at
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Please verify your email before logging in. Check your inbox for the verification link.',
        },
        { status: 401 }
      );
    }

    // Get user metadata for role determination
    const role = authData.user.user_metadata?.role || 'user';
    const displayName = authData.user.user_metadata?.name || 'User';

    // Set auth cookie
    const cookieStore = await cookies();
    cookieStore.set('supabase-auth-token', authData.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // Determine redirect based on role
    const redirectPath = role === 'admin' ? '/admin' : '/dashboard';

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: authData.user.id,
        email: authData.user.email,
        name: displayName,
        role: role,
      },
      redirect: redirectPath,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
