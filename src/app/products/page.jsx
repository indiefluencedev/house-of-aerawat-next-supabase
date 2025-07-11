import { ProductService } from '@/lib/services/productService';
import ProductCard from '@/components/constants/ProductCard';
import Link from 'next/link';
import { Suspense } from 'react';

// Loading component for product cards
function ProductsLoading() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
      {[...Array(8)].map((_, index) => (
        <div key={index} className='animate-pulse'>
          <div className='bg-gray-200 h-[220px] md:h-[271px] xl:h-[380px] rounded-[6px] md:rounded-[8px] mb-4'></div>
          <div className='h-4 bg-gray-200 rounded mb-2'></div>
          <div className='h-4 bg-gray-200 rounded w-2/3'></div>
        </div>
      ))}
    </div>
  );
}

// Main products component
async function ProductsContent({ searchParams }) {
  const filters = {
    category: searchParams.category || 'All products',
    search: searchParams.search || '',
    page: searchParams.page ? parseInt(searchParams.page) : 1,
    limit: searchParams.limit ? parseInt(searchParams.limit) : 20,
  };

  const result = await ProductService.getProducts(filters);

  if (!result.success) {
    return (
      <div className='text-center py-12'>
        <div className='text-red-500 mb-4'>
          <svg
            className='h-12 w-12 mx-auto'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </div>
        <h2 className='text-xl font-semibold text-gray-900 mb-2'>
          Failed to load products
        </h2>
        <p className='text-gray-600'>{result.message}</p>
      </div>
    );
  }

  const products = result.data || [];

  if (products.length === 0) {
    return (
      <div className='text-center py-12'>
        <div className='text-gray-400 mb-4'>
          <svg
            className='h-12 w-12 mx-auto'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m0 0V9a2 2 0 012-2h2m0 0V6a2 2 0 012-2h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V9'
            />
          </svg>
        </div>
        <h2 className='text-xl font-semibold text-gray-900 mb-2'>
          No products found
        </h2>
        <p className='text-gray-600'>
          {filters.search
            ? `No products found for "${filters.search}"`
            : 'No products available at the moment.'}
        </p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
      {products.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`}>
          <ProductCard
            product={{
              id: product.id,
              name: product.name,
              price: product.price || 0,
              image: product.images?.[0] || '/assets/products/cardimage.png',
              category: product.category,
            }}
            className='hover:shadow-lg transition-shadow duration-300'
          />
        </Link>
      ))}
    </div>
  );
}

// Main page component
export default function ProductsPage({ searchParams }) {
  const currentCategory = searchParams.category || 'All products';
  const currentSearch = searchParams.search || '';

  return (
    <div className='min-h-screen'>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        {/* Products Grid */}
        <Suspense fallback={<ProductsLoading />}>
          <ProductsContent searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ searchParams }) {
  const category = searchParams.category || 'All products';
  const search = searchParams.search || '';

  let title = 'Products - House of Aerawat';
  let description =
    'Discover our exquisite collection of handcrafted jewelry and accessories.';

  if (search) {
    title = `Search: ${search} - House of Aerawat`;
    description = `Search results for "${search}" in our collection of handcrafted jewelry and accessories.`;
  } else if (category && category !== 'All products') {
    title = `${category} - House of Aerawat`;
    description = `Browse our ${category} collection of handcrafted jewelry and accessories.`;
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  };
}
