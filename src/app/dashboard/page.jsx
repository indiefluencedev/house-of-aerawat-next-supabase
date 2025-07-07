// app/dashboard/page.jsx - User profile dashboard
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import UserLayout from '@/components/layouts/userLayout';

export const dynamic = 'force-dynamic';

export default async function UserDashboard() {
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

    if (newProfile) {
      // Use the newly created profile
      user = newProfile;
    } else {
      // Fallback to auth user data
      user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.user_metadata?.name || 'User',
        phone: session.user.user_metadata?.phone || '',
        role: session.user.user_metadata?.role || 'user',
      };
    }
  } else if (userError) {
    // Other error, redirect to login
    redirect('/auth/login');
  }

  // If admin, redirect to admin dashboard
  if (user.role === 'admin') {
    redirect('/admin');
  }

  return (
    <UserLayout user={user}>
      <div className='px-6 pt-4'>
        <h3 className='text-xl font-semibold'>Account Details</h3>
      </div>

      <div className='p-6 flex-grow'>
        {/* Profile Update Form */}
        <form className='space-y-6'>
          <div>
            <label className='block text-sm font-medium mb-2'>Full Name</label>
            <input
              type='text'
              name='fullName'
              defaultValue={user?.name || ''}
              className='p-3 bg-gray-50 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='Enter your full name'
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className='block text-sm font-medium mb-2'>
                Phone Number
              </label>
              <input
                type='tel'
                name='phoneNumber'
                defaultValue={user?.phone_number || ''}
                className='p-3 bg-gray-50 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='Enter your phone number'
              />
            </div>
            <div>
              <label className='block text-sm font-medium mb-2'>Email Id</label>
              <input
                type='email'
                name='email'
                defaultValue={user?.email || ''}
                className='p-3 bg-gray-50 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='Enter your email address'
              />
            </div>
          </div>

          <button
            type='submit'
            className='bg-[#14397C] text-white py-3 px-5 font-semibold rounded hover:bg-[#D4AF37] hover:text-[#14397C] transition disabled:opacity-50'
          >
            Update Profile
          </button>
        </form>

        {/* Password Change Form */}
        <div className='mt-8 pt-8 border-t border-gray-200'>
          <h3 className='text-xl font-semibold mb-6'>Change Password</h3>

          <form className='space-y-4 w-full'>
            <div>
              <label className='block text-sm font-medium mb-2'>
                Current Password
              </label>
              <input
                type='password'
                name='currentPassword'
                className='p-3 bg-gray-50 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='Enter current password'
              />
            </div>

            <div>
              <label className='block text-sm font-medium mb-2'>
                New Password
              </label>
              <input
                type='password'
                name='newPassword'
                className='p-3 bg-gray-50 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='Enter new password'
              />
            </div>

            <div>
              <label className='block text-sm font-medium mb-2'>
                Confirm New Password
              </label>
              <input
                type='password'
                name='confirmPassword'
                className='p-3 bg-gray-50 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='Confirm new password'
              />
            </div>

            <button
              type='submit'
              className='bg-[#14397C] text-white py-3 px-5 font-semibold rounded hover:bg-[#D4AF37] hover:text-[#14397C] transition disabled:opacity-50'
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
}
