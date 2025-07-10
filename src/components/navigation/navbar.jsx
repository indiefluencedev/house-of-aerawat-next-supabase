// src/components/Header.jsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AuthService } from '@/lib/services/authService';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Categories data - matches the structure from your category page
  const categories = [
    { name: "Fine Jewellery", slug: "fine-jewellery" },
    { name: "Shringaar", slug: "shringaar" },
    { name: "Kalapatt", slug: "kalapatt" },
    { name: "Crystals", slug: "crystals" },
    { name: "Wooden Beads", slug: "wooden-beads" },
    { name: "Treasured Gifts", slug: "treasured-gifts" }
  ];

  // Handle category click
  const handleCategoryClick = (categorySlug) => {
    router.push(`/category/${categorySlug}`);
  };

  // Check if category is active based on current pathname
  const isCategoryActive = (categorySlug) => {
    return pathname === `/category/${categorySlug}`;
  };

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
    return user.role === 'admin' ? '/admin' : '/dashboard';
  };

  const renderUserIcon = () => {
    if (isLoading) {
      return (
        <div className='w-6 h-6 bg-gray-300 rounded-full animate-pulse'></div>
      );
    }

    if (user) {
      return (
        <div className='relative'>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className='flex items-center space-x-2 focus:outline-none'
          >
            <Image
              src='/assets/svgs/user.svg'
              alt='User Profile'
              width={24}
              height={24}
              className='w-6 h-6'
            />
            <span className='hidden md:inline text-sm'>
              {user.profile?.name || user.user_metadata?.name || 'User'}
            </span>
          </button>

          {showUserMenu && (
            <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50'>
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
                  onClick={() => setShowUserMenu(false)}
                >
                  {user.role === 'admin' ? 'Admin Dashboard' : 'Dashboard'}
                </Link>
                <Link
                  href='/profile'
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  onClick={() => setShowUserMenu(false)}
                >
                  Profile Settings
                </Link>
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
      <div className='flex flex-wrap justify-center space-x-4 py-6 text-xs md:text-[14px] new-class2 gap-26 text-black font-medium tracking-wide'>
        {categories.map((category) => (
          <button
            key={category.slug}
            onClick={() => handleCategoryClick(category.slug)}
            className={`
              relative cursor-pointer focus:outline-none transition-all duration-300 ease-in-out
              ${isCategoryActive(category.slug)
                ? 'text-black'
                : 'text-black hover:text-gray-700'
              }
            `}
          >
            {category.name}
            {/* Animated underline */}
            <span
              className={`
                absolute bottom-0 left-0 h-[2px] bg-black transition-all duration-300 ease-in-out
                ${isCategoryActive(category.slug)
                  ? 'w-full'
                  : 'w-0 group-hover:w-full'
                }
              `}
            />
            {/* Hover effect - separate span for hover animation */}
            <span className="absolute bottom-0 left-0 h-[2px] bg-black w-0 hover:w-full transition-all duration-300 ease-in-out opacity-0 hover:opacity-100" />
          </button>
        ))}
      </div>

      {/* Custom CSS for better hover effect */}
      <style jsx>{`
        .new-class2 button {
          position: relative;
          overflow: hidden;
        }

        .new-class2 button::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: #000;
          transition: width 0.3s ease-in-out;
        }

        .new-class2 button:hover::after {
          width: 100%;
        }

        .new-class2 button.active::after {
          width: 100%;
        }
      `}</style>
    </header>
  );
};

export default Navbar;
