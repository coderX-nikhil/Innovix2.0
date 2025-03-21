import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, ChevronRight, ChevronDown, Filter, X } from 'lucide-react';
import { useProductStore } from '../store/productStore';
import { useCartStore } from '../store/cartStore';
import Button from '../components/ui/Button';
import { Product } from '../types';
import { products as rawProducts } from '../data/products';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';
  
  const { searchProducts } = useProductStore();
  const { addItem } = useCartStore();
  
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState('relevance');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentQuery, setCurrentQuery] = useState(query);
  const [inputQuery, setInputQuery] = useState(query);
  
  const directProducts = useMemo(() => rawProducts, []);
  
  const [initialSearchResults, setInitialSearchResults] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  
  const [debugMode, setDebugMode] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  
  // Enhanced failsafe search with better error handling
  const failsafeSearch = useCallback((searchTerm: string): Product[] => {
    if (!searchTerm || !searchTerm.trim()) return [];
    
    try {
      const term = searchTerm.toLowerCase().trim();
      
      if (!directProducts || !Array.isArray(directProducts)) {
        console.error('Direct products is not an array:', directProducts);
        setSearchError('Error accessing product data');
        return [];
      }
      
      return directProducts.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.description.toLowerCase().includes(term) || 
        product.category.toLowerCase().includes(term) ||
        (product.subcategory && product.subcategory.toLowerCase().includes(term))
      );
    } catch (error) {
      console.error('Failsafe search error:', error);
      setSearchError(`Search error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return [];
    }
  }, [directProducts]);
  
  // Function to toggle debug mode with keyboard shortcut (Ctrl+Shift+D)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        setDebugMode(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  useEffect(() => {
    setIsLoading(true);
    setSearchError(null);
    setCurrentQuery(query);
    setInputQuery(query);
    setPriceRange([0, 5000]);
    setSortOption('relevance');
    
    if (!query) {
      setInitialSearchResults([]);
      setFilteredProducts([]);
      setIsLoading(false);
      return;
    }
    
    try {
      // Try store search first
      const results = searchProducts(query);
      
      if (!results || results.length === 0) {
        // If store search fails, try failsafe search
        const failsafeResults = failsafeSearch(query);
        
        if (failsafeResults.length > 0) {
          setInitialSearchResults(failsafeResults);
          setFilteredProducts(failsafeResults);
        } else {
          // If both searches fail, set empty results but don't throw error
          setInitialSearchResults([]);
          setFilteredProducts([]);
        }
      } else {
        setInitialSearchResults(results);
        setFilteredProducts(results);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchError(`Search failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      
      // Try failsafe as last resort on error
      const failsafeResults = failsafeSearch(query);
      setInitialSearchResults(failsafeResults);
      setFilteredProducts(failsafeResults);
    } finally {
      setIsLoading(false);
    }
  }, [query, searchProducts, failsafeSearch]);
  
  // Apply filters and sorting
  useEffect(() => {
    setIsLoading(true);
    
    let result = [...initialSearchResults];
    
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
      default: // relevance - keep original order from search
        break;
    }
    
    setFilteredProducts(result);
    setIsLoading(false);
  }, [initialSearchResults, sortOption, priceRange]);
  
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
  
  const handlePriceChange = (min: number, max: number) => {
    setPriceRange([min, max]);
  };
  
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputQuery.trim()) {
      // Use path-based navigation for better reliability
      const encodedQuery = encodeURIComponent(inputQuery.trim());
      
      try {
        navigate(`/search?q=${encodedQuery}`);
      } catch (error) {
        console.error('Navigation error:', error);
        // Fallback to direct URL change if navigation fails
        window.location.href = `/search?q=${encodedQuery}`;
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm mb-6">
        <Link to="/" className="text-gray-500 hover:text-black">Home</Link>
        <ChevronRight size={16} className="mx-2 text-gray-400" />
        <span className="text-gray-900 font-medium">Search Results</span>
      </nav>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Search Results for "{currentQuery}"</h1>
            <p className="text-gray-600">{filteredProducts.length} products found</p>
          </div>
          
          <form onSubmit={handleSearch} className="flex w-full md:w-auto">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <Button type="submit" className="rounded-l-none">Search</Button>
          </form>
        </div>
      </div>
      
      {/* Add error display when search fails */}
      {searchError && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p className="font-medium">Search Error</p>
          <p>{searchError}</p>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row">
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
        
        {/* Desktop Sidebar Filters */}
        <div className="hidden md:block w-64 mr-8">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h2 className="text-lg font-bold mb-4">Filters</h2>
            
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
                setPriceRange([0, 5000]);
              }}
            >
              Clear All Filters
            </Button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Sort by:</span>
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-black text-sm"
                >
                  <option value="relevance">Relevance</option>
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
                  <p className="text-gray-600 mb-4">
                    We couldn't find any products matching "{currentQuery}".
                    Try using different keywords or check these suggestions:
                  </p>
                  <ul className="text-left text-gray-600 mb-6 mx-auto max-w-md">
                    <li className="mb-2">• Check for spelling errors</li>
                    <li className="mb-2">• Use more general terms (e.g., "phone" instead of "iPhone 15 Pro")</li>
                    <li className="mb-2">• Try searching for a specific category like "Mac", "iPad", or "iPhone"</li>
                    <li className="mb-2">• Remove filters to see more results</li>
                  </ul>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/">
                      <Button>Browse All Products</Button>
                    </Link>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setInputQuery('');
                        navigate('/search?q=');
                      }}
                    >
                      Clear Search
                    </Button>
                  </div>
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
      
      {/* Debug mode panel (hidden unless activated) */}
      {debugMode && (
        <div className="bg-gray-100 border border-gray-300 rounded-md p-4 mt-8">
          <h3 className="text-lg font-semibold mb-2">Search Debug Info</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>Current Query:</strong> {query || 'none'}</p>
              <p><strong>Results Count:</strong> {filteredProducts.length}</p>
              <p><strong>Search Store Products:</strong> {useProductStore.getState().products.length}</p>
              <p><strong>Direct Products:</strong> {directProducts.length}</p>
            </div>
            <div>
              <p><strong>Sort Option:</strong> {sortOption}</p>
              <p><strong>Price Range:</strong> ₹{priceRange[0]} - ₹{priceRange[1]}</p>
              <p><strong>URL:</strong> {window.location.href}</p>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="font-medium mb-2">Quick Test Searches:</h4>
            <div className="flex flex-wrap gap-2">
              <button 
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                onClick={() => navigate('/search?q=iPhone')}
              >
                iPhone
              </button>
              <button 
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                onClick={() => navigate('/search?q=pro')}
              >
                pro
              </button>
              <button 
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                onClick={() => navigate('/search?q=macbook')}
              >
                macbook
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage; 