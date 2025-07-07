// app/dashboard/addresses/page.jsx - User addresses page
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import UserLayout from '@/components/layouts/userLayout';

export const dynamic = 'force-dynamic';

export default async function UserAddresses() {
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

  // Get user profile for dashboard display
  const { data: user, error: userError } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  // If profile doesn't exist, create it from auth user data
  let userProfile = user;
  if (userError && userError.code === 'PGRST116') {
    const { data: newProfile } = await supabase
      .from('user_profiles')
      .insert([
        {
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.name || 'User',
          phone: session.user.user_metadata?.phone || '',
          role: session.user.user_metadata?.role || 'user',
          provider: session.user.app_metadata?.provider || 'email',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    userProfile = newProfile || {
      id: session.user.id,
      email: session.user.email,
      name: session.user.user_metadata?.name || 'User',
      phone: session.user.user_metadata?.phone || '',
      role: session.user.user_metadata?.role || 'user',
    };
  } else if (userError) {
    redirect('/auth/login');
  }

  // If admin, redirect to admin dashboard
  if (userProfile?.role === 'admin') {
    redirect('/admin');
  }

  // Get user data and addresses

  return (
    <UserLayout user={userProfile}>
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
