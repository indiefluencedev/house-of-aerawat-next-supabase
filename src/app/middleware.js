// middleware.js - Auth middleware for protected routes
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Skip middleware for API routes and static assets
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/assets/')
  ) {
    return NextResponse.next();
  }

  // Get auth token from cookies
  const token = request.cookies.get('supabase-auth-token')?.value;

  // Create Supabase client
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  let user = null;
  let userProfile = null;

  // Check if user is authenticated
  if (token) {
    try {
      const {
        data: { user: authUser },
        error,
      } = await supabase.auth.getUser(token);

      if (!error && authUser) {
        user = authUser;

        // Get user profile for role information (fallback to auth metadata)
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('role')
          .eq('id', authUser.id)
          .single();

        // Use profile role if available, otherwise use auth metadata
        userProfile = profile || {
          role: authUser.user_metadata?.role || 'user',
        };
      }
    } catch (error) {
      console.error('Auth check error:', error);
    }
  }

  // Protected routes that require authentication
  const protectedRoutes = ['/dashboard', '/admin', '/profile'];

  // Admin-only routes
  const adminRoutes = ['/admin'];

  // Check if current path is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

  // Redirect to login if accessing protected route without auth
  if (isProtectedRoute && !user) {
    const loginUrl = new URL('/auth/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Check admin access
  if (isAdminRoute && user) {
    if (!userProfile || userProfile.role !== 'admin') {
      const dashboardUrl = new URL('/dashboard', request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  // Redirect authenticated users away from auth pages
  if (
    user &&
    (pathname.startsWith('/auth/login') ||
      pathname.startsWith('/auth/register'))
  ) {
    const redirectUrl = userProfile?.role === 'admin' ? '/admin' : '/dashboard';
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - assets (static assets)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
  ],
};
