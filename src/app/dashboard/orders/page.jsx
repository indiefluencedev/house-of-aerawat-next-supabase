// app/dashboard/orders/page.jsx - User orders page
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { serverAuthService } from '@/lib/services/authService';
import UserLayout from '@/components/layouts/userLayout';

export const dynamic = 'force-dynamic';

export default async function UserOrders() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('user_id')?.value;
  const isAdmin = cookieStore.get('is_admin')?.value;

  // If not logged in, redirect to login
  if (!userId) {
    redirect('/auth/login');
  }

  // If admin, redirect to admin dashboard
  if (isAdmin === 'true') {
    redirect('/admin/dashboard');
  }

  // Get user data and orders
  const userResult = await serverAuthService.getUserById(userId);
  const user = userResult.success ? userResult.user : null;

  return (
    <UserLayout user={user}>
      <div className='px-6 pt-4'>
        <h3 className='text-xl font-semibold'>My Orders</h3>
      </div>

      <div className='p-6 flex-grow'>
        <div className='bg-white rounded-lg shadow'>
          <div className='p-8 text-center'>
            <div className='mx-auto mb-6 w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center'>
              <svg
                className='w-8 h-8 text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
                />
              </svg>
            </div>

            <h3 className='text-lg font-medium text-gray-900 mb-2'>
              No Orders Yet!
            </h3>
            <p className='text-sm text-gray-600 mb-6'>
              You haven't placed any orders yet. Start shopping to see your
              order history here.
            </p>

            <a
              href='/products'
              className='bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors'
            >
              Start Shopping
            </a>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
