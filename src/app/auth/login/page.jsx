// app/auth/login/page.jsx - Login page with client-side form handling
'use client';

import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          router.push(data.redirect);
        }, 1000);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-white border-t-1'>
      <div className='w-full max-w-5xl flex py-8'>
        {/* Left Image */}
        <div className='w-1/2 flex flex-col items-center justify-center bg-white p-10'>
          <Image
            src='/assets/verticalLogo.jpg'
            alt='House Of Aerawat'
            width={354}
            height={450}
          />
        </div>

        {/* Right Form */}
        <div className='w-1/2 p-10 mt-10 border-l-2 border-gray-300'>
          <h2 className='text-2xl font-bold mb-6 text-center'>
            Log in to your Account
          </h2>

          <button
            type='button'
            className='w-full flex items-center justify-center border border-black py-3 mb-6 text-black font-semibold hover:bg-gray-100 transition'
          >
            <FcGoogle className='mx-3 w-5 h-5' />
            Login using Google Account
          </button>

          <div className='flex items-center my-4'>
            <div className='flex-grow border-t border-gray-300' />
            <span className='mx-4 text-sm '>or continue with</span>
            <div className='flex-grow border-t border-gray-300' />
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className='flex items-center bg-gray-100 p-3 mb-4'>
              <Image
                src='/assets/svgs/envelope.svg'
                alt='Email Icon'
                width={20}
                height={20}
                className='mr-3'
              />
              <input
                name='email'
                type='email'
                placeholder='joesmith1234@gmail.com'
                className='w-full bg-transparent outline-none text-sm'
                required
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div className='flex items-center bg-gray-100 p-3'>
              <Image
                src='/assets/svgs/lock.svg'
                alt='Lock Icon'
                width={20}
                height={20}
                className='mr-3'
              />
              <input
                name='password'
                type='password'
                placeholder='********'
                className='w-full bg-transparent outline-none text-sm'
                required
                disabled={isLoading}
              />
            </div>

            <p className='text-sm text-right hover:underline'>
              Forgot Password?
            </p>

            <button
              type='submit'
              disabled={isLoading}
              className='w-full bg-[#14397C] text-white py-3 mt-10 font-semibold hover:bg-[#D4AF37] hover:text-[#14397C] transition disabled:opacity-50'
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          {/* Messages */}
          {error && (
            <p className='text-red-500 text-sm mt-2 text-center'>{error}</p>
          )}
          {success && (
            <p className='text-green-600 text-sm mt-2 text-center'>{success}</p>
          )}

          <p className='text-sm text-center mt-4 text-gray-600'>
            New to Aerawat?{' '}
            <a
              href='/auth/register'
              className='text-[#14397C] font-semibold hover:underline'
            >
              Sign up now.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
