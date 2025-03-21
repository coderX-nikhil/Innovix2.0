import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, ChevronRight, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { useProductStore } from '../store/productStore';
import { useCartStore } from '../store/cartStore';
import Button from '../components/ui/Button';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById, getSimilarProducts } = useProductStore();
  const product = useMemo(() => getProductById(id || ''), [id, getProductById]);
  const similarProducts = useMemo(() => getSimilarProducts(id || '', 4), [id, getSimilarProducts]);
  const { addItem } = useCartStore();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  
  // Reset quantity and selected image when product changes
  useEffect(() => {
    setQuantity(1);
    setSelectedImage(0);
    setIsAdded(false);
  }, [id]);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    );
  }
  
  const handleAddToCart = useCallback(() => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      discountPrice: product.discountPrice,
      image: product.images[0],
      quantity
    });
    setIsAdded(true);
    
    // Reset added confirmation after 3 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 3000);
  }, [product, quantity, addItem]);
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value));
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm mb-8">
        <Link to="/" className="text-gray-500 hover:text-black">Home</Link>
        <ChevronRight size={16} className="mx-2 text-gray-400" />
        <Link to={`/category/${product.category.toLowerCase()}`} className="text-gray-500 hover:text-black">
          {product.category}
        </Link>
        <ChevronRight size={16} className="mx-2 text-gray-400" />
        <span className="text-gray-900 font-medium">{product.name}</span>
      </nav>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div>
          <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img 
              src={product.images[selectedImage]} 
              alt={product.name}
              className="w-full h-auto object-contain aspect-square"
            />
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`border rounded-md overflow-hidden ${
                  selectedImage === index ? 'border-black' : 'border-gray-200'
                }`}
              >
                <img 
                  src={image} 
                  alt={`${product.name} - View ${index + 1}`}
                  className="w-full h-24 object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i}
                  size={18}
                  className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">{product.rating.toFixed(1)} ({product.reviews.length} reviews)</span>
          </div>
          
          <div className="mb-6">
            {product.discountPrice ? (
              <div className="flex items-center">
                <span className="text-3xl font-bold text-gray-900">₹{product.discountPrice}</span>
                <span className="text-xl text-gray-500 line-through ml-3">₹{product.price}</span>
                <span className="ml-3 bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-medium">
                  Save ₹{(product.price - product.discountPrice).toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
            )}
          </div>
          
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-2">Key Features:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          
          <div className="border-t border-b border-gray-200 py-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <span className="block text-sm font-medium text-gray-700 mb-1">
                  Availability
                </span>
                {product.stock > 0 ? (
                  <span className="text-green-600 font-medium">In Stock</span>
                ) : (
                  <span className="text-red-600 font-medium">Out of Stock</span>
                )}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleAddToCart}
                fullWidth
                disabled={product.stock === 0}
                className="flex items-center justify-center"
              >
                <ShoppingCart size={18} className="mr-2" />
                Add to Cart
              </Button>
              
              <Button
                variant="outline"
                fullWidth
                className="flex items-center justify-center"
              >
                <Heart size={18} className="mr-2" />
                Add to Wishlist
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center">
              <Truck size={20} className="text-gray-600 mr-2" />
              <span className="text-sm text-gray-700">Free shipping</span>
            </div>
            <div className="flex items-center">
              <Shield size={20} className="text-gray-600 mr-2" />
              <span className="text-sm text-gray-700">1 Year Warranty</span>
            </div>
            <div className="flex items-center">
              <RotateCcw size={20} className="text-gray-600 mr-2" />
              <span className="text-sm text-gray-700">30-Day Returns</span>
            </div>
          </div>
          
          <div className="flex items-center">
            <span className="text-sm text-gray-700 mr-4">Share:</span>
            <div className="flex space-x-2">
              <button className="text-gray-600 hover:text-black transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </button>
              <button className="text-gray-600 hover:text-black transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </button>
              <button className="text-gray-600 hover:text-black transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </button>
              <button className="text-gray-600 hover:text-black transition-colors">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Details Tabs */}
      <div className="mt-12">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button className="border-b-2 border-black px-1 py-4 text-sm font-medium text-black">
              Specifications
            </button>
            <button className="border-b-2 border-transparent px-1 py-4 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Reviews ({product.reviews.length})
            </button>
            <button className="border-b-2 border-transparent px-1 py-4 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              FAQs
            </button>
          </nav>
        </div>
        
        <div className="py-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Technical Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="border-b border-gray-200 pb-3">
                <dt className="text-sm font-medium text-gray-500">{key.charAt(0).toUpperCase() + key.slice(1)}</dt>
                <dd className="mt-1 text-sm text-gray-900">{value}</dd>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Similar Products Section */}
      {similarProducts.length > 0 && (
        <div className="mt-16">
          <div className="border-b border-gray-200 mb-8">
            <h2 className="text-2xl font-bold pb-2">Similar Products</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map((similarProduct) => (
              <div key={similarProduct.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
                <Link to={`/product/${similarProduct.id}`} className="block relative">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
                    <img 
                      src={similarProduct.images[0]} 
                      alt={similarProduct.name}
                      className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  {similarProduct.discountPrice && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {Math.round(((similarProduct.price - similarProduct.discountPrice) / similarProduct.price) * 100)}% OFF
                    </span>
                  )}
                </Link>
                
                <div className="p-4">
                  <Link to={`/product/${similarProduct.id}`} className="block">
                    <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-1">{similarProduct.name}</h3>
                  </Link>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(similarProduct.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      {similarProduct.discountPrice ? (
                        <div className="flex items-center">
                          <span className="text-lg font-bold text-gray-900">₹{similarProduct.discountPrice}</span>
                          <span className="text-sm text-gray-500 line-through ml-2">₹{similarProduct.price}</span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">₹{similarProduct.price}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;