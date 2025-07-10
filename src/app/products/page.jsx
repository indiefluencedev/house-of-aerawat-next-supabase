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
        <Link
          key={product.id}
          href={`/products/${product.id}`}
          className='block'
        >
          <ProductCard
            product={{
              id: product.id,
              name: product.name,
              price: product.price || 0,
              image: product.images?.[0] || '/assets/products/cardimage.png',
              category: product.category,
            }}
            className='h-full'
          />
        </Link>
      ))}
    </div>
  );
}

// Filter component
function ProductFilters({ currentCategory, currentSearch }) {
  const categories = [
    { id: 'all', name: 'All Products', slug: 'All products' },
    { id: 1, name: 'Fine Jewellery', slug: 'fine-jewellery' },
    { id: 2, name: 'Shringaar', slug: 'shringaar' },
    { id: 3, name: 'Kalapatt', slug: 'kalapatt' },
    { id: 4, name: 'Crystals', slug: 'crystals' },
    { id: 5, name: 'Wooden Beads', slug: 'wooden-beads' },
    { id: 6, name: 'Treasure Gift', slug: 'treasure-gift' },
  ];

  return (
    <div className='bg-white p-6 rounded-lg shadow-sm mb-8'>
      <h2 className='text-lg font-semibold mb-4'>Categories</h2>
      <div className='flex flex-wrap gap-2'>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${encodeURIComponent(category.slug)}`}
            className={`px-4 py-2 rounded-full text-sm transition-colors duration-200 ${
              currentCategory === category.slug
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

// Search component
function ProductSearch({ currentSearch }) {
  return (
    <div className='bg-white p-6 rounded-lg shadow-sm mb-8'>
      <form method='GET' className='flex gap-4'>
        <input
          type='text'
          name='search'
          placeholder='Search products...'
          defaultValue={currentSearch}
          className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        />
        <button
          type='submit'
          className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200'
        >
          Search
        </button>
      </form>
    </div>
  );
}

// Main page component
export default async function ProductsPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const currentCategory = resolvedSearchParams.category || 'All products';
  const currentSearch = resolvedSearchParams.search || '';

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            Our Products
          </h1>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Discover our exquisite collection of handcrafted jewelry and
            accessories, each piece telling a unique story of tradition and
            craftsmanship.
          </p>
        </div>

        {/* Breadcrumb */}
        <nav className='flex items-center space-x-2 text-sm text-gray-600 mb-8'>
          <Link href='/' className='hover:text-blue-600'>
            Home
          </Link>
          <span>/</span>
          <span className='text-gray-900'>Products</span>
        </nav>

        {/* Search */}
        <ProductSearch currentSearch={currentSearch} />

        {/* Filters */}
        <ProductFilters
          currentCategory={currentCategory}
          currentSearch={currentSearch}
        />

        {/* Products Grid */}
        <Suspense fallback={<ProductsLoading />}>
          <ProductsContent searchParams={resolvedSearchParams} />
        </Suspense>
      </div>
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const category = resolvedSearchParams.category || 'All products';
  const search = resolvedSearchParams.search || '';

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
