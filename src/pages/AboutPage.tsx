import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Users2, Target, Award, ChevronRight } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm mb-8">
        <Link to="/" className="text-gray-500 hover:text-black">Home</Link>
        <ChevronRight size={16} className="mx-2 text-gray-400" />
        <span className="text-gray-900 font-medium">About Us</span>
      </nav>

      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Innovix</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're passionate about bringing you the latest and greatest Apple products,
          backed by exceptional service and support.
        </p>
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
            alt="Our Story" 
            className="rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Founded in 2020, Innovix emerged from a simple vision: to make premium technology 
            accessible while providing unparalleled customer service. What started as a small 
            local shop has grown into a trusted destination for Apple enthusiasts.
          </p>
          <p className="text-gray-600">
            Today, we serve customers nationwide, maintaining the same dedication to quality 
            and personal service that defined our beginnings. Our team of experts is passionate 
            about technology and committed to helping you find the perfect Apple products for 
            your needs.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 rounded-2xl p-12 mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users2 size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Customer First</h3>
            <p className="text-gray-600">
              Your satisfaction is our top priority. We go above and beyond to ensure 
              an exceptional shopping experience.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Award size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Quality Assured</h3>
            <p className="text-gray-600">
              We only offer genuine Apple products, ensuring you receive the highest 
              quality technology.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Target size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Innovation</h3>
            <p className="text-gray-600">
              We stay ahead of the curve, bringing you the latest Apple products and 
              technological advancements.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Building2 size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Integrity</h3>
            <p className="text-gray-600">
              Trust and transparency are the foundation of our business relationships.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Our Leadership Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop" 
              alt="CEO" 
              className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-bold mb-1">Michael Chen</h3>
            <p className="text-gray-600 mb-2">CEO & Founder</p>
            <p className="text-gray-600 text-sm">
              With 15+ years in tech retail, Michael leads our vision for exceptional 
              customer service and innovation.
            </p>
          </div>
          <div className="text-center">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop" 
              alt="COO" 
              className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-bold mb-1">Sarah Johnson</h3>
            <p className="text-gray-600 mb-2">Chief Operations Officer</p>
            <p className="text-gray-600 text-sm">
              Sarah ensures smooth operations and maintains our high standards of 
              service excellence.
            </p>
          </div>
          <div className="text-center">
            <img 
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1887&auto=format&fit=crop" 
              alt="CTO" 
              className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-bold mb-1">David Rodriguez</h3>
            <p className="text-gray-600 mb-2">Chief Technology Officer</p>
            <p className="text-gray-600 text-sm">
              David drives our technological initiatives and ensures seamless digital 
              experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-black text-white rounded-2xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Have questions about our products or services? Our team is here to help you 
          find the perfect Apple solution for your needs.
        </p>
        <Link 
          to="/contact"
          className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-lg font-medium rounded-md text-white hover:bg-white hover:text-black transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;