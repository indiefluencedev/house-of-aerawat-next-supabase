// src/components/ProductCard.jsx
'use client';
import React from 'react';
import Link from 'next/link';

const ProductCard = ({
  product,
  onClick,
  showPrice = true,
  className = '',
  imageClassName = 'h-[220px] md:h-[271px] xl:h-[380px]'
}) => {
  return (
    <div
      className={`group overflow-hidden cursor-pointer ${className}`}
      onClick={onClick}
    >
      {/* Image container */}
      <div className={`rounded-[6px] md:rounded-[8px] w-full relative overflow-hidden ${imageClassName}`}>
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
        {showPrice && (product.price > 0 ? (
          <p className="text-lg font-semibold text-gray-900">
            ₹{product.price.toFixed(2)}
          </p>
        ) : (
          <p className="text-[18px] font-medium text-gray-900">Prices On Demand</p>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
