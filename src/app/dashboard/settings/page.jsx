// app/dashboard/settings/page.jsx - User settings page
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import UserLayout from '@/components/layouts/userLayout';

export const dynamic = 'force-dynamic';

export default async function UserSettings() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('supabase-auth-token')?.value;

  // If not logged in, redirect to login
  if (!authToken) {
    redirect('/auth/login');
  }

  const supabase = createSupabaseServerClient();

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

  if (userError || !user) {
    redirect('/auth/login');
  }

  // If admin, redirect to admin dashboard
  if (user.role === 'admin') {
    redirect('/admin');
  }

  return (
    <UserLayout user={user}>
      <div className='px-6 pt-4'>
        <h3 className='text-xl font-semibold'>Settings</h3>
      </div>

      <div className='p-6 flex-grow'>
        <div className='space-y-6'>
          {/* Account Settings */}
          <div className='bg-white rounded-lg shadow p-6'>
            <h4 className='text-lg font-medium text-gray-900 mb-4'>
              Account Settings
            </h4>

            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='font-medium text-gray-900'>
                    Email Notifications
                  </p>
                  <p className='text-sm text-gray-600'>
                    Receive updates about your orders and account
                  </p>
                </div>
                <div className='flex items-center'>
                  <input
                    type='checkbox'
                    defaultChecked
                    className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                  />
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <div>
                  <p className='font-medium text-gray-900'>SMS Notifications</p>
                  <p className='text-sm text-gray-600'>
                    Get text messages about order updates
                  </p>
                </div>
                <div className='flex items-center'>
                  <input
                    type='checkbox'
                    className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                  />
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <div>
                  <p className='font-medium text-gray-900'>Marketing Emails</p>
                  <p className='text-sm text-gray-600'>
                    Receive promotional offers and updates
                  </p>
                </div>
                <div className='flex items-center'>
                  <input
                    type='checkbox'
                    className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className='bg-white rounded-lg shadow p-6'>
            <h4 className='text-lg font-medium text-gray-900 mb-4'>
              Privacy Settings
            </h4>

            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='font-medium text-gray-900'>
                    Profile Visibility
                  </p>
                  <p className='text-sm text-gray-600'>
                    Control who can see your profile information
                  </p>
                </div>
                <select className='border border-gray-300 rounded-md px-3 py-2 bg-white'>
                  <option>Private</option>
                  <option>Friends</option>
                  <option>Public</option>
                </select>
              </div>

              <div className='flex items-center justify-between'>
                <div>
                  <p className='font-medium text-gray-900'>Data Sharing</p>
                  <p className='text-sm text-gray-600'>
                    Allow us to share anonymized data for analytics
                  </p>
                </div>
                <div className='flex items-center'>
                  <input
                    type='checkbox'
                    className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className='bg-white rounded-lg shadow p-6 border-l-4 border-red-400'>
            <h4 className='text-lg font-medium text-red-900 mb-4'>
              Danger Zone
            </h4>

            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='font-medium text-red-900'>Delete Account</p>
                  <p className='text-sm text-red-600'>
                    Permanently delete your account and all associated data
                  </p>
                </div>
                <button className='bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors'>
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
