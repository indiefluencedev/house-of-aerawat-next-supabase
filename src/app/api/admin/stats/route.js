// app/api/admin/stats/route.js
import { NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/actions/admin-actions';
import { adminService } from '@/lib/services/adminService';

export async function GET() {
  try {
    // Verify admin authentication
    const authResult = await verifyAdminAuth();

    if (!authResult.success) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get admin stats
    const stats = await adminService.getAdminStats();

    if (!stats.success) {
      return NextResponse.json({ error: stats.error }, { status: 500 });
    }

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Admin stats API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
