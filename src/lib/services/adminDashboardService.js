// lib/services/adminDashboardService.js - Admin dashboard client-side service
import { supabase } from '@/lib/supabase/client';

export class AdminService {
  // Get admin dashboard statistics (client-side compatible)
  static async getAdminStats() {
    try {
      const response = await fetch('/api/admin/stats', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch admin stats');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      return {
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
  }

  // Get all users
  static async getAllUsers() {
    try {
      const response = await fetch('/api/admin/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return { success: false, error: error.message, users: [] };
    }
  }

  // Get all products
  static async getAllProducts() {
    try {
      const response = await fetch('/api/admin/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return { success: false, error: error.message, products: [] };
    }
  }

  // Get all orders
  static async getAllOrders() {
    try {
      const response = await fetch('/api/admin/orders', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      return { success: false, error: error.message, orders: [] };
    }
  }

  // Update user role
  static async updateUserRole(userId, role) {
    try {
      const response = await fetch(`/api/admin/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user role');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating user role:', error);
      return { success: false, error: error.message };
    }
  }

  // Update order status
  static async updateOrderStatus(orderId, status) {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating order status:', error);
      return { success: false, error: error.message };
    }
  }

  // Delete user
  static async deleteUser(userId) {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting user:', error);
      return { success: false, error: error.message };
    }
  }

  // Create product
  static async createProduct(productData) {
    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating product:', error);
      return { success: false, error: error.message };
    }
  }

  // Update product
  static async updateProduct(productId, productData) {
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating product:', error);
      return { success: false, error: error.message };
    }
  }

  // Delete product
  static async deleteProduct(productId) {
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting product:', error);
      return { success: false, error: error.message };
    }
  }
}
