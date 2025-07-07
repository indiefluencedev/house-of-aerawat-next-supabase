// app/api/auth/logout/route.js
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const supabase = createSupabaseServerClient();

    // Get current session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
      }
    }

    // Clear auth cookie
    const cookieStore = await cookies();
    cookieStore.delete('supabase-auth-token');

    return NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
