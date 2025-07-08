// src/app/category/[slug]/page.jsx
'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import products from '@/Data/products';
import Link from 'next/link';
import ProductCard from '@/components/constants/ProductCard';
import Image from 'next/image';
import priceIcon from '../../../../public/assets/products/price.svg';
import filterIcon from '../../../../public/assets/products/filter.svg';

export default function CategoryPage({ params }) {
  const router = useRouter();
  const { slug } = params;
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [showSizeFilter, setShowSizeFilter] = useState(false);
  const [priceRange, setPriceRange] = useState([1000, 7000]);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [sortOption, setSortOption] = useState('price-high-to-low');

  // Debugging logs
  console.log('Current slug:', slug);
  console.log('All categories:', products.categories);

  const currentCategory = products.categories.find(cat => cat.slug === slug);
  let categoryProducts = products.products.filter(
    product => product.category === slug
  );

  // Sort products based on selected option
  const sortProducts = (products, option) => {
    switch (option) {
      case 'price-high-to-low':
        return [...products].sort((a, b) => b.price - a.price);
      case 'price-low-to-high':
        return [...products].sort((a, b) => a.price - b.price);
      case 'newest-first':
        return [...products].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      case 'oldest-first':
        return [...products].sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
      case 'name-a-to-z':
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      case 'name-z-to-a':
        return [...products].sort((a, b) => b.name.localeCompare(a.name));
      default:
        return products;
    }
  };

  // Apply sorting
  categoryProducts = sortProducts(categoryProducts, sortOption);

  const sortOptions = [
    { value: 'price-high-to-low', label: 'Price: High to Low' },
    { value: 'price-low-to-high', label: 'Price: Low to High' },
    { value: 'newest-first', label: 'Newest First' },
    { value: 'oldest-first', label: 'Oldest First' },
    { value: 'name-a-to-z', label: 'Name: A to Z' },
    { value: 'name-z-to-a', label: 'Name: Z to A' }
  ];

  if (!currentCategory) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-xl">Category not found</p>
        <Link href="/" className="text-blue-500 mt-4 inline-block">
          Go back home
        </Link>
      </div>
    );
  }

  const handlePriceToggle = () => {
    setShowPriceFilter(!showPriceFilter);
    setShowSizeFilter(false);
  };

  const handleFilterToggle = () => {
    setShowSizeFilter(!showSizeFilter);
    setShowPriceFilter(false);
  };

  const closeFilters = () => {
    setShowPriceFilter(false);
    setShowSizeFilter(false);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    setShowSortDropdown(false);
  };

  const getCurrentSortLabel = () => {
    return sortOptions.find(option => option.value === sortOption)?.label || 'Price: High to Low';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with Title and Sort Dropdown */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{currentCategory.name}</h1>

        {/* Sort Dropdown */}
        <div className="relative lg:block hidden">
          <button
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            className="flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 min-w-[200px] cursor-pointer"
          >
            <span className="text-sm font-medium text-gray-700">
              {getCurrentSortLabel()}
            </span>
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                showSortDropdown ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          <div
            className={`absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50 transition-all cursor-pointer duration-200 ease-in-out ${
              showSortDropdown
                ? 'opacity-100 transform translate-y-0 visible'
                : 'opacity-0 transform -translate-y-2 invisible'
            }`}
          >
            <div className="py-1">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSortChange(option.value)}
                  className={`w-full cursor-pointer text-left px-4 py-2 text-sm transition-colors duration-150 ${
                    sortOption === option.value
                      ? 'bg-pink-50 text-pink-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Desktop Filters Sidebar - Hidden on mobile */}
        <div className="hidden lg:block w-full lg:w-1/5">
          <div className="bg-white p-4 ">
            <h3 className="text-lg font-semibold mb-4 tracking-wide">FILTERS</h3>

            {/* Price Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2 text-[16px]">PRICE</h3>
              <div className="relative mt-6">
                {/* Custom dual range slider */}
                <div className="relative h-1 bg-gray-200 rounded-full">
                  {/* Active track (blue) */}
                  <div
                    className="absolute h-1 bg-[#14397C] rounded-full"
                    style={{
                      left: `${((priceRange[0] - 1000) / (7000 - 1000)) * 100}%`,
                      width: `${((priceRange[1] - priceRange[0]) / (7000 - 1000)) * 100}%`
                    }}
                  />
                  {/* Min handle */}
                  <input
                    type="range"
                    min="1000"
                    max="7000"
                    step="100"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer range-slider"
                  />
                  {/* Max handle */}
                  <input
                    type="range"
                    min="1000"
                    max="7000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer range-slider"
                  />
                </div>

                {/* Price labels */}
                <div className="flex justify-between mt-4 text-sm font-medium text-gray-700">
                  <span>₹{priceRange[0].toLocaleString()}</span>
                  <span>₹{priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Size Filter */}
            <div>
              <h3 className="font-medium mb-2">SIZE</h3>
              <ul className="space-y-2">
                {['4 inches', '5 inches', '6 inches', '7 inches', 'Custom'].map((size) => (
                  <li key={size}>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      {size}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="w-full lg:w-full mb-20 md:mb-0">
          {/* Products Grid */}
          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 xl:gap-4">
              {categoryProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => router.push(`/products/${product.id}`)}
                  imageClassName="h-[220px] md:h-[280px] lg:h-[230px] xl:h-[300px] 2xl:h-[350px]"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p>No products found in this category</p>
              <Link href="/" className="text-blue-500 mt-2 inline-block">
                Browse all products
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Bar - Only visible on mobile/tablet */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        {/* Filter Options Bar */}
        <div className="flex">
          <button
            onClick={handlePriceToggle}
            className="flex-1 py-3 px-4 text-center border-r border-gray-200 flex items-center justify-center space-x-2 hover:bg-gray-50"
          >
            <Image
              src={priceIcon}
              alt="Price"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            <span className="font-bold text-[16px] text-black/50">Price</span>
            <svg
              className={`w-4 h-4 text-black/50 transition-transform ${showPriceFilter ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <button
            onClick={handleFilterToggle}
            className="flex-1 py-3 px-4 text-center flex items-center justify-center space-x-2 hover:bg-gray-50"
          >
            <Image
              src={filterIcon}
              alt="Filter"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            <span className="font-bold text-[16px] text-black/50">Filter</span>
            <svg
              className={`w-4 h-4 text-black/50 transition-transform ${showSizeFilter ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Price Filter Panel */}
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
          showPriceFilter ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Price Range</h3>
              <button
                onClick={closeFilters}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>

              <div className="relative h-1 bg-gray-200 rounded-full">
                {/* Active track (blue) */}
                <div
                  className="absolute h-1 bg-[#14397C] rounded-full"
                  style={{
                    left: `${((priceRange[0] - 1000) / (7000 - 1000)) * 100}%`,
                    width: `${((priceRange[1] - priceRange[0]) / (7000 - 1000)) * 100}%`
                  }}
                />
                {/* Min handle */}
                <input
                  type="range"
                  min="1000"
                  max="7000"
                  step="100"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer range-slider"
                />
                {/* Max handle */}
                <input
                  type="range"
                  min="1000"
                  max="7000"
                  step="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer range-slider"
                />
              </div>

              <div className="flex justify-between">
                <button className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                  Clear
                </button>
                <button className="px-4 py-2 text-sm bg-[#14397C] text-white rounded-md hover:bg-[#455066]">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Size Filter Panel */}
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
          showSizeFilter ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Size</h3>
              <button
                onClick={closeFilters}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-3 max-h-40 overflow-y-auto">
              {['4 inches', '5 inches', '6 inches', '7 inches', 'Custom'].map((size) => (
                <label key={size} className="flex items-center space-x-3 cursor-pointer hover:bg-white p-2 rounded">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                  />
                  <span className="text-sm">{size}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
              <button className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                Clear
              </button>
              <button className="px-4 py-2 text-sm bg-pink-600 text-white rounded-md hover:bg-pink-700">
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile filters */}
      {(showPriceFilter || showSizeFilter) && (
        <div
          className="md:hidden fixed inset-0 bg-black/35 z-40"
          onClick={closeFilters}
        />
      )}

      {/* Overlay for sort dropdown */}
      {showSortDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowSortDropdown(false)}
        />
      )}

      <style jsx>{`
        .range-slider::-webkit-slider-thumb {
          appearance: none;
          height: 14px;
          width: 14px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          border: 4px solid #14397C;
          margin-bottom: 5px;
          box-shadow: 0 0 0 1px #14397C;
          position: relative;
          z-index: 2;
        }

        .range-slider::-moz-range-thumb {
          height: 14px;
          width: 14px;
          border-radius: 50%;
          background: #14397C;
          cursor: pointer;
          border: 3px solid #ffffff;
          box-shadow: 0 0 0 1px #14397C;
          position: relative;
          z-index: 2;
        }

        .range-slider::-webkit-slider-track {
          background: transparent;
          height: 5px;
        }

        .range-slider::-moz-range-track {
          background: transparent;
          height: 5px;
        }

        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ec4899;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 0 0 1px #ec4899;
        }

        .slider-thumb::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ec4899;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 0 0 1px #ec4899;
        }
      `}</style>
    </div>
  );
}
