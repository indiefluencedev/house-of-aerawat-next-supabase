// app/api/admin/users/[id]/route.js
import { NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/actions/admin-actions';
import { adminService } from '@/lib/services/adminService';

export async function GET(request, { params }) {
  try {
    // Verify admin authentication
    const authResult = await verifyAdminAuth();

    if (!authResult.success) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    // Get user by ID
    const result = await adminService.getUserById(id);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Admin get user API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    // Verify admin authentication
    const authResult = await verifyAdminAuth();

    if (!authResult.success) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    // Delete user
    const result = await adminService.deleteUser(id);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Admin delete user API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
