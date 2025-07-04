// app/api/auth/logout/route.js - Logout API endpoint
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Check if this is a direct navigation request (wants redirect) or API call (wants JSON)
    const contentType = request.headers.get('content-type');
    const acceptHeader = request.headers.get('accept');
    const isApiCall =
      contentType?.includes('application/json') ||
      acceptHeader?.includes('application/json');

    let response;

    if (isApiCall) {
      // API call - return JSON response
      response = NextResponse.json({
        success: true,
        message: 'Logged out successfully',
      });
    } else {
      // Direct navigation - redirect to home page
      response = NextResponse.redirect(new URL('/', request.url));
    }

    // Clear authentication cookies
    response.cookies.set('user_id', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // Expire immediately
    });

    response.cookies.set('is_admin', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // Expire immediately
    });

    return response;
  } catch (error) {
    console.error('Logout API error:', error);

    // Return appropriate error response
    const contentType = request.headers.get('content-type');
    const acceptHeader = request.headers.get('accept');
    const isApiCall =
      contentType?.includes('application/json') ||
      acceptHeader?.includes('application/json');

    if (isApiCall) {
      return NextResponse.json(
        { error: 'Something went wrong' },
        { status: 500 }
      );
    } else {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
}

export async function GET(request) {
  return POST(request);
}
