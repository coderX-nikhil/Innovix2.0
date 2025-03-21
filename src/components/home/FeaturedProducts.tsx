import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { useProductStore } from '../../store/productStore';
import { useCartStore } from '../../store/cartStore';
import Button from '../ui/Button';

const FeaturedProducts: React.FC = () => {
  const { getFeaturedProducts } = useProductStore();
  const featuredProducts = getFeaturedProducts();
  const { addItem } = useCartStore();
  
  const handleAddToCart = (productId: string, name: string, price: number, discountPrice: number | undefined, image: string) => {
    addItem({
      productId,
      name,
      price,
      discountPrice,
      image,
      quantity: 1
    });
  };
  
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {featuredProducts.slice(0, 8).map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
              <Link to={`/product/${product.id}`} className="block relative">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {product.discountPrice && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                  </span>
                )}
                {product.isNewArrival && !product.discountPrice && (
                  <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                    NEW
                  </span>
                )}
              </Link>
              
              <div className="p-4">
                <Link to={`/product/${product.id}`} className="block">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
                </Link>
                
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">({product.reviews.length})</span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    {product.discountPrice ? (
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-gray-900">₹{product.discountPrice}</span>
                        <span className="text-sm text-gray-500 line-through ml-2">₹{product.price}</span>
                      </div>
                    ) : (
                      <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                    )}
                  </div>
                  <button 
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Add to wishlist"
                  >
                    <Heart size={20} />
                  </button>
                </div>
                
                <Button
                  onClick={() => handleAddToCart(
                    product.id, 
                    product.name, 
                    product.price, 
                    product.discountPrice, 
                    product.images[0]
                  )}
                  fullWidth
                  className="flex items-center justify-center"
                >
                  <ShoppingCart size={18} className="mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link to="/products">
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;