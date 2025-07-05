// app/products/page.jsx - Products listing page
import { serverProductService } from '@/lib/services/productService';
<Link
  href='/api/auth/logout'
  className='bg-[#14397C] text-white px-4 py-2 rounded hover:bg-[#5c1616] transition'
>
  Logout
</Link>;
import { cookies } from 'next/headers';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const category = params?.category || null;
  const search = params?.search || null;

  // Get products based on filters
  let result;
  if (category) {
    result = await serverProductService.getProductsByCategory(category);
  } else if (search) {
    result = await serverProductService.searchProducts(search);
  } else {
    result = await serverProductService.getAllProducts();
  }

  const products = result.success ? result.products : [];

  // Check if user is logged in
  const cookieStore = await cookies();
  const userId = cookieStore.get('user_id')?.value;

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center py-6'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>Products</h1>
              {category && (
                <p className='text-sm text-gray-600 mt-1'>
                  Category: {category}
                </p>
              )}
              {search && (
                <p className='text-sm text-gray-600 mt-1'>Search: "{search}"</p>
              )}
            </div>
            <div className='flex items-center space-x-4'>
              <Link
                href='/'
                className='text-[#14397C] hover:text-[#5c1616] font-medium'
              >
                Home
              </Link>
              {userId ? (
                <>
                  <Link
                    href='/dashboard'
                    className='text-[#14397C] hover:text-[#5c1616] font-medium'
                  >
                    Dashboard
                  </Link>
                  <Link
                    href='/wishlist'
                    className='text-[#14397C] hover:text-[#5c1616] font-medium'
                  >
                    Wishlist
                  </Link>
                  <Link
                    href='/logout'
                    className='bg-[#14397C] text-white px-4 py-2 rounded hover:bg-[#5c1616] transition'
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href='/auth/login'
                    className='text-[#14397C] hover:text-[#5c1616] font-medium'
                  >
                    Login
                  </Link>
                  <Link
                    href='/auth/register'
                    className='bg-[#14397C] text-white px-4 py-2 rounded hover:bg-[#5c1616] transition'
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
        <div className='bg-white rounded-lg shadow p-6 mb-6'>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='flex-1'>
              <form method='GET' className='flex gap-2'>
                <input
                  type='text'
                  name='search'
                  placeholder='Search products...'
                  defaultValue={search || ''}
                  className='flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14397C]'
                />
                <button
                  type='submit'
                  className='px-6 py-2 bg-[#14397C] text-white rounded-md hover:bg-[#5c1616] transition'
                >
                  Search
                </button>
              </form>
            </div>
            <div className='flex gap-2'>
              <Link
                href='/products'
                className={`px-4 py-2 rounded-md transition ${
                  !category && !search
                    ? 'bg-[#14397C] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All Products
              </Link>
              <Link
                href='/products?category=jewelry'
                className={`px-4 py-2 rounded-md transition ${
                  category === 'jewelry'
                    ? 'bg-[#14397C] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Jewelry
              </Link>
              <Link
                href='/products?category=accessories'
                className={`px-4 py-2 rounded-md transition ${
                  category === 'accessories'
                    ? 'bg-[#14397C] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Accessories
              </Link>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {products.map((product) => (
              <div
                key={product.id}
                className='bg-white rounded-lg shadow hover:shadow-md transition'
              >
                <div className='aspect-square bg-gray-200 rounded-t-lg overflow-hidden'>
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    <div className='w-full h-full flex items-center justify-center text-gray-400'>
                      No Image
                    </div>
                  )}
                </div>
                <div className='p-4'>
                  <h3 className='text-lg font-medium text-gray-900 mb-2'>
                    {product.name}
                  </h3>
                  <p className='text-sm text-gray-600 mb-2 line-clamp-2'>
                    {product.description}
                  </p>
                  <div className='flex items-center justify-between'>
                    <span className='text-xl font-bold text-[#14397C]'>
                      ₹{product.price}
                    </span>
                    <Link
                      href={`/products/${product.id}`}
                      className='bg-[#14397C] text-white px-4 py-2 rounded hover:bg-[#5c1616] transition text-sm'
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='text-center py-12'>
            <p className='text-gray-500 text-lg'>No products found.</p>
            <Link
              href='/products'
              className='inline-block mt-4 text-[#14397C] hover:text-[#5c1616] font-medium'
            >
              View All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
