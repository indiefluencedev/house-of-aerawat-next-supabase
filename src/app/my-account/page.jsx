'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UserLayout from '@/components/layouts/userLayout';
import { AuthService } from '@/lib/services/authService';
import { UserService } from '@/lib/services/userService';
import AccountInformationForm from '@/components/usePanel/AccountInformationForm';

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
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

        // Initialize profile data
        const fullName = userData?.profile?.name || '';
        const nameParts = fullName.split(' ');
        setProfileData({
          firstName: nameParts[0] || '',
          lastName: nameParts.slice(1).join(' ') || '',
          email: userData?.email || '',
          phone: userData?.profile?.phone || '',
        });

        // Get user dashboard stats
        const stats = await UserService.getUserStats(userData.id);
        setUserStats(stats);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    // Add your profile update logic here
    console.log('Profile update:', profileData);
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    // Add your password update logic here
    console.log('Password update:', passwordData);
  };

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <UserLayout user={user}>
        <div className='flex justify-center items-center h-64'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
        </div>
      </UserLayout>
    );
  }

  if (error) {
    return (
      <UserLayout user={user}>
        <div className='bg-red-50 border border-red-200 rounded-lg p-4 text-red-700'>
          {error}
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout user={user}>
      <AccountInformationForm
        user={user}
        profileData={profileData}
        passwordData={passwordData}
        showCurrentPassword={showCurrentPassword}
        showNewPassword={showNewPassword}
        showConfirmPassword={showConfirmPassword}
        handleProfileInputChange={handleProfileInputChange}
        handlePasswordInputChange={handlePasswordInputChange}
        handleProfileUpdate={handleProfileUpdate}
        handlePasswordUpdate={handlePasswordUpdate}
        setShowCurrentPassword={setShowCurrentPassword}
        setShowNewPassword={setShowNewPassword}
        setShowConfirmPassword={setShowConfirmPassword}
      />
    </UserLayout>
  );
}
