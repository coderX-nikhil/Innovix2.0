import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Heart, LogIn, ChevronDown } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import { motion, AnimatePresence } from "framer-motion";
import { categories } from "../../data/categories";
import logo from "../../assets/Untitled-2025-02-04-1946.png";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const cartStore = useCartStore();
  const { isAuthenticated, isAdmin } = useAuthStore();
  const totalItems = cartStore.getTotalItems();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.img
              src={logo}
              alt="Innovix Logo"
              className="h-10 w-auto"
              whileHover={{ scale: 1.1, rotate: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 relative">
            {categories.map((category) => (
              <div
                key={category.id}
                className="relative group"
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <Link
                  to={`/category/${category.slug}`}
                  className="text-gray-700 hover:text-black transition-all cursor-pointer flex items-center gap-1"
                >
                  {category.name}
                  {category.subcategories && <ChevronDown size={16} />}
                </Link>

                {/* Dropdown Animation */}
                <AnimatePresence>
                  {hoveredCategory === category.id && category.subcategories && (
                    <motion.div
                      className="absolute left-0 mt-3 bg-white shadow-xl rounded-xl p-4 w-56 backdrop-blur-lg"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub.id}
                          to={`/category/${sub.slug}`}
                          className="block py-2 text-gray-600 hover:text-black transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-3">
            {/* Search Button */}
            <div className="relative">
              <motion.button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-gray-700 hover:text-black transition-colors"
                whileHover={{ scale: 1.2 }}
              >
                <Search size={20} />
              </motion.button>

              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    className="absolute top-12 right-0 w-screen max-w-md bg-white shadow-xl rounded-lg p-4 z-30"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <form onSubmit={handleSearch} className="flex items-center">
                      <input
                        type="text"
                        placeholder="Search for products..."
                        className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-black"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSearch(e);
                          }
                        }}
                      />
                      <button
                        type="submit"
                        className="bg-black text-white p-2 rounded-r-md hover:bg-gray-800"
                      >
                        <Search size={20} />
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Wishlist */}
            <motion.div whileHover={{ scale: 1.2 }}>
              <Link
                to="/wishlist"
                className="text-gray-700 hover:text-black transition-colors hidden sm:block"
              >
                <Heart size={20} />
              </Link>
            </motion.div>

            {/* Cart */}
            <motion.div whileHover={{ scale: 1.2 }}>
              <Link
                to="/cart"
                className="text-gray-700 hover:text-black transition-colors relative"
              >
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </motion.div>

            {isAuthenticated ? (
              <motion.div whileHover={{ scale: 1.2 }}>
                <Link to={isAdmin ? "/admin" : "/account"} className="text-gray-700 hover:text-black transition-colors hidden sm:block">
                  <User size={20} />
                </Link>
              </motion.div>
            ) : (
              <motion.div whileHover={{ scale: 1.2 }}>
                <Link to="/login" className="text-gray-700 hover:text-black transition-colors hidden sm:block">
                  <LogIn size={20} />
                </Link>
              </motion.div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-black transition-colors md:hidden"
              whileHover={{ scale: 1.2, rotate: 90 }}
              transition={{ type: "spring", stiffness: 250 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="fixed inset-0 bg-white shadow-lg z-50 flex flex-col items-center justify-center space-y-6 p-6 md:hidden"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <button onClick={() => setIsMenuOpen(false)} className="absolute top-5 right-5 text-gray-700 hover:text-black">
                <X size={28} />
              </button>

              {categories.map((category) => (
                <div key={category.id} className="w-full text-center">
                  <div
                    onClick={() =>
                      setActiveCategory(activeCategory === category.id ? null : category.id)
                    }
                    className="text-lg font-medium text-gray-700 hover:text-black transition-all w-full py-2 flex justify-center items-center cursor-pointer"
                  >
                    {category.name}
                    {category.subcategories && <ChevronDown className="ml-2" size={16} />}
                  </div>

                  <AnimatePresence>
                    {activeCategory === category.id && category.subcategories && (
                      <motion.div
                        className="mt-2 space-y-2"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        {category.subcategories.map((sub) => (
                          <Link
                            key={sub.id}
                            to={`/category/${sub.slug}`}
                            onClick={() => setIsMenuOpen(false)}
                            className="block text-gray-600 hover:text-black"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
