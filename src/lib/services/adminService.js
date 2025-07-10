// lib/services/adminService.js - Admin business logic
import { createSupabaseServerClient } from '@/lib/supabase/server';

/**
 * Admin-only functions (server-side only)
 */
export const adminService = {
  // Get all users
  getAllUsers: async () => {
    const supabase = createSupabaseServerClient();

    try {
      const { data: users, error } = await supabase
        .from('auth_users')
        .select('id, email, name, phone_number, is_admin, created_at')
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return { success: true, users };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get user by ID
  getUserById: async (id) => {
    const supabase = createSupabaseServerClient();

    try {
      const { data: user, error } = await supabase
        .from('auth_users')
        .select('id, email, name, phone_number, is_admin, created_at')
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Update user admin status
  updateUserAdminStatus: async (userId, isAdmin) => {
    const supabase = createSupabaseServerClient();

    try {
      const { data: user, error } = await supabase
        .from('auth_users')
        .update({ is_admin: isAdmin })
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Delete user
  deleteUser: async (userId) => {
    const supabase = createSupabaseServerClient();

    try {
      const { error } = await supabase
        .from('auth_users')
        .delete()
        .eq('id', userId);

      if (error) {
        throw new Error(error.message);
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get dashboard statistics
  getDashboardStats: async () => {
    const supabase = createSupabaseServerClient();

    try {
      // Get total users
      const { count: totalUsers, error: usersError } = await supabase
        .from('auth_users')
        .select('*', { count: 'exact', head: true });

      if (usersError) {
        throw new Error(usersError.message);
      }

      // Get total products
      const { count: totalProducts, error: productsError } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

      if (productsError) {
        throw new Error(productsError.message);
      }

      // Get total wishlist items
      const { count: totalWishlistItems, error: wishlistError } = await supabase
        .from('wishlist')
        .select('*', { count: 'exact', head: true });

      if (wishlistError) {
        throw new Error(wishlistError.message);
      }

      return {
        success: true,
        stats: {
          totalUsers,
          totalProducts,
          totalWishlistItems,
        },
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get recent activity
  getRecentActivity: async (limit = 10) => {
    const supabase = createSupabaseServerClient();

    try {
      // Get recent users
      const { data: recentUsers, error: usersError } = await supabase
        .from('auth_users')
        .select('id, email, name, created_at')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (usersError) {
        throw new Error(usersError.message);
      }

      // Get recent products
      const { data: recentProducts, error: productsError } = await supabase
        .from('products')
        .select('id, name, created_at')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (productsError) {
        throw new Error(productsError.message);
      }

      return {
        success: true,
        recentUsers,
        recentProducts,
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get comprehensive admin dashboard statistics
  getAdminStats: async () => {
    const supabase = createSupabaseServerClient();

    try {
      // Get current date for monthly stats
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();
      const monthStart = new Date(
        currentYear,
        currentMonth - 1,
        1
      ).toISOString();

      // Get all statistics in parallel
      const [
        usersResult,
        productsResult,
        ordersResult,
        revenueResult,
        newUsersResult,
        activeProductsResult,
        pendingOrdersResult,
        monthlyRevenueResult,
        recentOrdersResult,
        topProductsResult,
      ] = await Promise.all([
        // Total users
        supabase
          .from('user_profiles')
          .select('id', { count: 'exact', head: true }),

        // Total products
        supabase.from('products').select('id', { count: 'exact', head: true }),

        // Total orders
        supabase.from('orders').select('id', { count: 'exact', head: true }),

        // Total revenue
        supabase.from('orders').select('total').eq('status', 'completed'),

        // New users this month
        supabase
          .from('user_profiles')
          .select('id', { count: 'exact', head: true })
          .gte('created_at', monthStart),

        // Active products
        supabase
          .from('products')
          .select('id', { count: 'exact', head: true })
          .eq('is_active', true),

        // Pending orders
        supabase
          .from('orders')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'pending'),

        // Monthly revenue
        supabase
          .from('orders')
          .select('total')
          .eq('status', 'completed')
          .gte('created_at', monthStart),

        // Recent orders
        supabase
          .from('orders')
          .select(
            `
            id,
            total,
            status,
            created_at,
            user_profiles (
              email,
              name
            )
          `
          )
          .order('created_at', { ascending: false })
          .limit(5),

        // Top products by order count
        supabase
          .from('order_items')
          .select(
            `
            product_id,
            quantity,
            products (
              id,
              name,
              price
            )
          `
          )
          .limit(100),
      ]);

      // Calculate totals
      const totalUsers = usersResult.count || 0;
      const totalProducts = productsResult.count || 0;
      const totalOrders = ordersResult.count || 0;
      const totalRevenue =
        revenueResult.data?.reduce(
          (sum, order) => sum + (parseFloat(order.total) || 0),
          0
        ) || 0;
      const newUsersThisMonth = newUsersResult.count || 0;
      const activeProducts = activeProductsResult.count || 0;
      const pendingOrders = pendingOrdersResult.count || 0;
      const monthlyRevenue =
        monthlyRevenueResult.data?.reduce(
          (sum, order) => sum + (parseFloat(order.total) || 0),
          0
        ) || 0;

      // Process recent orders
      const recentOrders =
        recentOrdersResult.data?.map((order) => ({
          id: order.id,
          total: parseFloat(order.total) || 0,
          status: order.status,
          created_at: order.created_at,
          user_email: order.user_profiles?.email || 'Unknown',
          user_name: order.user_profiles?.name || 'Unknown',
        })) || [];

      // Process top products
      const productOrderCounts = {};
      const productDetails = {};

      topProductsResult.data?.forEach((item) => {
        if (item.products) {
          const productId = item.product_id;
          productOrderCounts[productId] =
            (productOrderCounts[productId] || 0) + item.quantity;
          productDetails[productId] = item.products;
        }
      });

      const topProducts = Object.entries(productOrderCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([productId, count]) => ({
          id: productId,
          orders_count: count,
          ...productDetails[productId],
        }));

      return {
        success: true,
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue: Math.round(totalRevenue * 100) / 100,
        newUsersThisMonth,
        activeProducts,
        pendingOrders,
        monthlyRevenue: Math.round(monthlyRevenue * 100) / 100,
        recentOrders,
        topProducts,
      };
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      return {
        success: false,
        error: error.message,
        totalUsers: 0,
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
        newUsersThisMonth: 0,
        activeProducts: 0,
        pendingOrders: 0,
        monthlyRevenue: 0,
        recentOrders: [],
        topProducts: [],
      };
    }
  },
};
