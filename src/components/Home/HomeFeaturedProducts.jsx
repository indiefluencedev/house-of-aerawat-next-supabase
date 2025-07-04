'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import products from '../../Data/products';

function HomeFeaturedProducts() {
  const router = useRouter();

  return (
    <div className="max-w-[1340px] mx-auto px-4 py-8">
      {/* Top description text */}
      <p className="text-gray-600 mb-2 text-left">
        Lorem ipsum dolor sit amet consectetur.
      </p>

      {/* Featured Products heading */}
      <h2 className="text-3xl font-bold mb-8 text-left">Featured Products</h2>

      {/* Products grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 xl:gap-8">
        {products.products.map((product, index) => {
          return (
            <div
              key={product.id}
              className={`group overflow-hidden cursor-pointer
                ${index >= 10 ? 'hidden md:block lg:block xl:block' : ''}
                ${index >= 12 ? 'hidden md:hidden lg:hidden xl:block' : ''}
              `}
              onClick={() => router.push(`/products/${product.id}`)}
            >
              {/* Image container */}
              <div className="h-[220px] rounded-[6px] md:rounded-[8px] md:h-[271px] xl:h-[380px] w-full relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Heart icon */}
                <div className="absolute bottom-3 right-3">
                  <img
                    src="/assets/products/cardheart.svg"
                    alt="Add to favorites"
                    className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform duration-200 hover:opacity-80"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>

              {/* Product info */}
              <div className="p-2 text-center">
                <h3 className="font-medium text-[16px] mb-1 text-[#777777]">{product.name}</h3>
                {product.price > 0 ? (
                  <p className="text-lg font-semibold text-gray-900">
                    ₹{product.price.toFixed(2)}
                  </p>
                ) : (
                  <p className="text-[18px] font-medium text-gray-900">Prices On Demand</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* View All Products button - full width on mobile */}
      <div className="mt-8 flex justify-center">
        <button
          className="flex items-center justify-center gap-2 rounded-[4px] bg-[#14397C] text-white px-6 py-3 hover:bg-[#38445a] transition-colors duration-300 cursor-pointer
            w-full max-w-[480px]  /* Full width up to 480px */
            sm:w-auto           /* Auto width above 480px */
          "
          onClick={() => router.push('/wooden-beads')}
        >
          <span>View All Products</span>
          <img
            src="/assets/Frame.svg"
            alt="Arrow icon"
            className="w-5 h-5"
          />
        </button>
      </div>
    </div>
  );
}

export default HomeFeaturedProducts;
