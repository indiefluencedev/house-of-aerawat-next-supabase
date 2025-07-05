import '@/app/globals.css';
import React from 'react';
import AdminLayout from '@/components/layouts/adminLayout';
import AnalyticsTabs from './analytics/analyticsTabs';
import {
  verifyAdminAuth,
  fetchAdminDashboardData,
} from '@/lib/actions/admin-actions';

/**
 * Admin Dashboard Server Component
 * Displays analytics, charts and key business metrics
 * Uses SSR for faster loading and authentication verification
 */
export default async function AdminPage({ searchParams }) {
  const startDate =
    searchParams?.startDate ||
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const endDate =
    searchParams?.endDate || new Date().toISOString().split('T')[0];

  const authData = await verifyAdminAuth();
  const dashboardData = await fetchAdminDashboardData(startDate, endDate);

  return (
    <AdminLayout>
      <AnalyticsTabs
        initialData={dashboardData}
        userAuth={authData}
        defaultDateRange={{ startDate, endDate }}
      />
    </AdminLayout>
  );
}
