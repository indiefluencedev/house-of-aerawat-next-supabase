// app/dashboard/addresses/page.jsx - User addresses page
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { serverAuthService } from '@/lib/services/authService';
import UserLayout from '@/components/layouts/userLayout';

export const dynamic = 'force-dynamic';

export default async function UserAddresses() {
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

  // Get user data and addresses
  const userResult = await serverAuthService.getUserById(userId);
  const user = userResult.success ? userResult.user : null;

  return (
    <UserLayout user={user}>
      <div className='px-6 pt-4'>
        <h3 className='text-xl font-semibold'>My Addresses</h3>
      </div>

      <div className='p-6 flex-grow'>
        <div className='bg-white rounded-lg shadow min-h-[400px]'>
          <div className='flex flex-col items-center justify-center h-full px-6 py-12'>
            {/* Address Icon */}
            <div className='mb-6'>
              <svg
                className='w-16 h-16 text-blue-500'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                />
              </svg>
            </div>

            {/* No Saved Addresses Text */}
            <h3 className='text-lg font-medium text-gray-900 mb-2'>
              No Saved Addresses Yet!
            </h3>
            <p className='text-sm text-gray-600 mb-6'>
              Make checkout faster by adding one now.
            </p>

            {/* Add Address Button */}
            <button className='bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors'>
              Add Address
            </button>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
