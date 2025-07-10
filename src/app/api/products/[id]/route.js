import { NextResponse } from 'next/server';
import { ProductService } from '@/lib/services/productService';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const result = await ProductService.getProductById(id);

    if (result.success) {
      return NextResponse.json({
        success: true,
        data: result.data,
        message: result.message,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          message: result.message,
        },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Get product API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const productData = await request.json();

    const result = await ProductService.updateProduct(id, productData);

    if (result.success) {
      return NextResponse.json({
        success: true,
        data: result.data,
        message: result.message,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          message: result.message,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Update product API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const result = await ProductService.deleteProduct(id);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          message: result.message,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Delete product API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
