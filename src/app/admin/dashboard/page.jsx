// app/admin/dashboard/page.jsx - Admin dashboard
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { adminService } from '@/lib/services/adminService';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('user_id')?.value;
  const isAdmin = cookieStore.get('is_admin')?.value;

  // If not logged in, redirect to login
  if (!userId) {
    redirect('/auth/login');
  }

  // If not admin, redirect to user dashboard
  if (isAdmin !== 'true') {
    redirect('/dashboard');
  }

  // Fetch dashboard stats
  const statsResult = await adminService.getDashboardStats();
  const stats = statsResult.success ? statsResult.stats : null;

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center py-6'>
            <h1 className='text-3xl font-bold text-gray-900'>
              Admin Dashboard
            </h1>
            <div className='flex items-center space-x-4'>
              <a
                href='/'
                className='text-[#6e1a1a] hover:text-[#5c1616] font-medium'
              >
                Home
              </a>
              <a
                href='/products'
                className='text-[#6e1a1a] hover:text-[#5c1616] font-medium'
              >
                Products
              </a>
              <a
                href='/api/auth/logout'
                className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition'
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Stats Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <div className='bg-white rounded-lg shadow p-6'>
            <h3 className='text-lg font-medium text-gray-900 mb-2'>
              Total Users
            </h3>
            <p className='text-3xl font-bold text-[#6e1a1a]'>
              {stats?.totalUsers || 0}
            </p>
          </div>

          <div className='bg-white rounded-lg shadow p-6'>
            <h3 className='text-lg font-medium text-gray-900 mb-2'>
              Total Products
            </h3>
            <p className='text-3xl font-bold text-[#6e1a1a]'>
              {stats?.totalProducts || 0}
            </p>
          </div>

          <div className='bg-white rounded-lg shadow p-6'>
            <h3 className='text-lg font-medium text-gray-900 mb-2'>
              Wishlist Items
            </h3>
            <p className='text-3xl font-bold text-[#6e1a1a]'>
              {stats?.totalWishlistItems || 0}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
          <a
            href='/admin/products'
            className='bg-white rounded-lg shadow p-6 hover:shadow-md transition text-center'
          >
            <h3 className='text-lg font-medium text-gray-900 mb-2'>
              Manage Products
            </h3>
            <p className='text-sm text-gray-600'>
              Add, edit, or delete products
            </p>
          </a>

          <a
            href='/admin/users'
            className='bg-white rounded-lg shadow p-6 hover:shadow-md transition text-center'
          >
            <h3 className='text-lg font-medium text-gray-900 mb-2'>
              Manage Users
            </h3>
            <p className='text-sm text-gray-600'>
              View and manage user accounts
            </p>
          </a>

          <a
            href='/admin/orders'
            className='bg-white rounded-lg shadow p-6 hover:shadow-md transition text-center'
          >
            <h3 className='text-lg font-medium text-gray-900 mb-2'>Orders</h3>
            <p className='text-sm text-gray-600'>View and manage orders</p>
          </a>

          <a
            href='/admin/settings'
            className='bg-white rounded-lg shadow p-6 hover:shadow-md transition text-center'
          >
            <h3 className='text-lg font-medium text-gray-900 mb-2'>Settings</h3>
            <p className='text-sm text-gray-600'>Configure site settings</p>
          </a>
        </div>

        {/* Recent Activity */}
        <div className='bg-white rounded-lg shadow'>
          <div className='px-6 py-4 border-b border-gray-200'>
            <h2 className='text-xl font-semibold text-gray-900'>
              Recent Activity
            </h2>
          </div>
          <div className='p-6'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              <div>
                <h3 className='text-lg font-medium text-gray-900 mb-4'>
                  Recent Users
                </h3>
                <div className='space-y-3'>
                  <div className='flex items-center justify-between py-2 border-b border-gray-100'>
                    <span className='text-sm font-medium text-gray-900'>
                      John Doe
                    </span>
                    <span className='text-xs text-gray-500'>2 hours ago</span>
                  </div>
                  <div className='flex items-center justify-between py-2 border-b border-gray-100'>
                    <span className='text-sm font-medium text-gray-900'>
                      Jane Smith
                    </span>
                    <span className='text-xs text-gray-500'>5 hours ago</span>
                  </div>
                  <div className='flex items-center justify-between py-2 border-b border-gray-100'>
                    <span className='text-sm font-medium text-gray-900'>
                      Mike Johnson
                    </span>
                    <span className='text-xs text-gray-500'>1 day ago</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className='text-lg font-medium text-gray-900 mb-4'>
                  Recent Products
                </h3>
                <div className='space-y-3'>
                  <div className='flex items-center justify-between py-2 border-b border-gray-100'>
                    <span className='text-sm font-medium text-gray-900'>
                      Silver Necklace
                    </span>
                    <span className='text-xs text-gray-500'>1 hour ago</span>
                  </div>
                  <div className='flex items-center justify-between py-2 border-b border-gray-100'>
                    <span className='text-sm font-medium text-gray-900'>
                      Gold Bracelet
                    </span>
                    <span className='text-xs text-gray-500'>3 hours ago</span>
                  </div>
                  <div className='flex items-center justify-between py-2 border-b border-gray-100'>
                    <span className='text-sm font-medium text-gray-900'>
                      Diamond Ring
                    </span>
                    <span className='text-xs text-gray-500'>6 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
