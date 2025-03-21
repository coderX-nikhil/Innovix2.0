import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Truck, Clock, Globe, Shield } from 'lucide-react';

const ShippingPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm mb-8">
        <Link to="/" className="text-gray-500 hover:text-black">Home</Link>
        <ChevronRight size={16} className="mx-2 text-gray-400" />
        <span className="text-gray-900 font-medium">Shipping & Returns</span>
      </nav>

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Shipping & Returns</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Learn about our shipping methods, delivery times, and hassle-free return policy.
        </p>
      </div>

      {/* Shipping Methods */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-8">Shipping Methods</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-bold mb-4">Standard Shipping</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <Clock size={20} className="mr-2 text-gray-500" />
                3-5 business days
              </li>
              <li className="flex items-center">
                <Truck size={20} className="mr-2 text-gray-500" />
                Free for orders over $50
              </li>
              <li className="flex items-center">
                <Globe size={20} className="mr-2 text-gray-500" />
                Available nationwide
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-bold mb-4">Express Shipping</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <Clock size={20} className="mr-2 text-gray-500" />
                1-2 business days
              </li>
              <li className="flex items-center">
                <Truck size={20} className="mr-2 text-gray-500" />
                Additional $15 fee
              </li>
              <li className="flex items-center">
                <Globe size={20} className="mr-2 text-gray-500" />
                Available in select areas
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Shipping Rates */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-8">Shipping Rates</h2>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Order Value</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Standard Shipping</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Express Shipping</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-sm text-gray-600">Under $50</td>
                <td className="px-6 py-4 text-sm text-gray-600">$5.99</td>
                <td className="px-6 py-4 text-sm text-gray-600">$20.99</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-600">$50 - $100</td>
                <td className="px-6 py-4 text-sm text-gray-600">Free</td>
                <td className="px-6 py-4 text-sm text-gray-600">$15.00</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-600">Over $100</td>
                <td className="px-6 py-4 text-sm text-gray-600">Free</td>
                <td className="px-6 py-4 text-sm text-gray-600">$10.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Returns Policy */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-8">Returns Policy</h2>
        <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Return Window</h3>
              <p className="text-gray-600 mb-4">
                We offer a 30-day return window for most items. Products must be in original 
                condition with all accessories and packaging included.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <Shield size={20} className="mr-2 text-gray-500" />
                  30-day money-back guarantee
                </li>
                <li className="flex items-center">
                  <Truck size={20} className="mr-2 text-gray-500" />
                  Free return shipping
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Return Process</h3>
              <ol className="space-y-4 text-gray-600">
                <li className="flex">
                  <span className="font-bold mr-2">1.</span>
                  Initiate return through your account or contact support
                </li>
                <li className="flex">
                  <span className="font-bold mr-2">2.</span>
                  Receive return shipping label via email
                </li>
                <li className="flex">
                  <span className="font-bold mr-2">3.</span>
                  Pack item securely with all original materials
                </li>
                <li className="flex">
                  <span className="font-bold mr-2">4.</span>
                  Drop off package at authorized shipping location
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Exceptions */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">Return Exceptions</h2>
        <div className="bg-gray-50 rounded-lg p-8">
          <p className="text-gray-600 mb-4">
            The following items cannot be returned:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Opened software or digital products</li>
            <li>Personalized or custom-made items</li>
            <li>Items marked as final sale</li>
            <li>Gift cards</li>
          </ul>
          <div className="mt-6">
            <p className="text-gray-600">
              For questions about returns or exceptions, please contact our customer 
              service team at support@innovix.com or call +1 (555) 123-4567.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;