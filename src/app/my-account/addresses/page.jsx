'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import UserLayout from '@/components/layouts/userLayout';
import { AuthService } from '@/lib/services/authService';
import { UserService } from '@/lib/services/userService';
import { MapPin, Plus, Edit, Trash2, Home, Briefcase, MoreHorizontal, MoreVertical, X } from 'lucide-react';

export default function UserAddresses() {
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const router = useRouter();
  const dropdownRef = useRef(null);

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

  // Mock data for addresses
  const mockAddresses = [
    {
      id: 1,
      type: 'home',
      full_name: 'John Doe',
      email: 'joesmith1234@gmail.com',
      address_line_1: '712, New Colony',
      address_line_2: '',
      city: 'Ghaziabad',
      state: 'Uttar Pradesh',
      postal_code: '123456',
      country: 'India',
      phone: '+91 9876543210',
    },
    {
      id: 2,
      type: 'work',
      full_name: 'John Doe',
      email: 'joesmith1234@gmail.com',
      address_line_1: '45, Business Park',
      address_line_2: 'Sector 62',
      city: 'Noida',
      state: 'Uttar Pradesh',
      postal_code: '201301',
      country: 'India',
      phone: '+91 9876543210',
    },
    {
      id: 3,
      type: 'other',
      full_name: 'John Doe',
      email: 'joesmith1234@gmail.com',
      address_line_1: '23, Mall Road',
      address_line_2: 'Near City Center',
      city: 'Delhi',
      state: 'Delhi',
      postal_code: '110001',
      country: 'India',
      phone: '+91 9876543210',
    },
  ];

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(null);
      }
    };

    if (dropdownOpen !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // COMMENTED OUT: Check if user is authenticated
        // const isAuth = await AuthService.isAuthenticated();
        // if (!isAuth) {
        //   router.push('/auth/login');
        //   return;
        // }

        // COMMENTED OUT: Get current user
        // const userData = await AuthService.getCurrentUser();
        // if (!userData) {
        //   router.push('/auth/login');
        //   return;
        // }

        // setUser(userData);

        // COMMENTED OUT: Get user addresses
        // const addressesResult = await UserService.getUserAddresses(userData.id);
        // if (addressesResult.success) {
        //   setAddresses(addressesResult.addresses);
        // } else {
        //   setError(addressesResult.error);
        // }

        // For now, use mock data
        setAddresses(mockAddresses);
        setUser({ name: 'Joe' });
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
        // COMMENTED OUT: Update address API call
        // result = await UserService.updateUserAddress(
        //   editingAddress.id,
        //   formData
        // );
      } else {
        // COMMENTED OUT: Add address API call
        // result = await UserService.addUserAddress(user.id, formData);
      }

      // COMMENTED OUT: Check result and refresh addresses
      // if (result.success) {
      //   // Refresh addresses
      //   const addressesResult = await UserService.getUserAddresses(user.id);
      //   if (addressesResult.success) {
      //     setAddresses(addressesResult.addresses);
      //   }

      //   // Reset form
      //   setShowAddForm(false);
      //   setEditingAddress(null);
      //   setFormData({
      //     type: 'home',
      //     full_name: '',
      //     address_line_1: '',
      //     address_line_2: '',
      //     city: '',
      //     state: '',
      //     postal_code: '',
      //     country: '',
      //     phone: '',
      //   });
      // } else {
      //   setError(result.error);
      // }
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
    setDropdownOpen(null);
  };

  const handleDelete = async (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        // COMMENTED OUT: Delete address API call
        // const result = await UserService.deleteUserAddress(addressId);
        // if (result.success) {
        //   // Refresh addresses
        //   const addressesResult = await UserService.getUserAddresses(user.id);
        //   if (addressesResult.success) {
        //     setAddresses(addressesResult.addresses);
        //   }
        // } else {
        //   setError(result.error);
        // }
      } catch (err) {
        console.error('Error deleting address:', err);
        setError('Failed to delete address');
      }
    }
    setDropdownOpen(null);
  };

  const getAddressTypeIcon = (type) => {
    switch (type) {
      case 'home':
        return <Home className='h-5 w-5' />;
      case 'work':
        return <Briefcase className='h-5 w-5' />;
      default:
        return <MoreHorizontal className='h-5 w-5' />;
    }
  };

  const getAddressTypeTitle = (type) => {
    switch (type) {
      case 'home':
        return 'Home Address';
      case 'work':
        return 'Work Address';
      default:
        return 'Other Address';
    }
  };

  const resetForm = () => {
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
              <h1 className='text-2xl font-bold text-gray-900'>Saved Addresses</h1>
              <p className='text-gray-600'>Manage your delivery addresses</p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className='flex items-center justify-center w-10 h-10 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200'
            >
              <Plus className='h-5 w-5' />
            </button>
          </div>
        </div>

        {/* Modal Overlay */}
        {showAddForm && (
          <div className='fixed inset-0 bg-black/65 flex items-center justify-center z-50 p-4'>
            <div className='bg-white rounded-[4px] max-w-[1044px] w-full max-h-[90vh] overflow-y-auto'>
              {/* Modal Header */}
              <div className='flex items-center justify-between px-2 py-4 md:px-6 md:py-6 border-b border-gray-100'>
                <h3 className='text-[25px] tracking-wide font-semibold text-gray-900'>
                  {editingAddress ? 'Edit Address' : 'Add New Address'}
                </h3>
                <button
                  onClick={resetForm}
                  className='text-gray-400 hover:text-gray-600 transition-colors p-1'
                >
                  <X className='h-5 w-5' />
                </button>
              </div>

              {/* Modal Content */}
              <div className='px-2 py-6 md:px-6 md:py-6 '>
                <form onSubmit={handleSubmit} className='space-y-5'>
                  {/* First Name and Last Name */}
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <label htmlFor='first_name' className='block text-sm font-medium text-gray-700 mb-2'>
                        First Name
                      </label>
                      <input
                        type='text'
                        id='first_name'
                        name='first_name'
                        value={formData.full_name.split(' ')[0] || ''}
                        onChange={(e) => {
                          const lastName = formData.full_name.split(' ').slice(1).join(' ');
                          setFormData({
                            ...formData,
                            full_name: `${e.target.value} ${lastName}`.trim()
                          });
                        }}
                        className='w-full px-3 py-2.5 bg-black/5  rounded-[4px] focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm'
                        placeholder='E.g. Joe'
                      />
                    </div>
                    <div>
                      <label htmlFor='last_name' className='block text-sm font-medium text-gray-700 mb-2'>
                        Last Name
                      </label>
                      <input
                        type='text'
                        id='last_name'
                        name='last_name'
                        value={formData.full_name.split(' ').slice(1).join(' ') || ''}
                        onChange={(e) => {
                          const firstName = formData.full_name.split(' ')[0] || '';
                          setFormData({
                            ...formData,
                            full_name: `${firstName} ${e.target.value}`.trim()
                          });
                        }}
                        className='w-full px-3 py-2.5 bg-black/5  rounded-[4px] focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm'
                        placeholder='E.g. Smith'
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label htmlFor='address_line_1' className='block text-sm font-medium text-gray-700 mb-2'>
                      Address
                    </label>
                    <input
                      type='text'
                      id='address_line_1'
                      name='address_line_1'
                      value={formData.address_line_1}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2.5 bg-black/5  rounded-[4px] focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm'
                      placeholder='E.g. 712, New Colony'
                    />
                  </div>

                  {/* Landmark */}
                  <div>
                    <label htmlFor='address_line_2' className='block text-sm font-medium text-gray-700 mb-2'>
                      Landmark
                    </label>
                    <input
                      type='text'
                      id='address_line_2'
                      name='address_line_2'
                      value={formData.address_line_2}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2.5 bg-black/5  rounded-[4px] focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm'
                      placeholder='E.g. near Huda Park'
                    />
                  </div>

                  {/* City and Country */}
                  <div className='grid md:grid-cols-2 gap-4'>
                    <div>
                      <label htmlFor='city' className='block text-sm font-medium text-gray-700 mb-2'>
                        City
                      </label>
                      <input
                        type='text'
                        id='city'
                        name='city'
                        value={formData.city}
                        onChange={handleInputChange}
                        className='w-full px-3 py-2.5 bg-black/5  rounded-[4px] focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm'
                        placeholder='E.g. Joe'
                      />
                    </div>
                    <div>
                      <label htmlFor='country' className='block text-sm font-medium text-gray-700 mb-2'>
                        Country
                      </label>
                      <select
                        id='country'
                        name='country'
                        value={formData.country}
                        onChange={handleInputChange}
                        className='w-full px-3 py-2.5 bg-black/5  rounded-[4px] focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm'
                      >
                        <option value='' className='w-[100px]'>Select Country</option>
                        <option value='India'>India</option>
                        <option value='USA'>USA</option>
                        <option value='UK'>UK</option>
                        <option value='Canada'>Canada</option>
                      </select>
                    </div>
                  </div>

                  {/* State and Postal Code */}
                  <div className='grid md:grid-cols-2 gap-4'>
                    <div>
                      <label htmlFor='state' className='block text-sm font-medium text-gray-700 mb-2'>
                        State
                      </label>
                      <input
                        type='text'
                        id='state'
                        name='state'
                        value={formData.state}
                        onChange={handleInputChange}
                        className='w-full px-3 py-2.5 bg-black/5  rounded-[4px] focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm'
                        placeholder='E.g. Haryana'
                      />
                    </div>
                    <div>
                      <label htmlFor='postal_code' className='block text-sm font-medium text-gray-700 mb-2'>
                        Postal Code
                      </label>
                      <input
                        type='text'
                        id='postal_code'
                        name='postal_code'
                        value={formData.postal_code}
                        onChange={handleInputChange}
                        className='w-full px-3 py-2.5 bg-black/5  rounded-[4px] focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm'
                        placeholder='E.g. 136118'
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label htmlFor='phone' className='block text-sm font-medium text-gray-700 mb-2'>
                      Phone Number
                    </label>
                    <input
                      type='tel'
                      id='phone'
                      name='phone'
                      value={formData.phone}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2.5 bg-black/5  rounded-[4px] focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm'
                      placeholder='E.g. (+91 99887-76655)'
                    />
                  </div>

                  {/* Submit Button */}
                  <div className='pt-4'>
                    <button
                      type='submit'
                      className='w-full sm:w-auto sm:ml-auto bg-blue-900 text-white py-3 px-8 rounded-md block'
                    >
                      {editingAddress ? 'Update Address' : 'Add Address'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Addresses List */}
        {addresses.length > 0 ? (
          <div className='space-y-4'>
            {addresses.map((address) => (
              <div
                key={address.id}
                className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'
              >
                <div className='flex items-start justify-between mb-4'>
                  <div>
                    <h3 className='text-xl font-semibold text-gray-900 mb-1'>
                      {getAddressTypeTitle(address.type)}
                    </h3>
                  </div>
                  <div className='relative' ref={dropdownOpen === address.id ? dropdownRef : null}>
                    <button
                      onClick={() => setDropdownOpen(dropdownOpen === address.id ? null : address.id)}
                      className='text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100'
                    >
                      <MoreVertical className='h-4 w-4' />
                    </button>
                    {dropdownOpen === address.id && (
                      <div className='absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-10'>
                        <div className=''>
                          <button
                            onClick={() => handleEdit(address)}
                            className='flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer'
                          >
                            <Edit className='h-4 w-4 mr-3 ' />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(address.id)}
                            className='flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer'
                          >
                            <Trash2 className='h-4 w-4 mr-3' />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className='gap-6'>
                  <div className='mb-4'>
                    <h4 className='font-semibold text-[16px] text-gray-900 mb-1'>Email</h4>
                    <p className='text-sm text-gray-600 tracking-wide'>{address.phone}</p>
                  </div>
                  <div>
                    <h4 className='font-semibold text-[16px] text-gray-900 mb-2 tracking-wide'>
                      Shipping Address
                    </h4>
                    <div className='text-sm text-gray-600'>
                      <p className='tracking-wide'>{address.address_line_1}</p>
                      {address.address_line_2 && <p>{address.address_line_2}</p>}
                      <p className='tracking-wide'>{address.city}, {address.state}</p>
                      <p className='tracking-wide'>Pincode: {address.postal_code}</p>
                    </div>
                  </div>
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
