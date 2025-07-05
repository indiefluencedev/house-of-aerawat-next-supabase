// app/admin/dashboard/page.jsx - Admin dashboard
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { adminService } from '@/lib/services/adminService';
import AdminLayout from '@/components/layouts/adminLayout';

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

  // Get admin data - uncomment when adminService is ready
  // const adminResult = await adminService.getAdminData();
  // const admin = adminResult.success ? adminResult.admin : null;

  return (
    <AdminLayout>
      <div className='space-y-6'>
        {/* Dashboard Header */}
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-bold text-gray-900'>Admin Dashboard</h1>
          <div className='text-sm text-gray-600'>Welcome back, Admin!</div>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <div className='bg-white p-6 rounded-lg shadow'>
            <h3 className='text-lg font-semibold text-gray-900'>
              Total Orders
            </h3>
            <p className='text-3xl font-bold text-blue-600'>0</p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow'>
            <h3 className='text-lg font-semibold text-gray-900'>
              Total Revenue
            </h3>
            <p className='text-3xl font-bold text-green-600'>$0</p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow'>
            <h3 className='text-lg font-semibold text-gray-900'>
              Total Products
            </h3>
            <p className='text-3xl font-bold text-purple-600'>0</p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow'>
            <h3 className='text-lg font-semibold text-gray-900'>
              Total Customers
            </h3>
            <p className='text-3xl font-bold text-orange-600'>0</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className='bg-white p-6 rounded-lg shadow'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>
            Recent Activity
          </h3>
          <div className='space-y-4'>
            <div className='flex items-center justify-between py-2 border-b'>
              <span className='text-gray-600'>New order #1001</span>
              <span className='text-sm text-gray-500'>2 hours ago</span>
            </div>
            <div className='flex items-center justify-between py-2 border-b'>
              <span className='text-gray-600'>
                Product added: Silver Anklet
              </span>
              <span className='text-sm text-gray-500'>1 day ago</span>
            </div>
            <div className='flex items-center justify-between py-2'>
              <span className='text-gray-600'>New customer registered</span>
              <span className='text-sm text-gray-500'>2 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
