// app/auth/callback/page.jsx - Simple redirect page
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // This page should not be accessed directly
    // All callback handling is done in the API route
    router.replace('/auth/login');
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

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function CallbackPage() {
  const [status, setStatus] = useState('processing');
  const [message, setMessage] = useState('Processing verification...');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleVerification = async () => {
      try {
        // Get access token from URL hash
        const hashParams = new URLSearchParams(
          window.location.hash.substring(1)
        );
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const type = hashParams.get('type');

        if (type === 'signup' && accessToken) {
          // Set the session with the tokens
          const {
            data: { session },
            error,
          } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) {
            setStatus('error');
            setMessage('Verification failed. Please try again.');
            return;
          }

          if (session?.user) {
            // Create user profile if it doesn't exist
            const { data: existingProfile } = await supabase
              .from('user_profiles')
              .select('id')
              .eq('id', session.user.id)
              .single();

            if (!existingProfile) {
              const { error: profileError } = await supabase
                .from('user_profiles')
                .insert([
                  {
                    id: session.user.id,
                    email: session.user.email,
                    name: session.user.user_metadata?.name || 'User',
                    phone: session.user.user_metadata?.phone || '',
                    role: 'user',
                    provider: 'email',
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                  },
                ]);

              if (profileError) {
                console.error('Profile creation error:', profileError);
              }
            }

            setStatus('success');
            setMessage(
              'Email verified successfully! Redirecting to dashboard...'
            );
            setTimeout(() => {
              router.push('/dashboard');
            }, 2000);
          }
        } else {
          setStatus('error');
          setMessage('Invalid verification link.');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
        setMessage('Verification failed. Please try again.');
      }
    };

    handleVerification();
  }, [router]);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='max-w-md w-full space-y-8'>
        <div className='text-center'>
          <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
            Email Verification
          </h2>
          <div className='mt-4'>
            {status === 'processing' && (
              <div className='flex justify-center'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
              </div>
            )}
            <p
              className={`mt-2 text-sm ${
                status === 'error'
                  ? 'text-red-600'
                  : status === 'success'
                  ? 'text-green-600'
                  : 'text-gray-600'
              }`}
            >
              {message}
            </p>
          </div>
          {status === 'error' && (
            <div className='mt-4'>
              <button
                onClick={() => router.push('/auth/login')}
                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              >
                Go to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
