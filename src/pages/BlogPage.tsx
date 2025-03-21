import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ChevronRight, ArrowRight } from 'lucide-react';

const blogs = [
  {
    id: 1,
    title: 'iPhone 15 Pro Max: A Photography Revolution',
    excerpt: 'Discover how the new iPhone 15 Pro Max is changing the game for mobile photography with its advanced camera system.',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484bce71?q=80&w=2070&auto=format&fit=crop',
    author: 'Michael Chen',
    date: '2024-03-15',
    category: 'Product Reviews'
  },
  {
    id: 2,
    title: 'The Future of Computing: M3 MacBook Pro',
    excerpt: 'An in-depth look at how the M3 chip is revolutionizing the MacBook Pro lineup and setting new standards for performance.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2026&auto=format&fit=crop',
    author: 'Sarah Johnson',
    date: '2024-03-10',
    category: 'Technology'
  },
  {
    id: 3,
    title: 'Apple Vision Pro: A New Era of Spatial Computing',
    excerpt: 'Exploring the groundbreaking features of Apple Vision Pro and its potential impact on how we interact with technology.',
    image: 'https://images.unsplash.com/photo-1707343843982-f8275f3994c5?q=80&w=2070&auto=format&fit=crop',
    author: 'David Rodriguez',
    date: '2024-03-05',
    category: 'Innovation'
  },
  {
    id: 4,
    title: 'Maximizing Your iPad Pro Productivity',
    excerpt: 'Tips and tricks to transform your iPad Pro into a powerful workstation for creative professionals.',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=2033&auto=format&fit=crop',
    author: 'Emily Wilson',
    date: '2024-03-01',
    category: 'Tips & Tricks'
  }
];

const BlogPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm mb-8">
        <Link to="/" className="text-gray-500 hover:text-black">Home</Link>
        <ChevronRight size={16} className="mx-2 text-gray-400" />
        <span className="text-gray-900 font-medium">Blog</span>
      </nav>

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Innovix Blog</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Stay updated with the latest Apple news, product reviews, and tech insights.
        </p>
      </div>

      {/* Featured Post */}
      <div className="mb-16">
        <Link to={`/blog/${blogs[0].id}`} className="group">
          <div className="relative rounded-2xl overflow-hidden">
            <img 
              src={blogs[0].image}
              alt={blogs[0].title}
              className="w-full h-[600px] object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
              <div className="p-8 text-white">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                    {blogs[0].category}
                  </span>
                  <div className="flex items-center text-sm">
                    <Calendar size={16} className="mr-1" />
                    {new Date(blogs[0].date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm">
                    <User size={16} className="mr-1" />
                    {blogs[0].author}
                  </div>
                </div>
                <h2 className="text-3xl font-bold mb-4 group-hover:text-gray-200 transition-colors">
                  {blogs[0].title}
                </h2>
                <p className="text-gray-200 mb-4">{blogs[0].excerpt}</p>
                <div className="inline-flex items-center text-white group-hover:translate-x-2 transition-transform">
                  Read More
                  <ArrowRight size={16} className="ml-2" />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.slice(1).map((post) => (
          <Link key={post.id} to={`/blog/${post.id}`} className="group">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                  <span className="bg-gray-100 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-gray-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center text-sm">
                  <User size={14} className="mr-1" />
                  <span className="text-gray-600">{post.author}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Newsletter Section */}
      <div className="mt-16 bg-gray-50 rounded-2xl p-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Subscribe to our newsletter to receive the latest Apple news, product updates, 
          and exclusive content directly in your inbox.
        </p>
        <form className="max-w-md mx-auto flex gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogPage;