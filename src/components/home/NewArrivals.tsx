// 

import React from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../../store/productStore';
import { motion } from 'framer-motion';

const NewArrivals: React.FC = () => {
  const { getNewArrivals } = useProductStore();
  const newArrivals = getNewArrivals();

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">New Arrivals</h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {newArrivals.slice(0, 6).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link to={`/product/${product.id}`} className="group block">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:shadow-2xl">
                  <div className="relative w-full overflow-hidden">
                    {/* Image with Smooth Hover Effect */}
                    <motion.img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-64 object-cover object-center transition-transform duration-300 group-hover:scale-110"
                    />
                    
                    {/* Animated 'NEW' Badge */}
                    <motion.span
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="absolute top-3 left-3 bg-black bg-opacity-30 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md shadow-lg border border-white/10"
>
                      New ✨
                    </motion.span>
                  </div>

                  {/* Product Details */}
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-black transition-colors duration-300">
                      {product.name}
                    </h3>

                    {/* Price Section with Subtle Animation */}
                    <div className="flex items-center justify-between">
                      {product.discountPrice ? (
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="flex items-center transition-transform duration-300"
                        >
                          <span className="text-lg font-bold text-gray-900">₹{product.discountPrice}</span>
                          <span className="text-sm text-gray-500 line-through ml-2">₹{product.price}</span>
                        </motion.div>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default NewArrivals;
