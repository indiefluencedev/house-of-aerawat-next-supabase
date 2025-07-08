// app/auth/callback/page.jsx - Simple redirect page
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // After email verification, redirect to login page with a success message
    const params = new URLSearchParams(window.location.search);
    if (params.get('type') === 'signup' || params.get('type') === 'email_confirm') {
      router.replace('/auth/login?verified=true');
    } else {
      router.replace('/auth/login');
    }
  }, [router]);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='max-w-md w-full space-y-8'>
        <div className='text-center'>
          <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
            Processing...
          </h2>
          <div className='mt-4'>
            <div className='flex justify-center'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
            </div>
            <p className='mt-2 text-sm text-gray-600'>
              Redirecting you to login...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
