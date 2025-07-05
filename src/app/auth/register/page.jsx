// app/auth/register/page.jsx - Registration page with client-side form handling
'use client';

import { FcGoogle } from 'react-icons/fc';
import { FiPhone } from 'react-icons/fi';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function RegisterPage() {
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
    const name = formData.get('name');
    const phone = formData.get('phone');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm_password');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, phone, password, confirmPassword }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Account created successfully! Redirecting to login...');
        setTimeout(() => {
          router.push('/auth/login');
        }, 2000);
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center mt-10'>
      <div className='w-full max-w-5xl flex py-10'>
        {/* Left Image */}
        <div className='w-1/2 flex flex-col items-center justify-center p-10'>
          <Image
            src='/assets/verticalLogo.jpg'
            alt='House Of Aerawat'
            width={354}
            height={450}
          />
        </div>

        {/* Right Form */}
        <div className='w-1/2 p-10 border-l-2 border-gray-300'>
          <h2 className='text-2xl font-bold mb-6 text-center'>
            Create a New Account
          </h2>

          <button
            type='button'
            className='w-full flex items-center justify-center border border-black py-3 mb-6 text-black font-semibold hover:bg-gray-100 transition'
          >
            <FcGoogle className='mr-3' />
            Sign up with Google
          </button>

          <div className='flex items-center my-4'>
            <div className='flex-grow border-t border-gray-300' />
            <span className='mx-4 text-sm text-gray-500'>or sign up with</span>
            <div className='flex-grow border-t border-gray-300' />
          </div>

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className='flex items-center bg-gray-100 p-3 mb-4'>
              <Image
                src='/assets/svgs/user.svg'
                alt='User'
                width={20}
                height={20}
                className='mr-3 font-light'
              />
              <input
                name='name'
                type='text'
                placeholder='Joe Smith'
                className='w-full bg-transparent outline-none text-sm'
                required
                disabled={isLoading}
              />
            </div>

            {/* Email */}
            <div className='flex items-center bg-gray-100 p-3 mb-4'>
              <Image
                src={'/assets/svgs/envelope.svg'}
                alt='Envelope'
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

            {/* Phone */}
            <div className='flex items-center bg-gray-100 p-3 mb-4'>
              <FiPhone className='w-[20px] h-[20px] mr-3' />
              <input
                name='phone'
                type='tel'
                placeholder='9876543210'
                className='w-full bg-transparent outline-none text-sm'
                required
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div className='flex items-center bg-gray-100 p-3 mb-4'>
              <Image
                src='/assets/svgs/lock.svg'
                alt='Lock'
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

            {/* Confirm Password */}
            <div className='flex items-center bg-gray-100 p-3 mb-4'>
              <Image
                src='/assets/svgs/lock.svg'
                alt='Lock'
                width={20}
                height={20}
                className='mr-3'
              />
              <input
                name='confirm_password'
                type='password'
                placeholder='********'
                className='w-full bg-transparent outline-none text-sm'
                required
                disabled={isLoading}
              />
            </div>

            <button
              type='submit'
              disabled={isLoading}
              className='w-full bg-[#14397C] text-white py-3 font-semibold hover:bg-[#D4AF37] hover:text-[#14397C] transition disabled:opacity-50'
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
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
            Already have an account?{' '}
            <a
              href='/auth/login'
              className='text-[#14397C] font-semibold hover:underline'
            >
              Log in here.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
