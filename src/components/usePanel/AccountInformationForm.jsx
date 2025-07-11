'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const AccountInformationForm = ({
  user,
  profileData,
  passwordData,
  showCurrentPassword,
  showNewPassword,
  showConfirmPassword,
  handleProfileInputChange,
  handlePasswordInputChange,
  handleProfileUpdate,
  handlePasswordUpdate,
  setShowCurrentPassword,
  setShowNewPassword,
  setShowConfirmPassword
}) => {
  return (
    <div className='space-y-6'>
      {/* Account Information */}
      <div className='bg-white w-full max-w-[985px]'>
        <h3 className='text-[25px] font-bold text-black tracking-wide mb-6'>
          Account Details
        </h3>

        <form onSubmit={handleProfileUpdate} className='space-y-6'>
          {/* First Name and Last Name in same row */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                First Name
              </label>
              <input
                type='text'
                name='firstName'
                value={profileData.firstName}
                onChange={handleProfileInputChange}
                className='w-full px-3 py-2 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-black/5'
                placeholder='Joe'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Last Name
              </label>
              <input
                type='text'
                name='lastName'
                value={profileData.lastName}
                onChange={handleProfileInputChange}
                className='w-full px-3 py-2 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-black/5'
                placeholder='Smith'
              />
            </div>
          </div>

          {/* Email - Full width */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Email
            </label>
            <input
              type='email'
              name='email'
              value={profileData.email}
              onChange={handleProfileInputChange}
              className='w-full px-3 py-2 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-black/5'
              placeholder='joesmith1234@gmail.com'
            />
          </div>

          {/* Phone - Full width */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Phone Number*
            </label>
            <input
              type='tel'
              name='phone'
              value={profileData.phone}
              onChange={handleProfileInputChange}
              className='w-full px-3 py-2 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-black/5'
              placeholder='+91 98717-12845'
            />
          </div>

          {/* Update Profile Button */}
          <button
            type='submit'
            className='bg-[#14397C] text-white px-6 py-3 rounded-[4px] hover:bg-blue-700 transition-colors font-medium'
          >
            Update Profile
          </button>
        </form>
      </div>

      {/* Change Password Section */}
      <div className='bg-white py-6 w-full max-w-[985px]'>
        <h3 className='text-[25px] font-bold text-black tracking-wide mb-6'>
          Change Password
        </h3>

        <form onSubmit={handlePasswordUpdate} className='space-y-6'>
          {/* Current Password */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Current Password
            </label>
            <div className='relative'>
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                name='currentPassword'
                value={passwordData.currentPassword}
                onChange={handlePasswordInputChange}
                className='w-full px-3 py-2 pr-10 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-black/5'
                placeholder='Input current password'
              />
              <button
                type='button'
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
              >
                {showCurrentPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              New Password
            </label>
            <div className='relative'>
              <input
                type={showNewPassword ? 'text' : 'password'}
                name='newPassword'
                value={passwordData.newPassword}
                onChange={handlePasswordInputChange}
                className='w-full px-3 py-2 pr-10 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-black/5'
                placeholder='Input new password'
              />
              <button
                type='button'
                onClick={() => setShowNewPassword(!showNewPassword)}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
              >
                {showNewPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Confirm New Password
            </label>
            <div className='relative'>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name='confirmPassword'
                value={passwordData.confirmPassword}
                onChange={handlePasswordInputChange}
                className='w-full px-3 py-2 pr-10 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-black/5'
                placeholder='Confirm new password'
              />
              <button
                type='button'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
              >
                {showConfirmPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
              </button>
            </div>
          </div>

          {/* Update Password Button */}
          <button
            type='submit'
            className='bg-[#14397C] text-white px-6 py-3 rounded-[4px] hover:bg-blue-700 transition-colors font-medium'
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountInformationForm;
