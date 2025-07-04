import { cookies } from 'next/headers';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('user_id')?.value;

  if (!userId) {
    return (
      <div className='p-10 text-center'>
        <p className='text-lg font-semibold'>You are not logged in.</p>
        <Link href='/login' className='text-blue-600 underline'>
          Go to Login
        </Link>
      </div>
    );
  }

  const supabase = createSupabaseServerClient();
  const { data: user } = await supabase
    .from('auth_users')
    .select('name, email, phone_number')
    .eq('id', userId)
    .single();

  return (
    <div className='max-w-xl mx-auto p-10'>
      <h1 className='text-3xl font-bold mb-6'>👤 Your Profile</h1>
      <p className='mb-2 text-lg'>
        Name: <strong>{user?.name || 'N/A'}</strong>
      </p>
      <p className='mb-2 text-lg'>
        Email: <strong>{user?.email}</strong>
      </p>
      <p className='mb-6 text-lg'>
        Phone: <strong>{user?.phone_number || 'N/A'}</strong>
      </p>

      <form action='/api/auth/logout' method='POST'>
        <button
          type='submit'
          className='bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700'
        >
          Logout
        </button>
      </form>
    </div>
  );
}
