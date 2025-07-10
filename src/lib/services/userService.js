// lib/services/userService.js - User-specific operations
import { supabase } from '@/lib/supabase/client';

export class UserService {
  // Get user dashboard statistics
  static async getUserStats(userId) {
    try {
      const [ordersResult, wishlistResult, addressesResult] = await Promise.all(
        [
          // Get user orders
          supabase
            .from('orders')
            .select('id, total, status, created_at')
            .eq('user_id', userId)
            .order('created_at', { ascending: false }),

          // Get wishlist count
          supabase.from('wishlist').select('id').eq('user_id', userId),

          // Get addresses count
          supabase.from('user_addresses').select('id').eq('user_id', userId),
        ]
      );

      const orders = ordersResult.data || [];
      const wishlist = wishlistResult.data || [];
      const addresses = addressesResult.data || [];

      return {
        totalOrders: orders.length,
        wishlistCount: wishlist.length,
        addressCount: addresses.length,
        lastOrderDate: orders.length > 0 ? orders[0].created_at : null,
        recentOrders: orders.slice(0, 5), // Get last 5 orders
        totalSpent: orders.reduce(
          (sum, order) => sum + (parseFloat(order.total) || 0),
          0
        ),
      };
    } catch (error) {
      console.error('Error fetching user stats:', error);
      return {
        totalOrders: 0,
        wishlistCount: 0,
        addressCount: 0,
        lastOrderDate: null,
        recentOrders: [],
        totalSpent: 0,
      };
    }
  }

  // Get user orders
  static async getUserOrders(userId, limit = 10, offset = 0) {
    try {
      const { data: orders, error } = await supabase
        .from('orders')
        .select(
          `
          id,
          total,
          status,
          created_at,
          order_items (
            id,
            quantity,
            price,
            product_id,
            products (
              id,
              name,
              image_url
            )
          )
        `
        )
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) {
        throw error;
      }

      return { success: true, orders: orders || [] };
    } catch (error) {
      console.error('Error fetching user orders:', error);
      return { success: false, error: error.message, orders: [] };
    }
  }

  // Get user wishlist
  static async getUserWishlist(userId) {
    try {
      const { data: wishlist, error } = await supabase
        .from('wishlist')
        .select(
          `
          id,
          created_at,
          products (
            id,
            name,
            price,
            image_url,
            description
          )
        `
        )
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return { success: true, wishlist: wishlist || [] };
    } catch (error) {
      console.error('Error fetching user wishlist:', error);
      return { success: false, error: error.message, wishlist: [] };
    }
  }

  // Get user addresses
  static async getUserAddresses(userId) {
    try {
      const { data: addresses, error } = await supabase
        .from('user_addresses')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return { success: true, addresses: addresses || [] };
    } catch (error) {
      console.error('Error fetching user addresses:', error);
      return { success: false, error: error.message, addresses: [] };
    }
  }

  // Add new address
  static async addUserAddress(userId, addressData) {
    try {
      const { data: address, error } = await supabase
        .from('user_addresses')
        .insert([
          {
            user_id: userId,
            ...addressData,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      return { success: true, address };
    } catch (error) {
      console.error('Error adding user address:', error);
      return { success: false, error: error.message };
    }
  }

  // Update user address
  static async updateUserAddress(addressId, addressData) {
    try {
      const { data: address, error } = await supabase
        .from('user_addresses')
        .update({
          ...addressData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', addressId)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return { success: true, address };
    } catch (error) {
      console.error('Error updating user address:', error);
      return { success: false, error: error.message };
    }
  }

  // Delete user address
  static async deleteUserAddress(addressId) {
    try {
      const { error } = await supabase
        .from('user_addresses')
        .delete()
        .eq('id', addressId);

      if (error) {
        throw error;
      }

      return { success: true };
    } catch (error) {
      console.error('Error deleting user address:', error);
      return { success: false, error: error.message };
    }
  }

  // Update user profile
  static async updateUserProfile(userId, profileData) {
    try {
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .update({
          ...profileData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return { success: true, profile };
    } catch (error) {
      console.error('Error updating user profile:', error);
      return { success: false, error: error.message };
    }
  }

  // Get order by ID
  static async getOrderById(orderId, userId) {
    try {
      const { data: order, error } = await supabase
        .from('orders')
        .select(
          `
          id,
          total,
          status,
          created_at,
          shipping_address,
          payment_status,
          order_items (
            id,
            quantity,
            price,
            product_id,
            products (
              id,
              name,
              image_url,
              description
            )
          )
        `
        )
        .eq('id', orderId)
        .eq('user_id', userId)
        .single();

      if (error) {
        throw error;
      }

      return { success: true, order };
    } catch (error) {
      console.error('Error fetching order:', error);
      return { success: false, error: error.message };
    }
  }

  // Cancel order
  static async cancelOrder(orderId, userId) {
    try {
      const { data: order, error } = await supabase
        .from('orders')
        .update({
          status: 'cancelled',
          updated_at: new Date().toISOString(),
        })
        .eq('id', orderId)
        .eq('user_id', userId)
        .eq('status', 'pending') // Only allow cancellation of pending orders
        .select()
        .single();

      if (error) {
        throw error;
      }

      return { success: true, order };
    } catch (error) {
      console.error('Error canceling order:', error);
      return { success: false, error: error.message };
    }
  }
}
