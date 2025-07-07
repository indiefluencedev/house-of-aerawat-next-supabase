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

    const supabase = createSupabaseServerClient();

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
      console.error('Auth error:', authError);
      return NextResponse.json(
        { success: false, error: authError.message },
        { status: 400 }
      );
    }

    if (!authData.user) {
      return NextResponse.json(
        { success: false, error: 'User creation failed' },
        { status: 500 }
      );
    }

    // Note: Don't create user profile yet - wait for email verification
    // The profile will be created in the callback route after verification

    return NextResponse.json({
      success: true,
      message:
        'Registration successful! Please check your email for verification link.',
      needsVerification: true,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
