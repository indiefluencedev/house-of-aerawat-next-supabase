// lib/services/authService.js - Authentication business logic
import { supabase } from '@/lib/supabase/client';
import { createSupabaseServerClient } from '@/lib/supabase/server';

/**
 * Client-side authentication functions
 */
export const authService = {
  // Sign up with email/password
  signUp: async (userData) => {
    const { email, password, name, phone } = userData;

    try {
      // Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            phone: phone,
          },
        },
      });

      if (authError) {
        throw new Error(authError.message);
      }

      return { success: true, user: authData.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Sign in with email/password
  signIn: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      return { success: true, user: data.user, session: data.session };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Sign out
  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw new Error(error.message);
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get current session
  getSession: async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        throw new Error(error.message);
      }

      return { success: true, session };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get current user profile
  getCurrentUser: async () => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        throw new Error(error.message);
      }

      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
};

/**
 * Server-side authentication functions
 */
export const serverAuthService = {
  // Get user from custom auth_users table (for backward compatibility)
  getUserFromCustomAuth: async (email, password) => {
    const supabase = createSupabaseServerClient();

    try {
      const { data: user, error } = await supabase
        .from('auth_users')
        .select('id, email, name, phone_number, is_admin')
        .eq('email', email)
        .eq('password', password) // Note: This should be hashed in production
        .single();

      if (error || !user) {
        return { success: false, error: 'Invalid credentials' };
      }

      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Create user in custom auth_users table
  createUserInCustomAuth: async (userData) => {
    const supabase = createSupabaseServerClient();
    const { email, name, phone, password } = userData;

    try {
      // Check if user already exists
      const { data: existingUser } = await supabase
        .from('auth_users')
        .select('id')
        .eq('email', email)
        .single();

      if (existingUser) {
        return { success: false, error: 'User already exists' };
      }

      // Create new user
      const { data: newUser, error } = await supabase
        .from('auth_users')
        .insert({
          email,
          name,
          phone_number: phone,
          password, // Note: This should be hashed in production
          is_admin: false,
        })
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get user by ID from custom auth_users table
  getUserById: async (userId) => {
    const supabase = createSupabaseServerClient();

    try {
      const { data: user, error } = await supabase
        .from('auth_users')
        .select('id, email, name, phone_number, is_admin, created_at')
        .eq('id', userId)
        .single();

      if (error || !user) {
        return { success: false, error: 'User not found' };
      }

      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
};
