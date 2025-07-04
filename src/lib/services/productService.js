// lib/services/productService.js - Product business logic
import { supabase } from '@/lib/supabase/client';
import { createSupabaseServerClient } from '@/lib/supabase/server';

/**
 * Client-side product functions
 */
export const productService = {
  // Get all products
  getAllProducts: async () => {
    try {
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return { success: true, products };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get product by ID
  getProductById: async (id) => {
    try {
      const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return { success: true, product };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    try {
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return { success: true, products };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Search products
  searchProducts: async (query) => {
    try {
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return { success: true, products };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
};

/**
 * Server-side product functions (for admin operations)
 */
export const serverProductService = {
  // Get products by category (server-side)
  getProductsByCategory: async (category) => {
    const supabase = createSupabaseServerClient();

    try {
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return { success: true, products };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Search products (server-side)
  searchProducts: async (query) => {
    const supabase = createSupabaseServerClient();

    try {
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return { success: true, products };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get all products (server-side)
  getAllProducts: async () => {
    const supabase = createSupabaseServerClient();

    try {
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return { success: true, products };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get product by ID (server-side)
  getProductById: async (id) => {
    const supabase = createSupabaseServerClient();

    try {
      const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return { success: true, product };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Create new product (admin only)
  createProduct: async (productData) => {
    const supabase = createSupabaseServerClient();

    try {
      const { data: product, error } = await supabase
        .from('products')
        .insert(productData)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return { success: true, product };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Update product (admin only)
  updateProduct: async (id, productData) => {
    const supabase = createSupabaseServerClient();

    try {
      const { data: product, error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return { success: true, product };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Delete product (admin only)
  deleteProduct: async (id) => {
    const supabase = createSupabaseServerClient();

    try {
      const { error } = await supabase.from('products').delete().eq('id', id);

      if (error) {
        throw new Error(error.message);
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
};
