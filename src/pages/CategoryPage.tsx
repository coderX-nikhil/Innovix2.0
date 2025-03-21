import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Filter, ChevronDown, ChevronRight, X } from 'lucide-react';
import { getCategoryBySlug } from '../data/categories';
import { useProductStore } from '../store/productStore';
import { useCartStore } from '../store/cartStore';
import Button from '../components/ui/Button';

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = getCategoryBySlug(slug || '');
  const { getProductsByCategory } = useProductStore();
  const products = useMemo(() => getProductsByCategory(category?.name || ''), [category?.name, getProductsByCategory]);
  const { addItem } = useCartStore();
  
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<typeof products>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  useEffect(() => {
    setIsLoading(true);
    
    let result = [...products];
    
    // Filter by subcategory
    if (selectedSubcategories.length > 0) {
      result = result.filter(product => 
        product.subcategory && selectedSubcategories.includes(product.subcategory)
      );
    }
    
    // Filter by price range
    result = result.filter(product => {
      const price = product.discountPrice || product.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });
    
    // Sort products
    switch (sortOption) {
      case 'price-asc':
        result = [...result].sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceA - priceB;
        });
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceB - priceA;
        });
        break;
      case 'newest':
        result = [...result].sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      default: // featured
        result = [...result].filter(p => p.isFeatured).concat(
          [...result].filter(p => !p.isFeatured)
        );
    }
    
    setFilteredProducts(result);
    setIsLoading(false);
  }, [products, selectedSubcategories, priceRange, sortOption]);
  
  const handleSubcategoryChange = (subcategory: string) => {
    setSelectedSubcategories(prev => {
      if (prev.includes(subcategory)) {
        return prev.filter(sc => sc !== subcategory);
      } else {
        return [...prev, subcategory];
      }
    });
  };
  
  const handlePriceChange = (min: number, max: number) => {
    setPriceRange([min, max]);
  };
  
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
  
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  if (!category) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Category Not Found</h2>
        <p className="mb-6">The category you're looking for doesn't exist or has been removed.</p>
        <Link to="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm mb-6">
        <Link to="/" className="text-gray-500 hover:text-black">Home</Link>
        <ChevronRight size={16} className="mx-2 text-gray-400" />
        <span className="text-gray-900 font-medium">{category.name}</span>
      </nav>
      
      <div className="flex flex-col md:flex-row">
        {/* Sidebar Filters - Desktop */}
        <div className="hidden md:block w-64 mr-8">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h2 className="text-lg font-bold mb-4">Filters</h2>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Subcategories</h3>
                {selectedSubcategories.length > 0 && (
                  <button 
                    className="text-xs text-black hover:underline" 
                    onClick={() => setSelectedSubcategories([])}
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {category.subcategories.map((subcategory) => (
                  <label key={subcategory.id} className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded text-black focus:ring-black"
                      checked={selectedSubcategories.includes(subcategory.name)}
                      onChange={() => handleSubcategoryChange(subcategory.name)}
                    />
                    <span className="ml-2 text-gray-700">{subcategory.name}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Price Range</h3>
                {(priceRange[0] !== 0 || priceRange[1] !== 5000) && (
                  <button 
                    className="text-xs text-black hover:underline" 
                    onClick={() => handlePriceChange(0, 5000)}
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    className="text-black focus:ring-black"
                    checked={priceRange[0] === 0 && priceRange[1] === 5000}
                    onChange={() => handlePriceChange(0, 5000)}
                  />
                  <span className="ml-2 text-gray-700">All Prices</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    className="text-black focus:ring-black"
                    checked={priceRange[0] === 0 && priceRange[1] === 500}
                    onChange={() => handlePriceChange(0, 500)}
                  />
                  <span className="ml-2 text-gray-700">Under ₹500</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    className="text-black focus:ring-black"
                    checked={priceRange[0] === 500 && priceRange[1] === 1000}
                    onChange={() => handlePriceChange(500, 1000)}
                  />
                  <span className="ml-2 text-gray-700">₹500 - ₹1,000</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    className="text-black focus:ring-black"
                    checked={priceRange[0] === 1000 && priceRange[1] === 2000}
                    onChange={() => handlePriceChange(1000, 2000)}
                  />
                  <span className="ml-2 text-gray-700">₹1,000 - ₹2,000</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    className="text-black focus:ring-black"
                    checked={priceRange[0] === 2000 && priceRange[1] === 5000}
                    onChange={() => handlePriceChange(2000, 5000)}
                  />
                  <span className="ml-2 text-gray-700">₹2,000 & Above</span>
                </label>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              fullWidth
              onClick={() => {
                setSelectedSubcategories([]);
                setPriceRange([0, 5000]);
              }}
            >
              Clear All Filters
            </Button>
          </div>
        </div>
        
        {/* Mobile Filter Button */}
        <div className="md:hidden mb-4">
          <Button 
            variant="outline" 
            onClick={toggleFilter}
            className="flex items-center"
          >
            <Filter size={18} className="mr-2" />
            Filters
          </Button>
        </div>
        
        {/* Mobile Filter Sidebar */}
        {isFilterOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={toggleFilter}></div>
            <div className="absolute inset-y-0 left-0 max-w-full flex">
              <div className="relative w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button 
                      onClick={toggleFilter}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-4">
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">Subcategories</h3>
                        {selectedSubcategories.length > 0 && (
                          <button 
                            className="text-xs text-black hover:underline" 
                            onClick={() => setSelectedSubcategories([])}
                          >
                            Clear
                          </button>
                        )}
                      </div>
                      <div className="space-y-2">
                        {category.subcategories.map((subcategory) => (
                          <label key={subcategory.id} className="flex items-center">
                            <input
                              type="checkbox"
                              className="rounded text-black focus:ring-black"
                              checked={selectedSubcategories.includes(subcategory.name)}
                              onChange={() => handleSubcategoryChange(subcategory.name)}
                            />
                            <span className="ml-2 text-gray-700">{subcategory.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">Price Range</h3>
                        {(priceRange[0] !== 0 || priceRange[1] !== 5000) && (
                          <button 
                            className="text-xs text-black hover:underline" 
                            onClick={() => handlePriceChange(0, 5000)}
                          >
                            Clear
                          </button>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            className="text-black focus:ring-black"
                            checked={priceRange[0] === 0 && priceRange[1] === 5000}
                            onChange={() => handlePriceChange(0, 5000)}
                          />
                          <span className="ml-2 text-gray-700">All Prices</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            className="text-black focus:ring-black"
                            checked={priceRange[0] === 0 && priceRange[1] === 500}
                            onChange={() => handlePriceChange(0, 500)}
                          />
                          <span className="ml-2 text-gray-700">Under ₹500</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            className="text-black focus:ring-black"
                            checked={priceRange[0] === 500 && priceRange[1] === 1000}
                            onChange={() => handlePriceChange(500, 1000)}
                          />
                          <span className="ml-2 text-gray-700">₹500 - ₹1,000</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            className="text-black focus:ring-black"
                            checked={priceRange[0] === 1000 && priceRange[1] === 2000}
                            onChange={() => handlePriceChange(1000, 2000)}
                          />
                          <span className="ml-2 text-gray-700">₹1,000 - ₹2,000</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            className="text-black focus:ring-black"
                            checked={priceRange[0] === 2000 && priceRange[1] === 5000}
                            onChange={() => handlePriceChange(2000, 5000)}
                          />
                          <span className="ml-2 text-gray-700">₹2,000 & Above</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 p-4">
                    <Button 
                      fullWidth
                      onClick={toggleFilter}
                    >
                      Apply Filters
                    </Button>
                    <Button 
                      variant="outline" 
                      fullWidth
                      className="mt-2"
                      onClick={() => {
                        setSelectedSubcategories([]);
                        setPriceRange([0, 5000]);
                      }}
                    >
                      Clear All Filters
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{category.name}</h1>
                <p className="text-gray-600">{filteredProducts.length} products</p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <div className="flex items-center">
                  <span className="text-sm text-gray-700 mr-2">Sort by:</span>
                  <div className="relative">
                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-black text-sm"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="newest">Newest</option>
                      <option value="rating">Top Rated</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <ChevronDown size={16} className="text-gray-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-600">Loading products...</p>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold mb-2">No products found</h2>
                  <p className="text-gray-600 mb-4">Try adjusting your filters or browse other categories.</p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSelectedSubcategories([]);
                      setPriceRange([0, 5000]);
                    }}
                  >
                    Clear All Filters
                  </Button>
                </>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                // Display skeleton loading indicators
                Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                    <div className="w-full h-64 bg-gray-200"></div>
                    <div className="p-4">
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                      <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))
              ) : (
                filteredProducts.map((product) => (
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
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;