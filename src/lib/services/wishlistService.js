// lib/services/wishlistService.js - Wishlist business logic
import { supabase } from '@/lib/supabase/client';
import { createSupabaseServerClient } from '@/lib/supabase/server';

/**
 * Client-side wishlist functions
 */
export const wishlistService = {
  // Get user's wishlist
  getUserWishlist: async (userId) => {
    try {
      const { data: wishlistItems, error } = await supabase
        .from('wishlist')
        .select(
          `
          id,
          product_id,
          created_at,
          products (
            id,
            name,
            price,
            image_url,
            description,
            category
          )
        `
        )
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return { success: true, wishlistItems };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Add product to wishlist
  addToWishlist: async (userId, productId) => {
    try {
      // Check if item already exists
      const { data: existingItem } = await supabase
        .from('wishlist')
        .select('id')
        .eq('user_id', userId)
        .eq('product_id', productId)
        .single();

      if (existingItem) {
        return { success: false, error: 'Item already in wishlist' };
      }

      // Add to wishlist
      const { data: wishlistItem, error } = await supabase
        .from('wishlist')
        .insert({
          user_id: userId,
          product_id: productId,
        })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return { success: true, wishlistItem };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Remove product from wishlist
  removeFromWishlist: async (userId, productId) => {
    try {
      const { error } = await supabase
        .from('wishlist')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', productId);

      if (error) {
        throw new Error(error.message);
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Check if product is in wishlist
  isInWishlist: async (userId, productId) => {
    try {
      const { data: wishlistItem, error } = await supabase
        .from('wishlist')
        .select('id')
        .eq('user_id', userId)
        .eq('product_id', productId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw new Error(error.message);
      }

      return { success: true, isInWishlist: !!wishlistItem };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get wishlist count
  getWishlistCount: async (userId) => {
    try {
      const { count, error } = await supabase
        .from('wishlist')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);

      if (error) {
        throw new Error(error.message);
      }

      return { success: true, count };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
};

/**
 * Server-side wishlist functions
 */
export const serverWishlistService = {
  // Get user's wishlist (server-side)
  getUserWishlist: async (userId) => {
    const supabase = createSupabaseServerClient();

    try {
      const { data: wishlistItems, error } = await supabase
        .from('wishlist')
        .select(
          `
          id,
          product_id,
          created_at,
          products (
            id,
            name,
            price,
            image_url,
            description,
            category
          )
        `
        )
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return { success: true, wishlistItems };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Add to wishlist (server-side)
  addToWishlist: async (userId, productId) => {
    const supabase = createSupabaseServerClient();

    try {
      // Check if item already exists
      const { data: existingItem } = await supabase
        .from('wishlist')
        .select('id')
        .eq('user_id', userId)
        .eq('product_id', productId)
        .single();

      if (existingItem) {
        return { success: false, error: 'Item already in wishlist' };
      }

      // Add to wishlist
      const { data: wishlistItem, error } = await supabase
        .from('wishlist')
        .insert({
          user_id: userId,
          product_id: productId,
        })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return { success: true, wishlistItem };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Remove from wishlist (server-side)
  removeFromWishlist: async (userId, productId) => {
    const supabase = createSupabaseServerClient();

    try {
      const { error } = await supabase
        .from('wishlist')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', productId);

      if (error) {
        throw new Error(error.message);
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
};
