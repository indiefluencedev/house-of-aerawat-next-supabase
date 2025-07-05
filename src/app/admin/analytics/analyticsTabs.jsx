'use client';

import React, { useState } from 'react';

export default function AnalyticsTabs({
  initialData,
  userAuth,
  defaultDateRange,
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState(defaultDateRange);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'orders', label: 'Orders' },
    { id: 'products', label: 'Products' },
    { id: 'customers', label: 'Customers' },
  ];

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold text-gray-900'>
          Dashboard Analytics
        </h1>
        <div className='flex space-x-4'>
          <input
            type='date'
            value={dateRange.startDate}
            onChange={(e) =>
              setDateRange({ ...dateRange, startDate: e.target.value })
            }
            className='px-3 py-2 border border-gray-300 rounded-md'
          />
          <input
            type='date'
            value={dateRange.endDate}
            onChange={(e) =>
              setDateRange({ ...dateRange, endDate: e.target.value })
            }
            className='px-3 py-2 border border-gray-300 rounded-md'
          />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className='border-b border-gray-200'>
        <nav className='-mb-px flex space-x-8'>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className='mt-6'>
        {activeTab === 'overview' && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {/* Stats Cards */}
            <div className='bg-white p-6 rounded-lg shadow'>
              <h3 className='text-lg font-semibold text-gray-900'>
                Total Orders
              </h3>
              <p className='text-3xl font-bold text-blue-600'>
                {initialData?.totalOrders || 0}
              </p>
            </div>
            <div className='bg-white p-6 rounded-lg shadow'>
              <h3 className='text-lg font-semibold text-gray-900'>
                Total Revenue
              </h3>
              <p className='text-3xl font-bold text-green-600'>
                ${initialData?.totalRevenue || 0}
              </p>
            </div>
            <div className='bg-white p-6 rounded-lg shadow'>
              <h3 className='text-lg font-semibold text-gray-900'>
                Total Products
              </h3>
              <p className='text-3xl font-bold text-purple-600'>
                {initialData?.totalProducts || 0}
              </p>
            </div>
            <div className='bg-white p-6 rounded-lg shadow'>
              <h3 className='text-lg font-semibold text-gray-900'>
                Total Customers
              </h3>
              <p className='text-3xl font-bold text-orange-600'>
                {initialData?.totalCustomers || 0}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className='bg-white p-6 rounded-lg shadow'>
            <h3 className='text-lg font-semibold text-gray-900 mb-4'>
              Recent Orders
            </h3>
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Order ID
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Customer
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Amount
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {initialData?.recentOrders?.map((order) => (
                    <tr key={order.id}>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        #{order.id}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {order.customerName}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        ${order.amount}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            order.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : order.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  )) || (
                    <tr>
                      <td
                        colSpan='4'
                        className='px-6 py-4 text-center text-gray-500'
                      >
                        No orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className='bg-white p-6 rounded-lg shadow'>
            <h3 className='text-lg font-semibold text-gray-900 mb-4'>
              Product Performance
            </h3>
            <p className='text-gray-600'>
              Product analytics will be displayed here.
            </p>
          </div>
        )}

        {activeTab === 'customers' && (
          <div className='bg-white p-6 rounded-lg shadow'>
            <h3 className='text-lg font-semibold text-gray-900 mb-4'>
              Customer Insights
            </h3>
            <p className='text-gray-600'>
              Customer analytics will be displayed here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
