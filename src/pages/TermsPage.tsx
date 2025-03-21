import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const TermsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm mb-8">
        <Link to="/" className="text-gray-500 hover:text-black">Home</Link>
        <ChevronRight size={16} className="mx-2 text-gray-400" />
        <span className="text-gray-900 font-medium">Terms & Conditions</span>
      </nav>

      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
        <p className="text-gray-600 mb-8">
          Last updated: March 15, 2024
        </p>

        {/* Content */}
        <div className="prose max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-600 mb-4">
              By accessing or using our website, you agree to be bound by these Terms and 
              Conditions. If you disagree with any part of these terms, you may not access 
              the website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Intellectual Property Rights</h2>
            <p className="text-gray-600 mb-4">
              Other than the content you own, under these Terms, Innovix and/or its licensors 
              own all the intellectual property rights and materials contained in this website.
            </p>
            <p className="text-gray-600 mb-4">
              You are granted limited license only for purposes of viewing the material 
              contained on this website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Restrictions</h2>
            <p className="text-gray-600 mb-4">
              You are specifically restricted from all of the following:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>Publishing any website material in any other media</li>
              <li>Selling, sublicensing and/or otherwise commercializing any website material</li>
              <li>Publicly performing and/or showing any website material</li>
              <li>Using this website in any way that is or may be damaging to this website</li>
              <li>Using this website contrary to applicable laws and regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Purchase Terms</h2>
            <p className="text-gray-600 mb-4">
              By placing an order through our website, you warrant that:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>You are legally capable of entering into binding contracts</li>
              <li>You are at least 18 years old</li>
              <li>The information you provide is accurate and complete</li>
              <li>You have sufficient funds to complete the purchase</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Product Information</h2>
            <p className="text-gray-600 mb-4">
              We strive to display our products and their features as accurately as possible. 
              However, we do not warrant that product descriptions or other content is accurate, 
              complete, reliable, current, or error-free.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Pricing and Availability</h2>
            <p className="text-gray-600 mb-4">
              All prices are subject to change without notice. We reserve the right to modify 
              or discontinue products without notice. We shall not be liable to you or any 
              third party for any modification, price change, or discontinuance of products.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. User Accounts</h2>
            <p className="text-gray-600 mb-4">
              If you create an account on our website, you are responsible for:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>Maintaining the confidentiality of your account</li>
              <li>All activities that occur under your account</li>
              <li>Promptly notifying us of any unauthorized use</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-600 mb-4">
              In no event shall Innovix, nor any of its officers, directors and employees, 
              be liable for anything arising out of or in any way connected with your use 
              of this website beyond the amount paid for products purchased through our site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">9. Indemnification</h2>
            <p className="text-gray-600 mb-4">
              You hereby indemnify to the fullest extent Innovix from and against any and/or 
              all liabilities, costs, demands, causes of action, damages and expenses arising 
              in any way related to your breach of any of the provisions of these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">10. Severability</h2>
            <p className="text-gray-600 mb-4">
              If any provision of these Terms is found to be invalid under any applicable law, 
              such provisions shall be deleted without affecting the remaining provisions herein.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">11. Variation of Terms</h2>
            <p className="text-gray-600 mb-4">
              Innovix is permitted to revise these Terms at any time as it sees fit, and by 
              using this website you are expected to review these Terms regularly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">12. Contact Information</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="text-gray-600">
              <p>Email: legal@innovix.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: 123 Tech Street, Digital City, 10001</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;