// lib/actions/user-actions.js
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createSupabaseServerClientWithAuth } from '@/lib/supabase/server';

/**
 * Verify user authentication
 * @returns {Promise<Object>} Auth data object
 */
export async function verifyUserAuth() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('supabase-auth-token')?.value;

  if (!authToken) {
    redirect('/auth/login');
  }

  const supabase = await createSupabaseServerClientWithAuth();

  // Get current session
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session) {
    redirect('/auth/login');
  }

  // Get user profile
  const { data: user, error: userError } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  // Check auth metadata if profile doesn't exist
  let userRole = 'user';
  let userProfile = null;

  if (userError && userError.code === 'PGRST116') {
    userRole = session.user.user_metadata?.role || 'user';

    // Create profile from auth data if it doesn't exist
    const { data: newProfile } = await supabase
      .from('user_profiles')
      .insert([
        {
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.name || 'User',
          phone: session.user.user_metadata?.phone || '',
          role: userRole,
          provider: session.user.app_metadata?.provider || 'email',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    userProfile = newProfile;
  } else if (!userError) {
    userProfile = user;
    userRole = user.role;
  }

  return {
    success: true,
    user: session.user,
    profile: userProfile,
    role: userRole,
    session,
  };
}

/**
 * Get user dashboard statistics
 * @param {string} userId - User ID
 * @returns {Promise<Object>} User statistics
 */
export async function getUserDashboardStats(userId) {
  const supabase = await createSupabaseServerClientWithAuth();

  try {
    // Get user orders
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('id, total, status, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (ordersError) {
      throw ordersError;
    }

    // Get wishlist count
    const { count: wishlistCount, error: wishlistError } = await supabase
      .from('wishlist')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId);

    if (wishlistError) {
      throw wishlistError;
    }

    // Get addresses count
    const { count: addressCount, error: addressError } = await supabase
      .from('user_addresses')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId);

    if (addressError) {
      throw addressError;
    }

    return {
      success: true,
      totalOrders: orders?.length || 0,
      wishlistCount: wishlistCount || 0,
      addressCount: addressCount || 0,
      lastOrderDate: orders?.length > 0 ? orders[0].created_at : null,
      recentOrders: orders?.slice(0, 5) || [],
      totalSpent:
        orders?.reduce(
          (sum, order) => sum + (parseFloat(order.total) || 0),
          0
        ) || 0,
    };
  } catch (error) {
    console.error('Error fetching user dashboard stats:', error);
    return {
      success: false,
      error: error.message,
      totalOrders: 0,
      wishlistCount: 0,
      addressCount: 0,
      lastOrderDate: null,
      recentOrders: [],
      totalSpent: 0,
    };
  }
}

/**
 * Get user orders with pagination
 * @param {string} userId - User ID
 * @param {number} limit - Number of orders to fetch
 * @param {number} offset - Offset for pagination
 * @returns {Promise<Object>} User orders
 */
export async function getUserOrders(userId, limit = 10, offset = 0) {
  const supabase = await createSupabaseServerClientWithAuth();

  try {
    const { data: orders, error } = await supabase
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
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw error;
    }

    return {
      success: true,
      orders: orders || [],
    };
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return {
      success: false,
      error: error.message,
      orders: [],
    };
  }
}

/**
 * Get user wishlist
 * @param {string} userId - User ID
 * @returns {Promise<Object>} User wishlist
 */
export async function getUserWishlist(userId) {
  const supabase = await createSupabaseServerClientWithAuth();

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

    return {
      success: true,
      wishlist: wishlist || [],
    };
  } catch (error) {
    console.error('Error fetching user wishlist:', error);
    return {
      success: false,
      error: error.message,
      wishlist: [],
    };
  }
}

/**
 * Get user addresses
 * @param {string} userId - User ID
 * @returns {Promise<Object>} User addresses
 */
export async function getUserAddresses(userId) {
  const supabase = await createSupabaseServerClientWithAuth();

  try {
    const { data: addresses, error } = await supabase
      .from('user_addresses')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return {
      success: true,
      addresses: addresses || [],
    };
  } catch (error) {
    console.error('Error fetching user addresses:', error);
    return {
      success: false,
      error: error.message,
      addresses: [],
    };
  }
}

/**
 * Update user profile
 * @param {string} userId - User ID
 * @param {Object} profileData - Profile data to update
 * @returns {Promise<Object>} Updated profile
 */
export async function updateUserProfile(userId, profileData) {
  const supabase = await createSupabaseServerClientWithAuth();

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

    return {
      success: true,
      profile,
    };
  } catch (error) {
    console.error('Error updating user profile:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Add user address
 * @param {string} userId - User ID
 * @param {Object} addressData - Address data
 * @returns {Promise<Object>} Added address
 */
export async function addUserAddress(userId, addressData) {
  const supabase = await createSupabaseServerClientWithAuth();

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

    return {
      success: true,
      address,
    };
  } catch (error) {
    console.error('Error adding user address:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Update user address
 * @param {string} addressId - Address ID
 * @param {Object} addressData - Address data to update
 * @returns {Promise<Object>} Updated address
 */
export async function updateUserAddress(addressId, addressData) {
  const supabase = await createSupabaseServerClientWithAuth();

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

    return {
      success: true,
      address,
    };
  } catch (error) {
    console.error('Error updating user address:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Delete user address
 * @param {string} addressId - Address ID
 * @returns {Promise<Object>} Success status
 */
export async function deleteUserAddress(addressId) {
  const supabase = await createSupabaseServerClientWithAuth();

  try {
    const { error } = await supabase
      .from('user_addresses')
      .delete()
      .eq('id', addressId);

    if (error) {
      throw error;
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error deleting user address:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}
