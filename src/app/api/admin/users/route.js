// app/api/admin/users/route.js
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

    // Get all users
    const result = await adminService.getAllUsers();

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Admin users API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
