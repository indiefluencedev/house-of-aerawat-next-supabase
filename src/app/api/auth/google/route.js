// app/api/auth/google/route.js
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const supabase = createSupabaseServerClient();

    // Get the origin from the request
    const origin = request.headers.get('origin');

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      console.error('Google auth error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to initialize Google authentication' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      url: data.url,
    });
  } catch (error) {
    console.error('Google auth error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
