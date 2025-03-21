import { create } from 'zustand';
import { Product } from '../types';
import { products as initialProducts } from '../data/products';
import { categories as initialCategories } from '../data/categories';
import { Category } from '../types';

interface ProductState {
  products: Product[];
  categories: Category[];
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  getFeaturedProducts: () => Product[];
  getNewArrivals: () => Product[];
  searchProducts: (query: string) => Product[];
  
  // Admin functions
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updatedProduct: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleFeatured: (id: string) => void;
}

export const useProductStore = create<ProductState>((set, get) => {
  // Log products count on initialization for debugging
  console.log(`Product store initialized with ${initialProducts.length} products`);
  
  // Validate products data
  if (initialProducts.length === 0) {
    console.error("ERROR: No products loaded in the product store!");
  }

  return {
    products: initialProducts,
    categories: initialCategories,
    
    getProductById: (id: string) => {
      return get().products.find(product => product.id === id);
    },
    
    getProductsByCategory: (category: string) => {
      return get().products.filter(product => product.category === category);
    },
    
    getFeaturedProducts: () => {
      return get().products.filter(product => product.isFeatured);
    },
    
    getNewArrivals: () => {
      return get().products.filter(product => product.isNewArrival);
    },
    
    searchProducts: (query: string) => {
      // Defensive coding - don't search if no query
      if (!query || !query.trim()) return [];
      
      const term = query.toLowerCase().trim();
      
      // First try direct exact match
      const directMatches = get().products.filter(product => 
        product.name.toLowerCase() === term
      );
      
      // If direct matches found, prioritize them
      if (directMatches.length > 0) {
        return directMatches;
      }
      
      // Split search term into multiple words to search each independently
      const searchTerms = term.split(/\s+/).filter(t => t.length > 0);
      
      // For single word searches
      if (searchTerms.length === 1) {
        return get().products.filter(product => 
          product.name.toLowerCase().includes(term) || 
          product.description.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term) ||
          (product.subcategory && product.subcategory.toLowerCase().includes(term)) ||
          // Also search in specifications and features
          Object.values(product.specifications).some(value => 
            typeof value === 'string' && value.toLowerCase().includes(term)
          ) ||
          product.features.some(feature => 
            feature.toLowerCase().includes(term)
          )
        );
      }
      
      // For multi-word searches, implement scoring
      const scoredProducts = get().products.map(product => {
        let score = 0;
        
        // Check name (highest priority)
        if (product.name.toLowerCase().includes(term)) {
          score += 10;
        }
        
        // Check each search term individually
        for (const word of searchTerms) {
          if (product.name.toLowerCase().includes(word)) {
            score += 5;
          }
          if (product.description.toLowerCase().includes(word)) {
            score += 3;
          }
          if (product.category.toLowerCase().includes(word)) {
            score += 2;
          }
          if (product.subcategory && product.subcategory.toLowerCase().includes(word)) {
            score += 2;
          }
          
          // Check specifications
          if (Object.values(product.specifications).some(value => 
            typeof value === 'string' && value.toLowerCase().includes(word)
          )) {
            score += 1;
          }
          
          // Check features
          if (product.features.some(feature => feature.toLowerCase().includes(word))) {
            score += 1;
          }
        }
        
        return { product, score };
      });
      
      // Filter out products with zero score and sort by score
      const filteredProducts = scoredProducts
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(item => item.product);
      
      return filteredProducts;
    },
    
    addProduct: (product: Product) => {
      set((state) => ({
        products: [...state.products, product]
      }));
    },
    
    updateProduct: (id: string, updatedProduct: Partial<Product>) => {
      set((state) => ({
        products: state.products.map(product => 
          product.id === id 
            ? { ...product, ...updatedProduct }
            : product
        )
      }));
    },
    
    deleteProduct: (id: string) => {
      set((state) => ({
        products: state.products.filter(product => product.id !== id)
      }));
    },
    
    toggleFeatured: (id: string) => {
      set((state) => ({
        products: state.products.map(product => 
          product.id === id 
            ? { ...product, isFeatured: !product.isFeatured }
            : product
        )
      }));
    }
  };
});

// Add export for direct access to the store
export const getInitialProductsCount = () => initialProducts.length;

// Helper function to calculate product relevance score
function getProductRelevanceScore(product: Product, query: string, terms: string[]): number {
  let score = 0;
  
  // Exact matches in name get highest score
  if (product.name.toLowerCase() === query) score += 50;
  if (product.name.toLowerCase().includes(query)) score += 20;
  
  // Check each search term individually
  for (const term of terms) {
    // Prioritize name matches
    if (product.name.toLowerCase().includes(term)) score += 10;
    
    // Check other fields
    if (product.description.toLowerCase().includes(term)) score += 5;
    if (product.category.toLowerCase().includes(term)) score += 8;
    if (product.subcategory && product.subcategory.toLowerCase().includes(term)) score += 8;
    
    // Check features
    if (product.features.some(feature => feature.toLowerCase().includes(term))) score += 3;
    
    // Check specifications
    for (const [key, value] of Object.entries(product.specifications)) {
      if (
        (typeof value === 'string' && 
         (key.toLowerCase().includes(term) || value.toLowerCase().includes(term)))
      ) {
        score += 3;
        break;
      }
    }
  }
  
  // Boost score for featured and new arrival products
  if (product.isFeatured) score += 5;
  if (product.isNewArrival) score += 3;
  
  return score;
} 