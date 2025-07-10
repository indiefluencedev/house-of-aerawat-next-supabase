'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/layouts/adminLayout';
import { AuthService } from '@/lib/services/authService';
import { AdminService } from '@/lib/services/adminDashboardService';
import { Users, Mail, Calendar, Shield, Edit, Trash2 } from 'lucide-react';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Check if user is authenticated and admin
        const isAuth = await AuthService.isAuthenticated();
        if (!isAuth) {
          router.push('/auth/login');
          return;
        }

        const isAdmin = await AuthService.isAdmin();
        if (!isAdmin) {
          router.push('/dashboard');
          return;
        }

        // Get all users
        const result = await AdminService.getAllUsers();
        if (result.success) {
          setUsers(result.users);
        } else {
          setError(result.error);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleRoleToggle = async (userId, currentRole) => {
    try {
      const newRole = currentRole === 'admin' ? 'user' : 'admin';
      const result = await AdminService.updateUserRole(userId, newRole);

      if (result.success) {
        // Refresh users list
        const usersResult = await AdminService.getAllUsers();
        if (usersResult.success) {
          setUsers(usersResult.users);
        }
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error('Error updating user role:', err);
      setError('Failed to update user role');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const result = await AdminService.deleteUser(userId);

        if (result.success) {
          // Refresh users list
          const usersResult = await AdminService.getAllUsers();
          if (usersResult.success) {
            setUsers(usersResult.users);
          }
        } else {
          setError(result.error);
        }
      } catch (err) {
        console.error('Error deleting user:', err);
        setError('Failed to delete user');
      }
    }
  };

  const getRoleColor = (role) => {
    return role === 'admin'
      ? 'bg-red-100 text-red-800'
      : 'bg-green-100 text-green-800';
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className='flex justify-center items-center h-64'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className='bg-red-50 border border-red-200 rounded-lg p-4 text-red-700'>
          {error}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className='space-y-6'>
        {/* Header */}
        <div className='bg-white rounded-lg shadow-sm p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-2xl font-bold text-gray-900'>
                User Management
              </h1>
              <p className='text-gray-600'>Manage all registered users</p>
            </div>
            <div className='flex items-center space-x-2'>
              <Users className='h-6 w-6 text-blue-600' />
              <span className='text-lg font-semibold text-gray-900'>
                {users.length} Total Users
              </span>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className='bg-white rounded-lg shadow-sm overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    User
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Role
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Joined
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {users.map((user) => (
                  <tr key={user.id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <div className='bg-blue-100 rounded-full p-2 mr-3'>
                          <Mail className='h-5 w-5 text-blue-600' />
                        </div>
                        <div>
                          <div className='text-sm font-medium text-gray-900'>
                            {user.name || 'Unknown User'}
                          </div>
                          <div className='text-sm text-gray-500'>
                            {user.email}
                          </div>
                          {user.phone_number && (
                            <div className='text-sm text-gray-500'>
                              {user.phone_number}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(
                          user.is_admin ? 'admin' : 'user'
                        )}`}
                      >
                        <Shield className='h-3 w-3 mr-1' />
                        {user.is_admin ? 'Admin' : 'User'}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      <div className='flex items-center'>
                        <Calendar className='h-4 w-4 mr-2' />
                        {new Date(user.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2'>
                      <button
                        onClick={() =>
                          handleRoleToggle(
                            user.id,
                            user.is_admin ? 'admin' : 'user'
                          )
                        }
                        className='text-blue-600 hover:text-blue-900'
                      >
                        <Edit className='h-4 w-4' />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className='text-red-600 hover:text-red-900'
                      >
                        <Trash2 className='h-4 w-4' />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='bg-white rounded-lg shadow-sm p-6'>
            <div className='flex items-center'>
              <Users className='h-8 w-8 text-blue-600' />
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>Total Users</p>
                <p className='text-2xl font-bold text-gray-900'>
                  {users.length}
                </p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-sm p-6'>
            <div className='flex items-center'>
              <Shield className='h-8 w-8 text-red-600' />
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>Admin Users</p>
                <p className='text-2xl font-bold text-gray-900'>
                  {users.filter((user) => user.is_admin).length}
                </p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-sm p-6'>
            <div className='flex items-center'>
              <Users className='h-8 w-8 text-green-600' />
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>
                  Regular Users
                </p>
                <p className='text-2xl font-bold text-gray-900'>
                  {users.filter((user) => !user.is_admin).length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
