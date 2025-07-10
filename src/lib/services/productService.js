import { supabase } from '../supabase/client';

export class ProductService {
  // Get all products with optional filtering
  static async getProducts(filters = {}) {
    try {
      let query = supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      // Apply category filter
      if (filters.category && filters.category !== 'All products') {
        query = query.eq('category', filters.category);
      }

      // Apply search filter
      if (filters.search) {
        query = query.ilike('name', `%${filters.search}%`);
      }

      // Apply pagination
      if (filters.page && filters.limit) {
        const from = (filters.page - 1) * filters.limit;
        const to = from + filters.limit - 1;
        query = query.range(from, to);
      }

      const { data, error, count } = await query;

      if (error) {
        throw error;
      }

      return {
        success: true,
        data,
        count,
        message: 'Products fetched successfully',
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to fetch products',
      };
    }
  }

  // Get single product by ID
  static async getProductById(id) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw error;
      }

      return {
        success: true,
        data,
        message: 'Product fetched successfully',
      };
    } catch (error) {
      console.error('Error fetching product:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to fetch product',
      };
    }
  }

  // Create new product
  static async createProduct(productData) {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([
          {
            name: productData.productName,
            description: productData.description,
            price: productData.price,
            category: productData.category,
            images: productData.images || [],
          },
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      return {
        success: true,
        data,
        message: 'Product created successfully',
      };
    } catch (error) {
      console.error('Error creating product:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to create product',
      };
    }
  }

  // Update product
  static async updateProduct(id, productData) {
    try {
      const { data, error } = await supabase
        .from('products')
        .update({
          name: productData.productName,
          description: productData.description,
          price: productData.price,
          category: productData.category,
          images: productData.images || [],
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return {
        success: true,
        data,
        message: 'Product updated successfully',
      };
    } catch (error) {
      console.error('Error updating product:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to update product',
      };
    }
  }

  // Delete product
  static async deleteProduct(id) {
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);

      if (error) {
        throw error;
      }

      return {
        success: true,
        message: 'Product deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting product:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to delete product',
      };
    }
  }

  // Get products by category
  static async getProductsByCategory(category) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return {
        success: true,
        data,
        message: 'Products fetched successfully',
      };
    } catch (error) {
      console.error('Error fetching products by category:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to fetch products',
      };
    }
  }

  // Get featured products (could be based on some criteria)
  static async getFeaturedProducts(limit = 6) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        throw error;
      }

      return {
        success: true,
        data,
        message: 'Featured products fetched successfully',
      };
    } catch (error) {
      console.error('Error fetching featured products:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to fetch featured products',
      };
    }
  }
}
