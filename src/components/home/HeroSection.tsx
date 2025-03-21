// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Button from '../ui/Button';

// interface HeroSlide {
//   id: number;
//   title: string;
//   subtitle: string;
//   image: string;
//   buttonText: string;
//   buttonLink: string;
// }

// const slides: HeroSlide[] = [
//   {
//     id: 5,
//     title: 'iPhone 16e',
//     subtitle: 'Power and performance in a sleek design.',
//     image: 'https://cdn2.peky.com.tr/medya/2025/02/apple-announces-its-latest-budget-phone-the-iphone-16e_wrgs.1280.jpg-png.webp', // Placeholder image URL
//     buttonText: 'Buy Now 🎉',
//     buttonLink: '/product/16e'
//   },
//   {
//     id: 4,
//     title: 'iPhone 16 Pro Max',
//     subtitle: 'Innovation at its peak.',
//     image: 'https://www.apple.com/v/iphone-16-pro/e/images/overview/welcome/hero_endframe__b3cjfkquc2s2_xlarge.jpg', // Placeholder image URL
//     buttonText: 'Order Now',
//     buttonLink: '/product/7'
//   },
//   {
//     id: 1,
//     title: 'iPhone 15 Pro Max',
//     subtitle: 'Titanium. So strong. So light. So Pro.',
//     image: 'https://images.unsplash.com/photo-1695619575333-fc73accd441e?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     buttonText: 'Shop Now',
//     buttonLink: '/product/1'
//   }
// ];

// const HeroSection: React.FC = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
  
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 5000);
    
//     return () => clearInterval(interval);
//   }, []);
  
//   const goToSlide = (index: number) => {
//     setCurrentSlide(index);
//   };
  
//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % slides.length);
//   };
  
//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
//   };
  
//   return (
//     <section className="relative h-[600px] overflow-hidden">
//       {/* Slides */}
//       <div className="h-full">
//         {slides.map((slide, index) => (
//           <div
//             key={slide.id}
//             className={`absolute inset-0 transition-opacity duration-1000 ${
//               index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
//             }`}
//           >
//             <div className="absolute inset-0 bg-black/30 z-10" />
//             <img
//               src={slide.image}
//               alt={slide.title}
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 flex items-center z-20">
//               <div className="container mx-auto px-4">
//                 <div className="max-w-xl">
//                   <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
//                     {slide.title}
//                   </h1>
//                   <p className="text-xl md:text-2xl text-white mb-8">
//                     {slide.subtitle}
//                   </p>
//                   <Link to={slide.buttonLink}>
//                     <Button size="lg">
//                       {slide.buttonText}
//                     </Button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
      
//       {/* Navigation Arrows */}
//       {/* <button
//         onClick={prevSlide}
//         className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
//         aria-label="Previous slide"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//         </svg>
//       </button>
//       <button
//         onClick={nextSlide}
//         className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
//         aria-label="Next slide"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//         </svg>
//       </button>
//        */}
//       {/* Indicators */}
//       <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => goToSlide(index)}
//             className={`w-3 h-3 rounded-full transition-colors ${
//               index === currentSlide ? 'bg-white' : 'bg-white/50'
//             }`}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
  buttonLink: string;
}

const slides: HeroSlide[] = [
  {
    id: 5,
    title: 'iPhone 16e',
    subtitle: 'Power and performance in a sleek design.',
    image: 'https://cdn2.peky.com.tr/medya/2025/02/apple-announces-its-latest-budget-phone-the-iphone-16e_wrgs.1280.jpg-png.webp',
    buttonText: 'Buy Now 🎉',
    buttonLink: '/product/16e'
  },
  {
    id: 4,
    title: 'iPhone 16 Pro Max',
    subtitle: 'Innovation at its peak.',
    image: 'https://www.apple.com/v/iphone-16-pro/e/images/overview/welcome/hero_endframe__b3cjfkquc2s2_xlarge.jpg',
    buttonText: 'Order Now',
    buttonLink: '/product/7'
  },
  {
    id: 1,
    title: 'iPhone 15 Pro Max',
    subtitle: 'Titanium. So strong. So light. So Pro.',
    image: 'https://images.unsplash.com/photo-1695619575333-fc73accd441e?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    buttonText: 'Shop Now',
    buttonLink: '/product/1'
  }
];

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[600px] md:h-[500px] sm:h-[450px] h-[400px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div className="absolute inset-0 bg-black/30 z-10" />
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 flex flex-col items-center md:items-start justify-center text-center md:text-left z-20 px-6 sm:px-10 md:px-16 lg:px-24">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-2 sm:mb-4 animate-pulse drop-shadow-lg">
              {slide.title}
            </h1>
            <p className="text-lg sm:text-xl text-white mb-4 sm:mb-6 opacity-80">
              {slide.subtitle}
            </p>
            <Link to={slide.buttonLink}>
              <button className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-black  text-white font-bold text-lg rounded-lg shadow-lg transform transition-transform hover:scale-110 active:scale-95">
                {slide.buttonText}
              </button>
            </Link>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;