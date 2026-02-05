'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  backgroundColor: string; // Note: Ensure sufficient contrast with textColor for WCAG accessibility
  textColor: string; // Note: Ensure sufficient contrast with backgroundColor for WCAG accessibility
  image?: string;
}

export interface PromoBannerCarouselProps {
  banners: Banner[];
  autoPlayInterval?: number; // ms, default 4000
}

export const PromoBannerCarousel: React.FC<PromoBannerCarouselProps> = ({
  banners,
  autoPlayInterval = 4000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance
  useEffect(() => {
    if (isPaused || banners.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isPaused, banners.length, autoPlayInterval]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  if (banners.length === 0) {
    return null;
  }

  const currentBanner = banners[currentIndex];

  return (
    <div 
      className="relative w-full h-48 overflow-hidden-xl mr-4 my-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      role="region"
      aria-label="Promotional banners"
    >
      {/* Banner Content */}
      <div
        className="w-full h-full flex items-center justify-between px-8 transition-all duration-500 ease-in-out"
        style={{
          background: currentBanner.backgroundColor,
          color: currentBanner.textColor,
        }}
      >
        {/* Left Content */}
        <div className="flex-1 space-y-2">
          <h2 className="text-2xl font-bold">{currentBanner.title}</h2>
          <p className="text-lg opacity-90">{currentBanner.subtitle}</p>
          <button className="mt-4 px-6 py-2 bg-white text-gray-900-full font-semibold hover:bg-opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
            {currentBanner.ctaText}
          </button>
        </div>

        {/* Right Image (if provided) */}
        {currentBanner.image && (
          <div className="flex-shrink-0 ml-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentBanner.image}
              alt={currentBanner.title}
              className="w-32 h-32 object-contain"
            />
          </div>
        )}
      </div>

      {/* Navigation Arrows */}
      {banners.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10-full bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm flex items-center justify-center transition-all"
            aria-label="Previous banner"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10-full bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm flex items-center justify-center transition-all"
            aria-label="Next banner"
          >
            <ChevronRight size={24} className="text-white" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {banners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2-full transition-all ${
                index === currentIndex
                  ? 'bg-white w-8'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
