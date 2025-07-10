'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UserLayout from '@/components/layouts/userLayout';
import { AuthService } from '@/lib/services/authService';
import { UserService } from '@/lib/services/userService';
import { Package, Calendar, MapPin, CreditCard } from 'lucide-react';

export default function UserOrders() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

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

        // Get user orders
        const ordersResult = await UserService.getUserOrders(userData.id);
        if (ordersResult.success) {
          setOrders(ordersResult.orders);
        } else {
          setError(ordersResult.error);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const result = await UserService.cancelOrder(orderId, user.id);
      if (result.success) {
        // Refresh orders
        const ordersResult = await UserService.getUserOrders(user.id);
        if (ordersResult.success) {
          setOrders(ordersResult.orders);
        }
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error('Error canceling order:', err);
      setError('Failed to cancel order');
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
          <h1 className='text-2xl font-bold text-gray-900'>My Orders</h1>
          <p className='text-gray-600'>Track and manage your orders</p>
        </div>

        {/* Orders List */}
        {orders.length > 0 ? (
          <div className='space-y-4'>
            {orders.map((order) => (
              <div key={order.id} className='bg-white rounded-lg shadow-sm p-6'>
                <div className='flex items-center justify-between mb-4'>
                  <div className='flex items-center space-x-4'>
                    <Package className='h-6 w-6 text-blue-600' />
                    <div>
                      <h3 className='font-semibold text-gray-900'>
                        Order #{order.id}
                      </h3>
                      <p className='text-sm text-gray-600 flex items-center'>
                        <Calendar className='h-4 w-4 mr-1' />
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='text-lg font-semibold text-gray-900'>
                      ${parseFloat(order.total).toFixed(2)}
                    </p>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                {order.order_items && order.order_items.length > 0 && (
                  <div className='border-t pt-4'>
                    <h4 className='font-medium text-gray-900 mb-3'>Items</h4>
                    <div className='space-y-2'>
                      {order.order_items.map((item) => (
                        <div
                          key={item.id}
                          className='flex items-center justify-between'
                        >
                          <div className='flex items-center space-x-3'>
                            {item.products?.image_url && (
                              <img
                                src={item.products.image_url}
                                alt={item.products.name}
                                className='h-12 w-12 rounded-md object-cover'
                              />
                            )}
                            <div>
                              <p className='font-medium text-gray-900'>
                                {item.products?.name}
                              </p>
                              <p className='text-sm text-gray-600'>
                                Quantity: {item.quantity}
                              </p>
                            </div>
                          </div>
                          <p className='font-medium text-gray-900'>
                            ${parseFloat(item.price).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Order Actions */}
                <div className='flex justify-between items-center mt-4 pt-4 border-t'>
                  <div className='flex items-center space-x-4'>
                    {order.shipping_address && (
                      <div className='flex items-center text-sm text-gray-600'>
                        <MapPin className='h-4 w-4 mr-1' />
                        <span>Shipping to {order.shipping_address}</span>
                      </div>
                    )}
                    {order.payment_status && (
                      <div className='flex items-center text-sm text-gray-600'>
                        <CreditCard className='h-4 w-4 mr-1' />
                        <span>Payment: {order.payment_status}</span>
                      </div>
                    )}
                  </div>

                  <div className='flex space-x-2'>
                    <button className='px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700'>
                      View Details
                    </button>
                    {order.status === 'pending' && (
                      <button
                        onClick={() => handleCancelOrder(order.id)}
                        className='px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700'
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='bg-white rounded-lg shadow-sm p-12 text-center'>
            <Package className='h-16 w-16 text-gray-400 mx-auto mb-4' />
            <h3 className='text-lg font-medium text-gray-900 mb-2'>
              No orders yet
            </h3>
            <p className='text-gray-600 mb-6'>
              When you place orders, they'll appear here
            </p>
            <button
              onClick={() => router.push('/products')}
              className='bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700'
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </UserLayout>
  );
}
