import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown, ChevronUp, Search } from 'lucide-react';

const faqs = [
  {
    category: 'Orders & Shipping',
    questions: [
      {
        id: 1,
        question: 'How long does shipping take?',
        answer: 'Standard shipping typically takes 3-5 business days within the continental United States. Express shipping options are available for faster delivery.'
      },
      {
        id: 2,
        question: 'Do you ship internationally?',
        answer: 'Yes, we ship to select international destinations. Shipping times and costs vary by location. Please check our shipping policy for more details.'
      },
      {
        id: 3,
        question: 'How can I track my order?',
        answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also track your order by logging into your account on our website.'
      }
    ]
  },
  {
    category: 'Returns & Warranty',
    questions: [
      {
        id: 4,
        question: 'What is your return policy?',
        answer: 'We offer a 30-day return policy for most items. Products must be in original condition with all accessories and packaging included.'
      },
      {
        id: 5,
        question: 'How do I initiate a return?',
        answer: 'To initiate a return, log into your account and go to your order history, or contact our customer service team. We\'ll provide a return shipping label and instructions.'
      },
      {
        id: 6,
        question: 'What warranty coverage do you provide?',
        answer: 'All products come with Apple\'s standard warranty. We also offer extended warranty options for additional protection.'
      }
    ]
  },
  {
    category: 'Products & Services',
    questions: [
      {
        id: 7,
        question: 'Are your products authentic Apple products?',
        answer: 'Yes, we are an authorized Apple reseller. All our products are genuine Apple items with full warranty coverage.'
      },
      {
        id: 8,
        question: 'Do you offer price matching?',
        answer: 'We match prices from authorized Apple retailers for identical products. Contact our customer service team with the competitor\'s price for verification.'
      },
      {
        id: 9,
        question: 'Can I reserve products for in-store pickup?',
        answer: 'Yes, you can reserve products online for pickup at our physical stores. Select "Store Pickup" during checkout to use this service.'
      }
    ]
  },
  {
    category: 'Payment & Security',
    questions: [
      {
        id: 10,
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards, PayPal, Apple Pay, and various other digital payment methods. We also offer financing options through partner services.'
      },
      {
        id: 11,
        question: 'Is my payment information secure?',
        answer: 'Yes, we use industry-standard SSL encryption to protect your payment information. We never store your complete credit card details.'
      },
      {
        id: 12,
        question: 'Do you offer financing options?',
        answer: 'Yes, we offer various financing options through our partners. You can apply during checkout to see available offers.'
      }
    ]
  }
];

const FAQPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([]);

  const toggleQuestion = (id: number) => {
    setExpandedQuestions(prev => 
      prev.includes(id) 
        ? prev.filter(qId => qId !== id)
        : [...prev, id]
    );
  };

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm mb-8">
        <Link to="/" className="text-gray-500 hover:text-black">Home</Link>
        <ChevronRight size={16} className="mx-2 text-gray-400" />
        <span className="text-gray-900 font-medium">FAQ</span>
      </nav>

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions about our products, services, shipping, 
          and more.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="max-w-3xl mx-auto">
        {filteredFaqs.map((category) => (
          <div key={category.category} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{category.category}</h2>
            <div className="space-y-4">
              {category.questions.map((faq) => (
                <div 
                  key={faq.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => toggleQuestion(faq.id)}
                    className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-gray-50"
                  >
                    <span className="font-medium">{faq.question}</span>
                    {expandedQuestions.includes(faq.id) ? (
                      <ChevronUp size={20} className="text-gray-500" />
                    ) : (
                      <ChevronDown size={20} className="text-gray-500" />
                    )}
                  </button>
                  {expandedQuestions.includes(faq.id) && (
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Contact CTA */}
      <div className="max-w-3xl mx-auto mt-12 bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
        <p className="text-gray-600 mb-6">
          Can't find what you're looking for? Our support team is here to help.
        </p>
        <Link 
          to="/contact"
          className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
};

export default FAQPage;

