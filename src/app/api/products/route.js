import { NextResponse } from 'next/server';
import { ProductService } from '@/lib/services/productService';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const page = searchParams.get('page');
    const limit = searchParams.get('limit');

    const filters = {
      category: category || 'All products',
      search: search || '',
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 10,
    };

    const result = await ProductService.getProducts(filters);

    if (result.success) {
      return NextResponse.json({
        success: true,
        data: result.data,
        count: result.count,
        message: result.message,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          message: result.message,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Products API error:', error);
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

export async function POST(request) {
  try {
    const productData = await request.json();

    const result = await ProductService.createProduct(productData);

    if (result.success) {
      return NextResponse.json(
        {
          success: true,
          data: result.data,
          message: result.message,
        },
        { status: 201 }
      );
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
    console.error('Create product API error:', error);
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
