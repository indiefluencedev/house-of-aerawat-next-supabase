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
};
