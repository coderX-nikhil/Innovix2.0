import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Shield, Clock, PenTool as Tool, AlertCircle } from 'lucide-react';
import Button from '../components/ui/Button';

const WarrantyPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm mb-8">
        <Link to="/" className="text-gray-500 hover:text-black">Home</Link>
        <ChevronRight size={16} className="mx-2 text-gray-400" />
        <span className="text-gray-900 font-medium">Warranty</span>
      </nav>

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Warranty Information</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Learn about our warranty coverage and protection plans for your Apple products.
        </p>
      </div>

      {/* Warranty Types */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-8">Warranty Coverage</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-start mb-4">
              <Shield className="w-6 h-6 text-green-500 mt-1 mr-3" />
              <div>
                <h3 className="text-lg font-bold mb-2">Standard Warranty</h3>
                <p className="text-gray-600">
                  All Apple products come with a one-year limited warranty and up to 90 days 
                  of complimentary technical support.
                </p>
              </div>
            </div>
            <ul className="space-y-3 text-gray-600 ml-9">
              <li>Hardware coverage</li>
              <li>Software support</li>
              <li>Manufacturing defects</li>
              <li>90 days phone support</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-start mb-4">
              <Shield className="w-6 h-6 text-blue-500 mt-1 mr-3" />
              <div>
                <h3 className="text-lg font-bold mb-2">AppleCare+</h3>
                <p className="text-gray-600">
                  Extended warranty coverage that includes accidental damage protection and 
                  priority support access.
                </p>
              </div>
            </div>
            <ul className="space-y-3 text-gray-600 ml-9">
              <li>Up to 3 years coverage</li>
              <li>Accidental damage protection</li>
              <li>24/7 priority support</li>
              <li>Express replacement</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Coverage Details */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-8">What's Covered</h2>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Coverage Type</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Standard Warranty</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">AppleCare+</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-sm text-gray-600">Manufacturing Defects</td>
                <td className="px-6 py-4 text-sm text-gray-600">✓</td>
                <td className="px-6 py-4 text-sm text-gray-600">✓</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-600">Battery Service</td>
                <td className="px-6 py-4 text-sm text-gray-600">✓</td>
                <td className="px-6 py-4 text-sm text-gray-600">✓</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-600">Accidental Damage</td>
                <td className="px-6 py-4 text-sm text-gray-600">✗</td>
                <td className="px-6 py-4 text-sm text-gray-600">✓</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-600">24/7 Support</td>
                <td className="px-6 py-4 text-sm text-gray-600">✗</td>
                <td className="px-6 py-4 text-sm text-gray-600">✓</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-600">Express</td>
                <td className="px-6 py-4 text-sm text-gray-600">Express Replacement</td>
                <td className="px-6 py-4 text-sm text-gray-600">✗</td>
                <td className="px-6 py-4 text-sm text-gray-600">✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Warranty Process */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-8">Warranty Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-blue-100 rounded-full p-3">
                <AlertCircle className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-center mb-2">Report Issue</h3>
            <p className="text-gray-600 text-center">
              Contact our support team to report the issue with your device and initiate 
              the warranty claim process.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-blue-100 rounded-full p-3">
                <Tool className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-center mb-2">Diagnosis</h3>
            <p className="text-gray-600 text-center">
              Our technicians will diagnose the issue and determine if it's covered under 
              warranty.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-blue-100 rounded-full p-3">
                <Clock className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-center mb-2">Resolution</h3>
            <p className="text-gray-600 text-center">
              We'll repair or replace your device according to the warranty terms and 
              coverage.
            </p>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-8">Important Notes</h2>
        <div className="bg-gray-50 rounded-lg p-8">
          <ul className="space-y-4 text-gray-600">
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              Warranty coverage begins on the date of purchase
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              Keep your proof of purchase for warranty claims
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              Warranty does not cover damage caused by misuse or unauthorized modifications
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              AppleCare+ must be purchased within 60 days of device purchase
            </li>
          </ul>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-black text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help with a Warranty Claim?</h2>
          <p className="text-gray-300 mb-6">
            Our support team is available to help you with warranty claims and technical support.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact">
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-black">
                Contact Support
              </Button>
            </Link>
            <Link to="/faq">
              <Button className="bg-white text-black hover:bg-gray-100">
                View FAQs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarrantyPage;