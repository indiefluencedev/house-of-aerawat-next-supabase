// app/api/auth/register/route.js - Registration API endpoint
import { NextResponse } from 'next/server';
import { serverAuthService } from '@/lib/services/authService';

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, name, phone, password, confirmPassword } = body;

    // Validate required fields
    if (!email || !name || !phone || !password || !confirmPassword) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      );
    }

    // Use the auth service to create user
    const result = await serverAuthService.createUserInCustomAuth({
      email,
      name,
      phone,
      password,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
    });
  } catch (error) {
    console.error('Registration API error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
