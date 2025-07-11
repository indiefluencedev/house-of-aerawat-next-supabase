import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { ProductService } from '@/lib/services/productService';

/**
 * Verify admin authentication
 * @returns {Promise<Object>} Auth data object
 */
export async function verifyAdminAuth() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('supabase-auth-token')?.value;

  if (!authToken) {
    redirect('/auth/login');
  }

  const supabase = createSupabaseServerClient();

  // Get current session
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session) {
    redirect('/auth/login');
  }

  // Get user profile for role check
  const { data: user, error: userError } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  // Check auth metadata if profile doesn't exist
  let userRole = 'user';
  if (userError && userError.code === 'PGRST116') {
    userRole = session.user.user_metadata?.role || 'user';

    // Create profile from auth data if it doesn't exist
    const { data: newProfile } = await supabase
      .from('user_profiles')
      .insert([
        {
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.name || 'User',
          phone: session.user.user_metadata?.phone || '',
          role: userRole,
          provider: session.user.app_metadata?.provider || 'email',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    user = newProfile;
  } else if (userError) {
    redirect('/auth/login');
  } else {
    userRole = user.role;
  }

  // Check if user is admin
  if (userRole !== 'admin') {
    redirect('/dashboard');
  }

  return {
    user,
    isAdmin: true,
  };
}

/**
 * Fetch admin dashboard data
 * @param {string} startDate - Start date for analytics
 * @param {string} endDate - End date for analytics
 * @returns {Promise<Object>} Dashboard data
 */
export async function fetchAdminDashboardData(startDate, endDate) {
  try {
    // Get products count
    const productsResult = await ProductService.getAllProducts();
    const totalProducts = productsResult.success
      ? productsResult.products.length
      : 0;

    // Mock data for now - replace with actual database queries
    const dashboardData = {
      totalOrders: 0,
      totalRevenue: 0,
      totalProducts,
      totalCustomers: 0,
      recentOrders: [],
      dateRange: {
        startDate,
        endDate,
      },
    };

    return dashboardData;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return {
      totalOrders: 0,
      totalRevenue: 0,
      totalProducts: 0,
      totalCustomers: 0,
      recentOrders: [],
      dateRange: {
        startDate,
        endDate,
      },
    };
  }
}
