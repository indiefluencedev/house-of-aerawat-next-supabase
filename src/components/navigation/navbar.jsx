// src/components/Header.jsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { AuthService } from '@/lib/services/authService';

const Header = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    checkAuth();

    // Listen for auth state changes
    const handleAuthChange = (event, session) => {
      if (event === 'SIGNED_IN') {
        checkAuth();
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setIsLoading(false);
      }
    };

    // Set up auth state listener
    const {
      data: { subscription },
    } = AuthService.onAuthStateChange(handleAuthChange);

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const checkAuth = async () => {
    try {
      const currentUser = await AuthService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Error checking auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const result = await AuthService.logout();
      if (result.success) {
        setUser(null);
        setShowUserMenu(false);
        // Redirect to home page after logout
        window.location.href = '/';
      } else {
        console.error('Logout failed:', result.error);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getUserDashboardLink = () => {
    if (!user) return '/auth/login';
    return user.role === 'admin' ? '/admin' : '/my-account';
  };

  const renderUserIcon = () => {
    if (user) {
      return (
        <div
          className='relative'
          onMouseEnter={() => setShowUserMenu(true)}
          onMouseLeave={() => setShowUserMenu(false)}
        >
          <div className='flex items-center space-x-2 focus:outline-none cursor-pointer'>
            <Image
              src='/assets/svgs/user.svg'
              alt='User Profile'
              width={24}
              height={24}
              className='w-6 h-6'
            />
          </div>

          {showUserMenu && (
            <div className='absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50'>
              <div className='py-2'>
                <div className='px-4 py-2 text-sm text-gray-700 border-b'>
                  <div className='font-medium'>
                    {user.profile?.name || user.user_metadata?.name || 'User'}
                  </div>
                  <div className='text-xs text-gray-500'>{user.email}</div>
                </div>
                <Link
                  href={getUserDashboardLink()}
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                >
                  {user.role === 'admin' ? 'Admin Dashboard' : 'My Account'}
                </Link>
                {user.role !== 'admin' && (
                  <>
                    <Link
                      href='/my-account/orders'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                    >
                      My Orders
                    </Link>
                    <Link
                      href='/my-account/addresses'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                    >
                      My Addresses
                    </Link>
                  </>
                )}
                <button
                  onClick={handleLogout}
                  className='block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100'
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <Link href='/auth/login'>
        <Image
          src='/assets/svgs/user.svg'
          alt='Login'
          width={24}
          height={24}
          className='w-6 h-6'
        />
      </Link>
    );
  };

  return (
    <header>
      {/* Top Navigation Links */}
      <div className='bg-[#14397C] text-white py-2 px-4 flex justify-center space-x-12 text-[16px] new-class'>
        <a href='/' className='hover:underline'>
          Home
        </a>
        <a href='/products' className='hover:underline'>
          Explore All Products
        </a>
        <a href='/about' className='hover:underline'>
          About Us
        </a>
        <a href='/contact' className='hover:underline'>
          Get in Touch
        </a>
      </div>

      {/* Main Navbar */}
      <div className='flex flex-wrap items-center justify-between px-4 py-4 border-b'>
        {/* Logo */}
        <div className='flex items-center'>
          <Link href='/'>
            <Image
              src='/assets/newlogo.png'
              alt='Logo'
              width={290}
              height={75}
              className=' md:w-[290px]'
              priority
            />
          </Link>
        </div>

        {/* Search */}
        <div className='flex-1 flex justify-end items-center space-x-2 mt-4 md:mt-0'>
          <Image
            src='/assets/search.svg'
            alt='Search Icon'
            width={28}
            height={28}
            className='search hidden md:block'
          />
          <input
            type='text'
            id='search'
            placeholder='Search for Jewellery, Crystals, Gifts...'
            className='w-full md:w-96 p-2 border rounded-lg bg-gray-100 text-sm focus:outline-none'
          />
        </div>

        {/* Icons */}
        <div className='flex items-center ml-2 space-x-4 mt-4 md:mt-0'>
          {renderUserIcon()}
          <Image
            src='/assets/heart.svg'
            alt='Heart Icon'
            width={24}
            height={24}
            className='w-6 h-6 cursor-pointer'
          />
          <Link href='/cart'>
            <Image
              src='/assets/chart.svg'
              alt='Cart Icon'
              width={24}
              height={24}
              className='w-6 h-6'
            />
          </Link>
        </div>
      </div>

      {/* Category Navigation */}
      <div className='flex flex-wrap justify-center space-x-4 py-6 text-xs md:text-sm new-class2 gap-26 text-black'>
        <a href='#' className='hover:underline'>
          Fine Jewellery
        </a>
        <a href='#' className='hover:underline'>
          Shringaar
        </a>
        <a href='#' className='hover:underline'>
          Kalapatt
        </a>
        <a href='#' className='hover:underline'>
          Crystals
        </a>
        <a href='#' className='hover:underline'>
          Wooden Beads
        </a>
        <a href='#' className='hover:underline'>
          Treasured Gifts
        </a>
      </div>
    </header>
  );
};

export default Header;
