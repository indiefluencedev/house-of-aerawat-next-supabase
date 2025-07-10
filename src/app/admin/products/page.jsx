'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/layouts/adminLayout';
import AddProductForm from '@/components/products/AddProductForm';
import { ProductService } from '@/lib/services/productService';
import Image from 'next/image';

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All products');
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'All products',
    'Crystal',
    'Fine Jewellery',
    'Kalpatt',
    'Wooden Beads',
    'Treasure Gifts',
  ];

  // Fetch products from database
  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchTerm]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const result = await ProductService.getProducts({
        category: selectedCategory,
        search: searchTerm,
      });

      if (result.success) {
        setProducts(result.data);
      } else {
        console.error('Failed to fetch products:', result.message);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (productData) => {
    try {
      setIsSubmitting(true);
      const result = await ProductService.createProduct(productData);

      if (result.success) {
        setIsAddProductModalOpen(false);
        fetchProducts(); // Refresh the product list
        alert('Product added successfully!');
      } else {
        alert('Failed to add product: ' + result.message);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const result = await ProductService.deleteProduct(productId);

        if (result.success) {
          fetchProducts(); // Refresh the product list
          alert('Product deleted successfully!');
        } else {
          alert('Failed to delete product: ' + result.message);
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
      }
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All products' ||
      product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <AdminLayout>
      <div className='min-h-screen'>
        <div className='max-w-7xl mx-auto px-4 py-8'>
          {/* Header */}
          <div className='flex justify-between items-center mb-8'>
            <h1 className='text-3xl font-bold '>Products</h1>
            <button
              onClick={() => setIsAddProductModalOpen(true)}
              className='inline-block bg-gray-100 text-black text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-gray-200'
            >
              Add product
            </button>
          </div>

          {/* Category Tabs */}
          <div className='flex space-x-6 mb-6 border-b border-gray-200'>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`pb-4 px-1 text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className='mb-6'>
            <div className='relative max-w-md'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <svg
                  className='h-5 w-5 text-gray-400'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <input
                type='text'
                placeholder='Search products'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>
          </div>

          {/* Products Table */}
          <div className='bg-white rounded-lg shadow overflow-hidden'>
            {loading ? (
              <div className='p-8 text-center'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4'></div>
                <p className='text-gray-600'>Loading products...</p>
              </div>
            ) : (
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='text-black font-bold'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Image
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Product
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Price
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Category
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className='hover:bg-gray-50 transition-colors'
                    >
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex-shrink-0 h-12 w-12'>
                          {product.images && product.images.length > 0 ? (
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              width={48}
                              height={48}
                              className='h-12 w-12 rounded-lg object-cover'
                            />
                          ) : (
                            <div className='h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center'>
                              <svg
                                className='h-6 w-6 text-gray-400'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm font-medium text-gray-900'>
                          {product.name}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm font-medium text-gray-900'>
                          ₹{product.price}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            product.category === 'Fine Jewellery'
                              ? 'bg-blue-100 text-blue-800'
                              : product.category === 'Crystal'
                              ? 'bg-yellow-100 text-yellow-800'
                              : product.category === 'Kalpatt'
                              ? 'bg-red-100 text-red-800'
                              : product.category === 'Wooden Beads'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}
                        >
                          {product.category}
                        </span>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className='text-red-600 hover:text-red-900 transition-colors'
                        >
                          <svg
                            className='h-5 w-5'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Empty State */}
          {!loading && products.length === 0 && (
            <div className='bg-white rounded-lg shadow p-12 text-center'>
              <svg
                className='mx-auto h-12 w-12 text-gray-400 mb-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'
                />
              </svg>
              <h3 className='text-lg font-medium text-gray-900 mb-2'>
                No products found
              </h3>
              <p className='text-gray-500'>
                {searchTerm || selectedCategory !== 'All products'
                  ? "Try adjusting your search or filter to find what you're looking for."
                  : 'Get started by adding your first product.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add Product Modal */}
      <AddProductForm
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        onSubmit={handleAddProduct}
        isLoading={isSubmitting}
      />
    </AdminLayout>
  );
}
