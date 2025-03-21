import React, { lazy, Suspense } from 'react';
import HeroSection from '../components/home/HeroSection';
import CategorySection from '../components/home/CategorySection';

// Lazy load non-critical components
const FeaturedProducts = lazy(() => import('../components/home/FeaturedProducts'));
const NewArrivals = lazy(() => import('../components/home/NewArrivals'));
const PromoBanner = lazy(() => import('../components/home/PromoBanner'));
const Testimonials = lazy(() => import('../components/home/Testimonials'));
const Newsletter = lazy(() => import('../components/home/Newsletter'));

// Loading placeholder
const LoadingPlaceholder = () => (
  <div className="w-full py-12 flex justify-center items-center">
    <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Critical above-the-fold content loads immediately */}
      <HeroSection />
      <CategorySection />
      
      {/* Non-critical content loads lazily */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <FeaturedProducts />
        <PromoBanner />
        <NewArrivals />
        <Testimonials />
        <Newsletter />
      </Suspense>
    </div>
  );
};

export default HomePage;