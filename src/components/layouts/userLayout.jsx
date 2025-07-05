import React from 'react';
import UserSidebar from '@/components/userSidebar';
import '@/app/globals.css';

export default function UserLayout({ children, user }) {
  return (
    <div className='min-h-screen flex mx-5 py-5'>
      <UserSidebar user={user} />
      <div className='flex-1 p-4'>
        <main className='mx-auto h-full flex flex-col'>{children}</main>
      </div>
    </div>
  );
}
