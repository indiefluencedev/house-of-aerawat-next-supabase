'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function UserSidebar({ user }) {
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Account Information',
      path: '/dashboard',
    },
    {
      name: 'My Orders',
      path: '/dashboard/orders',
    },
    {
      name: 'My Addresses',
      path: '/dashboard/addresses',
    },
    {
      name: 'Settings',
      path: '/dashboard/settings',
    },
  ];

  return (
    <div className='w-full lg:w-1/5 px-5 lg:block border-r'>
      <div className='p-6 h-full ml-3'>
        <h3 className='text-2xl font-bold mb-4'>
          Hi, {/*user?.name || 'User'*/}!
        </h3>
        <h3 className='text-lg pt-2 font-semibold mb-4'>My Account</h3>

        <nav className='space-y-2'>
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 py-2 font-medium rounded-md transition-colors ${
                  isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            );
          })}

          {/* Logout Link */}
          <Link
            href='/api/auth/logout'
            className='flex items-center gap-3 py-2 font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors'
          >
            Log Out
          </Link>
        </nav>
      </div>
    </div>
  );
}
