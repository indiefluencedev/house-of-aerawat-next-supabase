// app/api/auth/login/route.js - Login API endpoint
import { NextResponse } from 'next/server';
import { serverAuthService } from '@/lib/services/authService';

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Missing email or password' },
        { status: 400 }
      );
    }

    // Use the auth service to validate credentials
    const result = await serverAuthService.getUserFromCustomAuth(
      email,
      password
    );

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const { user } = result;

    // Create response with user data
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        is_admin: user.is_admin,
      },
      redirect: user.is_admin ? '/admin/dashboard' : '/dashboard',
    });

    // Set user session cookies
    response.cookies.set('user_id', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    response.cookies.set('is_admin', String(user.is_admin), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
