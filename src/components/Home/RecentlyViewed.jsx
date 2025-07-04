'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import products from '../../Data/products';

function RecentlyViewed() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Calculate how many cards to show based on screen size
  const [cardsToShow, setCardsToShow] = useState(4);
  const [cardWidth, setCardWidth] = useState(25); // 25% for 4 cards

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setCardsToShow(2);
        setCardWidth(50); // 50% for 2 cards on mobile
      } else if (width < 1024) {
        setCardsToShow(3);
        setCardWidth(33.33); // 33.33% for 3 cards on tablet
      } else {
        setCardsToShow(4);
        setCardWidth(25); // 25% for 4 cards on desktop
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate total slides - can slide until we reach the end
  const totalSlides = Math.max(0, products.products.length - cardsToShow);

  const nextSlide = () => {
    if (isTransitioning || currentSlide >= totalSlides) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev + 1);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const prevSlide = () => {
    if (isTransitioning || currentSlide <= 0) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev - 1);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  // Calculate the transform value to slide one card at a time
  const getTransform = () => {
    // Each slide moves by one card width (100% / total cards)
    const singleCardWidth = 100 / products.products.length;
    const baseTransform = currentSlide * singleCardWidth;
    return `translateX(-${baseTransform}%)`;
  };

  return (
    <div className="max-w-[1340px] mx-auto px-4 py-8">
      {/* Top description text */}
      <p className="text-gray-600 mb-2 text-left">
        Lorem ipsum dolor sit amet consectetur.
      </p>

      {/* Featured Products heading */}
      <h2 className="text-3xl font-bold mb-8 text-left">Recently Viewed Items</h2>

      {/* Carousel Container */}
      <div className="relative">
        {/* Products carousel */}
        <div className="overflow-hidden rounded-lg">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: getTransform(),
              width: `${products.products.length * (95 / cardsToShow)}%`
            }}
          >
            {products.products.map((product, index) => (
              <div
                key={product.id}
                className="flex-shrink-0 px-2"
                style={{ width: `${100 / products.products.length}%` }}
              >
                <div
                  className="group overflow-hidden cursor-pointer"
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
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={prevSlide}
            disabled={isTransitioning || currentSlide <= 0}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200 cursor-pointer"
          >
            <svg
              className="w-5 h-5 text-gray-600 transform rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Slide indicators */}
          {/* <div className="flex gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isTransitioning) {
                    setIsTransitioning(true);
                    setCurrentSlide(index);
                    setTimeout(() => setIsTransitioning(false), 300);
                  }
                }}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentSlide ? 'bg-[#14397C]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div> */}

          <button
            onClick={nextSlide}
            disabled={isTransitioning || currentSlide >= totalSlides}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200 cursor-pointer"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>


    </div>
  );
}

export default RecentlyViewed;
