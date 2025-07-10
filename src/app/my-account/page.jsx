'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UserLayout from '@/components/layouts/userLayout';
import { AuthService } from '@/lib/services/authService';
import { UserService } from '@/lib/services/userService';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  Heart,
  Settings,
  Calendar,
} from 'lucide-react';

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        // Check if user is authenticated
        const isAuth = await AuthService.isAuthenticated();
        if (!isAuth) {
          router.push('/auth/login');
          return;
        }

        // Get current user
        const userData = await AuthService.getCurrentUser();
        if (!userData) {
          router.push('/auth/login');
          return;
        }

        setUser(userData);

        // Get user dashboard stats
        const stats = await UserService.getUserStats(userData.id);
        setUserStats(stats);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  if (loading) {
    return (
      <UserLayout>
        <div className='flex justify-center items-center h-64'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
        </div>
      </UserLayout>
    );
  }

  if (error) {
    return (
      <UserLayout>
        <div className='bg-red-50 border border-red-200 rounded-lg p-4 text-red-700'>
          {error}
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout user={user}>
      <div className='space-y-6'>
        {/* Header */}
        <div className='bg-white rounded-lg shadow-sm p-6'>
          <div className='flex items-center space-x-4'>
            <div className='bg-blue-100 p-3 rounded-full'>
              <User className='h-8 w-8 text-blue-600' />
            </div>
            <div>
              <h1 className='text-2xl font-bold text-gray-900'>
                Welcome back, {user?.profile?.name || user?.email}!
              </h1>
              <p className='text-gray-600'>
                Member since {new Date(user?.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <div className='bg-white rounded-lg shadow-sm p-6'>
            <div className='flex items-center'>
              <Package className='h-8 w-8 text-blue-600' />
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>
                  Total Orders
                </p>
                <p className='text-2xl font-bold text-gray-900'>
                  {userStats?.totalOrders || 0}
                </p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-sm p-6'>
            <div className='flex items-center'>
              <Heart className='h-8 w-8 text-red-600' />
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>
                  Wishlist Items
                </p>
                <p className='text-2xl font-bold text-gray-900'>
                  {userStats?.wishlistCount || 0}
                </p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-sm p-6'>
            <div className='flex items-center'>
              <MapPin className='h-8 w-8 text-green-600' />
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>
                  Saved Addresses
                </p>
                <p className='text-2xl font-bold text-gray-900'>
                  {userStats?.addressCount || 0}
                </p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-sm p-6'>
            <div className='flex items-center'>
              <Calendar className='h-8 w-8 text-purple-600' />
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>Last Order</p>
                <p className='text-sm font-bold text-gray-900'>
                  {userStats?.lastOrderDate
                    ? new Date(userStats.lastOrderDate).toLocaleDateString()
                    : 'No orders yet'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className='bg-white rounded-lg shadow-sm p-6'>
          <h2 className='text-xl font-bold text-gray-900 mb-4'>
            Account Information
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-4'>
              <div className='flex items-center space-x-3'>
                <Mail className='h-5 w-5 text-gray-400' />
                <div>
                  <p className='text-sm font-medium text-gray-600'>Email</p>
                  <p className='text-gray-900'>{user?.email}</p>
                </div>
              </div>

              <div className='flex items-center space-x-3'>
                <Phone className='h-5 w-5 text-gray-400' />
                <div>
                  <p className='text-sm font-medium text-gray-600'>Phone</p>
                  <p className='text-gray-900'>
                    {user?.profile?.phone || 'Not provided'}
                  </p>
                </div>
              </div>
            </div>

            <div className='space-y-4'>
              <div className='flex items-center space-x-3'>
                <User className='h-5 w-5 text-gray-400' />
                <div>
                  <p className='text-sm font-medium text-gray-600'>Name</p>
                  <p className='text-gray-900'>
                    {user?.profile?.name || 'Not provided'}
                  </p>
                </div>
              </div>

              <div className='flex items-center space-x-3'>
                <Settings className='h-5 w-5 text-gray-400' />
                <div>
                  <p className='text-sm font-medium text-gray-600'>
                    Account Type
                  </p>
                  <p className='text-gray-900 capitalize'>
                    {user?.role || 'user'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className='bg-white rounded-lg shadow-sm p-6'>
          <h2 className='text-xl font-bold text-gray-900 mb-4'>
            Recent Orders
          </h2>
          {userStats?.recentOrders && userStats.recentOrders.length > 0 ? (
            <div className='space-y-4'>
              {userStats.recentOrders.map((order) => (
                <div
                  key={order.id}
                  className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'
                >
                  <div>
                    <p className='font-medium text-gray-900'>
                      Order #{order.id}
                    </p>
                    <p className='text-sm text-gray-600'>
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className='text-right'>
                    <p className='font-medium text-gray-900'>${order.total}</p>
                    <p className='text-sm text-gray-600 capitalize'>
                      {order.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center py-8'>
              <Package className='h-12 w-12 text-gray-400 mx-auto mb-4' />
              <p className='text-gray-600'>No orders yet</p>
              <button className='mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700'>
                Start Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  );
}
