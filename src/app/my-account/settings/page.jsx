'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UserLayout from '@/components/layouts/userLayout';
import { AuthService } from '@/lib/services/authService';
import { UserService } from '@/lib/services/userService';
import { User, Mail, Phone, Lock, Save } from 'lucide-react';

export default function UserSettings() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Check if user is authenticated
        const isAuth = await AuthService.isAuthenticated();
        if (!isAuth) {
          router.push('/auth/login');
          return;
        }

        // Get current user
        const userData = await AuthService.getCurrentUser();
        if (!userData) {
          router.push('/auth/login');
          return;
        }

        setUser(userData);
        setProfileData({
          name: userData.profile?.name || '',
          email: userData.email || '',
          phone: userData.profile?.phone || '',
        });
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const result = await UserService.updateUserProfile(user.id, {
        name: profileData.name,
        phone: profileData.phone,
      });

      if (result.success) {
        setSuccess('Profile updated successfully');
        // Update user state
        setUser((prev) => ({
          ...prev,
          profile: result.profile,
        }));
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess('Password changed successfully');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error('Error changing password:', err);
      setError('Failed to change password');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <UserLayout>
        <div className='flex justify-center items-center h-64'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout user={user}>
      <div className='space-y-6'>
        {/* Header */}
        <div className='bg-white rounded-lg shadow-sm p-6'>
          <h1 className='text-2xl font-bold text-gray-900'>Account Settings</h1>
          <p className='text-gray-600'>
            Manage your account information and security
          </p>
        </div>

        {/* Success/Error Messages */}
        {error && (
          <div className='bg-red-50 border border-red-200 rounded-lg p-4 text-red-700'>
            {error}
          </div>
        )}

        {success && (
          <div className='bg-green-50 border border-green-200 rounded-lg p-4 text-green-700'>
            {success}
          </div>
        )}

        {/* Profile Settings */}
        <div className='bg-white rounded-lg shadow-sm p-6'>
          <div className='flex items-center mb-6'>
            <User className='h-6 w-6 text-blue-600 mr-3' />
            <h2 className='text-xl font-semibold text-gray-900'>
              Profile Information
            </h2>
          </div>

          <form onSubmit={handleProfileSubmit} className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Full Name
                </label>
                <input
                  type='text'
                  name='name'
                  value={profileData.name}
                  onChange={handleProfileChange}
                  required
                  className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Email Address
                </label>
                <input
                  type='email'
                  name='email'
                  value={profileData.email}
                  disabled
                  className='w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-gray-500 cursor-not-allowed'
                />
                <p className='text-xs text-gray-500 mt-1'>
                  Email cannot be changed
                </p>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Phone Number
                </label>
                <input
                  type='tel'
                  name='phone'
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
            </div>

            <div className='flex justify-end'>
              <button
                type='submit'
                disabled={saving}
                className='flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50'
              >
                <Save className='h-4 w-4' />
                <span>{saving ? 'Saving...' : 'Save Profile'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Password Settings */}
        <div className='bg-white rounded-lg shadow-sm p-6'>
          <div className='flex items-center mb-6'>
            <Lock className='h-6 w-6 text-blue-600 mr-3' />
            <h2 className='text-xl font-semibold text-gray-900'>
              Change Password
            </h2>
          </div>

          <form onSubmit={handlePasswordSubmit} className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='md:col-span-2'>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Current Password
                </label>
                <input
                  type='password'
                  name='currentPassword'
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                  className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  New Password
                </label>
                <input
                  type='password'
                  name='newPassword'
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                  minLength={6}
                  className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Confirm New Password
                </label>
                <input
                  type='password'
                  name='confirmPassword'
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                  minLength={6}
                  className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
            </div>

            <div className='flex justify-end'>
              <button
                type='submit'
                disabled={saving}
                className='flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50'
              >
                <Lock className='h-4 w-4' />
                <span>{saving ? 'Changing...' : 'Change Password'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Account Information */}
        <div className='bg-white rounded-lg shadow-sm p-6'>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>
            Account Information
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <p className='text-sm font-medium text-gray-700'>Account Type</p>
              <p className='text-gray-900 capitalize'>{user?.role || 'user'}</p>
            </div>

            <div>
              <p className='text-sm font-medium text-gray-700'>Member Since</p>
              <p className='text-gray-900'>
                {new Date(user?.created_at).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className='text-sm font-medium text-gray-700'>
                Login Provider
              </p>
              <p className='text-gray-900 capitalize'>
                {user?.profile?.provider || 'email'}
              </p>
            </div>

            <div>
              <p className='text-sm font-medium text-gray-700'>Last Updated</p>
              <p className='text-gray-900'>
                {user?.profile?.updated_at
                  ? new Date(user.profile.updated_at).toLocaleDateString()
                  : 'Never'}
              </p>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className='bg-white rounded-lg shadow-sm p-6 border-red-200'>
          <h2 className='text-xl font-semibold text-red-900 mb-4'>
            Danger Zone
          </h2>
          <p className='text-gray-600 mb-4'>
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <button className='bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700'>
            Delete Account
          </button>
        </div>
      </div>
    </UserLayout>
  );
}
