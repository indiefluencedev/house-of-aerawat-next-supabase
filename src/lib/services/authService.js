// lib/services/authService.js
import {
  supabase,
  getCurrentSession,
  getCurrentUser,
} from '@/lib/supabase/client';

export class AuthService {
  // Get current authenticated user
  static async getCurrentUser() {
    try {
      const user = await getCurrentUser();

      if (!user) {
        return null;
      }

      // Get user profile for additional dashboard data
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user profile:', error);
        // Return user from auth.users with metadata if profile fetch fails
        return {
          ...user,
          profile: null,
          role: user.user_metadata?.role || 'user',
        };
      }

      // If profile doesn't exist, create it from auth user data
      if (error && error.code === 'PGRST116') {
        const { data: newProfile } = await supabase
          .from('user_profiles')
          .insert([
            {
              id: user.id,
              email: user.email,
              name: user.user_metadata?.name || 'User',
              phone: user.user_metadata?.phone || '',
              role: user.user_metadata?.role || 'user',
              provider: user.app_metadata?.provider || 'email',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ])
          .select()
          .single();

        return {
          ...user,
          profile: newProfile || null,
          role: newProfile?.role || user.user_metadata?.role || 'user',
        };
      }

      return {
        ...user,
        profile: profile || null,
        role: profile?.role || user.user_metadata?.role || 'user',
      };
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  // Check if user is authenticated
  static async isAuthenticated() {
    try {
      const session = await getCurrentSession();
      return !!session;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  }

  // Check if user is admin
  static async isAdmin() {
    try {
      const user = await this.getCurrentUser();
      return user?.role === 'admin';
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  }

  // Login with email and password
  static async login(email, password) {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error' };
    }
  }

  // Register new user
  static async register(userData) {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Network error' };
    }
  }

  // Logout user
  static async logout() {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      const data = await response.json();

      if (data.success) {
        // Clear client-side session
        await supabase.auth.signOut();

        // Redirect to home page
        window.location.href = '/';
      }

      return data;
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: 'Network error' };
    }
  }

  // Sign in with Google
  static async signInWithGoogle() {
    try {
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // No body needed
      });

      const data = await response.json();

      if (data.success && data.url) {
        // Redirect to Google OAuth URL
        window.location.href = data.url;
        return { success: true };
      }

      return data;
    } catch (error) {
      console.error('Google sign-in error:', error);
      return { success: false, error: 'Network error' };
    }
  }

  // Update user profile
  static async updateProfile(profileData) {
    try {
      const user = await getCurrentUser();

      if (!user) {
        return { success: false, error: 'Not authenticated' };
      }

      const { data, error } = await supabase
        .from('user_profiles')
        .update(profileData)
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Profile update error:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, error: 'Network error' };
    }
  }

  // Get user profile
  static async getProfile() {
    try {
      const user = await getCurrentUser();

      if (!user) {
        return { success: false, error: 'Not authenticated' };
      }

      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Profile fetch error:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      console.error('Profile fetch error:', error);
      return { success: false, error: 'Network error' };
    }
  }

  // Listen to auth state changes
  static onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
  }

  // Reset password
  static async resetPassword(email) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, message: 'Password reset email sent' };
    } catch (error) {
      console.error('Reset password error:', error);
      return { success: false, error: 'Network error' };
    }
  }

  // Update password
  static async updatePassword(password) {
    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, message: 'Password updated successfully' };
    } catch (error) {
      console.error('Update password error:', error);
      return { success: false, error: 'Network error' };
    }
  }
}

// Server-side auth service for SSR
export const serverAuthService = {
  // Get user by ID on server-side
  async getUserById(userId) {
    try {
      const { createSupabaseServerClient } = await import(
        '@/lib/supabase/server'
      );
      const supabase = createSupabaseServerClient();

      const { data: user, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user:', error);
        return { success: false, error: error.message };
      }

      return { success: true, user };
    } catch (error) {
      console.error('Server auth error:', error);
      return { success: false, error: 'Server error' };
    }
  },
};
