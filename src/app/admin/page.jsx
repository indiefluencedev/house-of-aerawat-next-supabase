'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/layouts/adminLayout';
import { AuthService } from '@/lib/services/authService';
import { AdminService } from '@/lib/services/adminDashboardService';
import {
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  Activity,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [adminStats, setAdminStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);

        // Check if user is authenticated and admin
        const isAuth = await AuthService.isAuthenticated();
        if (!isAuth) {
          router.push('/auth/login');
          return;
        }

        const isAdmin = await AuthService.isAdmin();
        if (!isAdmin) {
          router.push('/dashboard'); // Redirect to user dashboard
          return;
        }

        // Get current user
        const userData = await AuthService.getCurrentUser();
        setUser(userData);

        // Get admin dashboard stats
        const stats = await AdminService.getAdminStats();
        setAdminStats(stats);
      } catch (err) {
        console.error('Error fetching admin data:', err);
        setError('Failed to load admin data');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [router]);

  if (loading) {
    return (
      <AdminLayout>
        <div className='flex justify-center items-center h-64'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className='bg-red-50 border border-red-200 rounded-lg p-4 text-red-700'>
          {error}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className='space-y-6'>
        {/* Header */}
        <div className='bg-white rounded-lg shadow-sm p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-2xl font-bold text-gray-900'>
                Admin Dashboard
              </h1>
              <p className='text-gray-600'>
                Welcome back, {user?.profile?.name || user?.email}
              </p>
            </div>
            <div className='text-right'>
              <p className='text-sm text-gray-600'>Last login</p>
              <p className='text-gray-900'>{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <div className='bg-white rounded-lg shadow-sm p-6'>
            <div className='flex items-center'>
              <Users className='h-8 w-8 text-blue-600' />
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>Total Users</p>
                <p className='text-2xl font-bold text-gray-900'>
                  {adminStats?.totalUsers || 0}
                </p>
                <p className='text-xs text-green-600'>
                  +{adminStats?.newUsersThisMonth || 0} this month
                </p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-sm p-6'>
            <div className='flex items-center'>
              <Package className='h-8 w-8 text-green-600' />
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>
                  Total Products
                </p>
                <p className='text-2xl font-bold text-gray-900'>
                  {adminStats?.totalProducts || 0}
                </p>
                <p className='text-xs text-blue-600'>
                  {adminStats?.activeProducts || 0} active
                </p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-sm p-6'>
            <div className='flex items-center'>
              <ShoppingCart className='h-8 w-8 text-purple-600' />
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>
                  Total Orders
                </p>
                <p className='text-2xl font-bold text-gray-900'>
                  {adminStats?.totalOrders || 0}
                </p>
                <p className='text-xs text-orange-600'>
                  {adminStats?.pendingOrders || 0} pending
                </p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-sm p-6'>
            <div className='flex items-center'>
              <DollarSign className='h-8 w-8 text-green-600' />
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>
                  Total Revenue
                </p>
                <p className='text-2xl font-bold text-gray-900'>
                  ${adminStats?.totalRevenue || 0}
                </p>
                <p className='text-xs text-green-600'>
                  ${adminStats?.monthlyRevenue || 0} this month
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Analytics */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Recent Orders */}
          <div className='bg-white rounded-lg shadow-sm p-6'>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-xl font-bold text-gray-900'>Recent Orders</h2>
              <button className='text-blue-600 hover:text-blue-800 text-sm'>
                View all
              </button>
            </div>

            {adminStats?.recentOrders && adminStats.recentOrders.length > 0 ? (
              <div className='space-y-4'>
                {adminStats.recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'
                  >
                    <div>
                      <p className='font-medium text-gray-900'>
                        Order #{order.id}
                      </p>
                      <p className='text-sm text-gray-600'>
                        {order.user_email}
                      </p>
                    </div>
                    <div className='text-right'>
                      <p className='font-medium text-gray-900'>
                        ${order.total}
                      </p>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-center py-8'>
                <ShoppingCart className='h-12 w-12 text-gray-400 mx-auto mb-4' />
                <p className='text-gray-600'>No recent orders</p>
              </div>
            )}
          </div>

          {/* Top Products */}
          <div className='bg-white rounded-lg shadow-sm p-6'>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-xl font-bold text-gray-900'>Top Products</h2>
              <button className='text-blue-600 hover:text-blue-800 text-sm'>
                View all
              </button>
            </div>

            {adminStats?.topProducts && adminStats.topProducts.length > 0 ? (
              <div className='space-y-4'>
                {adminStats.topProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'
                  >
                    <div className='flex items-center'>
                      <div className='bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3'>
                        {index + 1}
                      </div>
                      <div>
                        <p className='font-medium text-gray-900'>
                          {product.name}
                        </p>
                        <p className='text-sm text-gray-600'>
                          ${product.price}
                        </p>
                      </div>
                    </div>
                    <div className='text-right'>
                      <p className='font-medium text-gray-900'>
                        {product.orders_count} orders
                      </p>
                      <p className='text-sm text-gray-600'>
                        {product.stock > 0
                          ? `${product.stock} in stock`
                          : 'Out of stock'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-center py-8'>
                <Package className='h-12 w-12 text-gray-400 mx-auto mb-4' />
                <p className='text-gray-600'>No product data available</p>
              </div>
            )}
          </div>
        </div>

        {/* System Status */}
        <div className='bg-white rounded-lg shadow-sm p-6'>
          <h2 className='text-xl font-bold text-gray-900 mb-4'>
            System Status
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='flex items-center p-4 bg-green-50 rounded-lg'>
              <CheckCircle className='h-5 w-5 text-green-600 mr-3' />
              <div>
                <p className='font-medium text-green-900'>Database</p>
                <p className='text-sm text-green-600'>Operational</p>
              </div>
            </div>

            <div className='flex items-center p-4 bg-green-50 rounded-lg'>
              <CheckCircle className='h-5 w-5 text-green-600 mr-3' />
              <div>
                <p className='font-medium text-green-900'>Authentication</p>
                <p className='text-sm text-green-600'>Operational</p>
              </div>
            </div>

            <div className='flex items-center p-4 bg-yellow-50 rounded-lg'>
              <AlertCircle className='h-5 w-5 text-yellow-600 mr-3' />
              <div>
                <p className='font-medium text-yellow-900'>Payment Gateway</p>
                <p className='text-sm text-yellow-600'>Checking...</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className='bg-white rounded-lg shadow-sm p-6'>
          <h2 className='text-xl font-bold text-gray-900 mb-4'>
            Quick Actions
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <button className='flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors'>
              <Package className='h-5 w-5 text-blue-600 mr-3' />
              <span className='font-medium text-blue-900'>Add Product</span>
            </button>

            <button className='flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors'>
              <Users className='h-5 w-5 text-green-600 mr-3' />
              <span className='font-medium text-green-900'>View Users</span>
            </button>

            <button className='flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors'>
              <ShoppingCart className='h-5 w-5 text-purple-600 mr-3' />
              <span className='font-medium text-purple-900'>View Orders</span>
            </button>

            <button className='flex items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors'>
              <Activity className='h-5 w-5 text-orange-600 mr-3' />
              <span className='font-medium text-orange-900'>Analytics</span>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
