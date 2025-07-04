// app/api/products/route.js - Products API endpoints
import { NextResponse } from 'next/server';
import { serverProductService } from '@/lib/services/productService';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let result;

    if (category) {
      // Get products by category (you'll need to implement this in the service)
      result = await serverProductService.getProductsByCategory(category);
    } else if (search) {
      // Search products (you'll need to implement this in the service)
      result = await serverProductService.searchProducts(search);
    } else {
      // Get all products
      result = await serverProductService.getAllProducts();
    }

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result.products);
  } catch (error) {
    console.error('Products API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate required fields
    const { name, price, description, category, image_url } = body;

    if (!name || !price || !description || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await serverProductService.createProduct({
      name,
      price,
      description,
      category,
      image_url: image_url || null,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result.product, { status: 201 });
  } catch (error) {
    console.error('Create product API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
