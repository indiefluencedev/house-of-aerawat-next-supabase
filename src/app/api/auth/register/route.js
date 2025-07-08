// app/api/auth/register/route.js
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, name, phone, password, confirmPassword } =
      await request.json();

    // Validation
    if (!email || !name || !phone || !password || !confirmPassword) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { success: false, error: 'Passwords do not match' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          error: 'Password must be at least 6 characters long',
        },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Phone validation (basic)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid 10-digit phone number' },
        { status: 400 }
      );
    }

    // Log registration data for debugging
    console.log('[DEBUG] Registration attempt for:', { email, name, phone });

    const supabase = createSupabaseServerClient();

    // Test database connection first
    try {
      const { data: testData, error: testError } = await supabase
        .from('user_profiles')
        .select('id')
        .limit(1);

      if (testError) {
        console.error('[DEBUG] Database connection test failed:', testError);
        // If user_profiles table doesn't exist, we might need to create it
        if (testError.code === 'PGRST116' || testError.message?.includes('relation "public.user_profiles" does not exist')) {
          return NextResponse.json(
            { success: false, error: 'Database not properly configured. Please contact support.' },
            { status: 500 }
          );
        }
      }
    } catch (dbError) {
      console.error('[DEBUG] Database test error:', dbError);
    }

    // Create user with Supabase Auth (stores in auth.users table)
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          phone,
          role: 'user', // Default role
        },
        emailRedirectTo: `${
          process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
        }/auth/callback`,
      },
    });

    if (authError) {
      console.error('[DEBUG] Auth error details:', {
        message: authError.message,
        status: authError.status,
        code: authError.code,
        details: authError
      });

      // Handle specific error cases
      if (authError.message?.includes('User already registered')) {
        return NextResponse.json(
          { success: false, error: 'An account with this email already exists' },
          { status: 400 }
        );
      }

      if (authError.message?.includes('Database error')) {
        return NextResponse.json(
          { success: false, error: 'Database configuration error. Please contact support.' },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { success: false, error: authError.message || 'Registration failed' },
        { status: 400 }
      );
    }

    if (!authData.user) {
      return NextResponse.json(
        { success: false, error: 'User creation failed' },
        { status: 500 }
      );
    }

    console.log('[DEBUG] User created successfully:', authData.user.id);

    // Note: Don't create user profile yet - wait for email verification
    // The profile will be created in the callback route after verification

    return NextResponse.json({
      success: true,
      message:
        'Registration successful! Please check your email for verification link.',
      needsVerification: true,
    });
  } catch (error) {
    console.error('[DEBUG] Registration error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
