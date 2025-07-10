'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UserLayout from '@/components/layouts/userLayout';
import { AuthService } from '@/lib/services/authService';
import { UserService } from '@/lib/services/userService';
import { MapPin, Plus, Edit, Trash2, Home } from 'lucide-react';

export default function UserAddresses() {
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const router = useRouter();

  const [formData, setFormData] = useState({
    type: 'home',
    full_name: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
    phone: '',
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

        // Get user addresses
        const addressesResult = await UserService.getUserAddresses(userData.id);
        if (addressesResult.success) {
          setAddresses(addressesResult.addresses);
        } else {
          setError(addressesResult.error);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load addresses');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let result;

      if (editingAddress) {
        result = await UserService.updateUserAddress(
          editingAddress.id,
          formData
        );
      } else {
        result = await UserService.addUserAddress(user.id, formData);
      }

      if (result.success) {
        // Refresh addresses
        const addressesResult = await UserService.getUserAddresses(user.id);
        if (addressesResult.success) {
          setAddresses(addressesResult.addresses);
        }

        // Reset form
        setShowAddForm(false);
        setEditingAddress(null);
        setFormData({
          type: 'home',
          full_name: '',
          address_line_1: '',
          address_line_2: '',
          city: '',
          state: '',
          postal_code: '',
          country: '',
          phone: '',
        });
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error('Error saving address:', err);
      setError('Failed to save address');
    }
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setFormData({
      type: address.type || 'home',
      full_name: address.full_name || '',
      address_line_1: address.address_line_1 || '',
      address_line_2: address.address_line_2 || '',
      city: address.city || '',
      state: address.state || '',
      postal_code: address.postal_code || '',
      country: address.country || '',
      phone: address.phone || '',
    });
    setShowAddForm(true);
  };

  const handleDelete = async (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        const result = await UserService.deleteUserAddress(addressId);
        if (result.success) {
          // Refresh addresses
          const addressesResult = await UserService.getUserAddresses(user.id);
          if (addressesResult.success) {
            setAddresses(addressesResult.addresses);
          }
        } else {
          setError(result.error);
        }
      } catch (err) {
        console.error('Error deleting address:', err);
        setError('Failed to delete address');
      }
    }
  };

  const getAddressTypeIcon = (type) => {
    switch (type) {
      case 'home':
        return <Home className='h-5 w-5' />;
      case 'work':
        return <MapPin className='h-5 w-5' />;
      default:
        return <MapPin className='h-5 w-5' />;
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

  if (error) {
    return (
      <UserLayout>
        <div className='bg-red-50 border border-red-200 rounded-lg p-4 text-red-700'>
          {error}
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout user={user}>
      <div className='space-y-6'>
        {/* Header */}
        <div className='bg-white rounded-lg shadow-sm p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-2xl font-bold text-gray-900'>My Addresses</h1>
              <p className='text-gray-600'>Manage your delivery addresses</p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className='flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700'
            >
              <Plus className='h-4 w-4' />
              <span>Add Address</span>
            </button>
          </div>
        </div>

        {/* Add/Edit Address Form */}
        {showAddForm && (
          <div className='bg-white rounded-lg shadow-sm p-6'>
            <h2 className='text-xl font-semibold text-gray-900 mb-4'>
              {editingAddress ? 'Edit Address' : 'Add New Address'}
            </h2>

            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Address Type
                  </label>
                  <select
                    name='type'
                    value={formData.type}
                    onChange={handleInputChange}
                    className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  >
                    <option value='home'>Home</option>
                    <option value='work'>Work</option>
                    <option value='other'>Other</option>
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Full Name
                  </label>
                  <input
                    type='text'
                    name='full_name'
                    value={formData.full_name}
                    onChange={handleInputChange}
                    required
                    className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>

                <div className='md:col-span-2'>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Address Line 1
                  </label>
                  <input
                    type='text'
                    name='address_line_1'
                    value={formData.address_line_1}
                    onChange={handleInputChange}
                    required
                    className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>

                <div className='md:col-span-2'>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Address Line 2 (Optional)
                  </label>
                  <input
                    type='text'
                    name='address_line_2'
                    value={formData.address_line_2}
                    onChange={handleInputChange}
                    className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    City
                  </label>
                  <input
                    type='text'
                    name='city'
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    State
                  </label>
                  <input
                    type='text'
                    name='state'
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Postal Code
                  </label>
                  <input
                    type='text'
                    name='postal_code'
                    value={formData.postal_code}
                    onChange={handleInputChange}
                    required
                    className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Country
                  </label>
                  <input
                    type='text'
                    name='country'
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Phone Number
                  </label>
                  <input
                    type='tel'
                    name='phone'
                    value={formData.phone}
                    onChange={handleInputChange}
                    className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
              </div>

              <div className='flex justify-end space-x-3'>
                <button
                  type='button'
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingAddress(null);
                    setFormData({
                      type: 'home',
                      full_name: '',
                      address_line_1: '',
                      address_line_2: '',
                      city: '',
                      state: '',
                      postal_code: '',
                      country: '',
                      phone: '',
                    });
                  }}
                  className='px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
                >
                  {editingAddress ? 'Update Address' : 'Add Address'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Addresses List */}
        {addresses.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {addresses.map((address) => (
              <div
                key={address.id}
                className='bg-white rounded-lg shadow-sm p-6'
              >
                <div className='flex items-start justify-between mb-4'>
                  <div className='flex items-center space-x-3'>
                    {getAddressTypeIcon(address.type)}
                    <div>
                      <h3 className='font-semibold text-gray-900 capitalize'>
                        {address.type} Address
                      </h3>
                      <p className='text-sm text-gray-600'>
                        {address.full_name}
                      </p>
                    </div>
                  </div>
                  <div className='flex space-x-2'>
                    <button
                      onClick={() => handleEdit(address)}
                      className='text-blue-600 hover:text-blue-800'
                    >
                      <Edit className='h-4 w-4' />
                    </button>
                    <button
                      onClick={() => handleDelete(address.id)}
                      className='text-red-600 hover:text-red-800'
                    >
                      <Trash2 className='h-4 w-4' />
                    </button>
                  </div>
                </div>

                <div className='text-sm text-gray-600 space-y-1'>
                  <p>{address.address_line_1}</p>
                  {address.address_line_2 && <p>{address.address_line_2}</p>}
                  <p>
                    {address.city}, {address.state} {address.postal_code}
                  </p>
                  <p>{address.country}</p>
                  {address.phone && <p>Phone: {address.phone}</p>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='bg-white rounded-lg shadow-sm p-12 text-center'>
            <MapPin className='h-16 w-16 text-gray-400 mx-auto mb-4' />
            <h3 className='text-lg font-medium text-gray-900 mb-2'>
              No addresses yet
            </h3>
            <p className='text-gray-600 mb-6'>
              Add your first address to get started
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className='bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700'
            >
              Add Address
            </button>
          </div>
        )}
      </div>
    </UserLayout>
  );
}
