import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { serverAuthService } from '@/lib/services/authService';
import { productService } from '@/lib/services/productService';

/**
 * Verify admin authentication
 * @returns {Promise<Object>} Auth data object
 */
export async function verifyAdminAuth() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('user_id')?.value;
  const isAdmin = cookieStore.get('is_admin')?.value;

  if (!userId) {
    redirect('/auth/login');
  }

  if (isAdmin !== 'true') {
    redirect('/dashboard');
  }

  // Get admin user data
  const userResult = await serverAuthService.getUserById(userId);

  return {
    user: userResult.success ? userResult.user : null,
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
    const productsResult = await productService.getAllProducts();
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
