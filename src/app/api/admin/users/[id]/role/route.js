// app/api/admin/users/[id]/role/route.js
import { NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/actions/admin-actions';
import { adminService } from '@/lib/services/adminService';

export async function PUT(request, { params }) {
  try {
    // Verify admin authentication
    const authResult = await verifyAdminAuth();

    if (!authResult.success) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const { role } = await request.json();

    if (!role || !['user', 'admin'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    // Update user role
    const result = await adminService.updateUserAdminStatus(
      id,
      role === 'admin'
    );

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Admin update user role API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
