// 

import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import Button from '../components/ui/Button';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  
  const handleCheckout = async () => {
    const options = {
      key: 'YOUR_RAZORPAY_KEY_ID', // Replace with your actual Razorpay key
      amount: Math.round(getTotalPrice() * 100 * 1.1), // Amount in smallest currency unit (paise for INR)
      currency: 'INR',
      name: 'Innovix Store',
      description: 'Purchase from Innovix',
      image: 'https://your-logo-url.com',
      handler: function(response: any) {
        // Handle successful payment
        console.log('Payment successful:', response);
        clearCart();
        // You would typically make an API call here to verify the payment on your server
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: 'Customer Phone'
      },
      theme: {
        color: '#000000'
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };
  
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
          <Link to="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left pb-4">Product</th>
                    <th className="text-center pb-4 hidden sm:table-cell">Price</th>
                    <th className="text-center pb-4">Quantity</th>
                    <th className="text-right pb-4 hidden sm:table-cell">Total</th>
                    <th className="text-right pb-4 w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => {
                    const itemPrice = item.discountPrice || item.price;
                    const itemTotal = itemPrice * item.quantity;
                    
                    return (
                      <tr key={item.productId} className="border-b border-gray-200 last:border-b-0">
                        <td className="py-4">
                          <div className="flex items-center">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded mr-4"
                            />
                            <div>
                              <Link 
                                to={`/product/${item.productId}`}
                                className="font-medium text-gray-900 hover:text-black"
                              >
                                {item.name}
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 text-center hidden sm:table-cell">
                          ${itemPrice.toFixed(2)}
                        </td>
                        <td className="py-4 text-center">
                          <select
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value))}
                            className="border border-gray-300 rounded p-1 w-16"
                          >
                            {[...Array(10)].map((_, i) => (
                              <option key={i} value={i + 1}>
                                {i + 1}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-4 text-right font-medium hidden sm:table-cell">
                          ${itemTotal.toFixed(2)}
                        </td>
                        <td className="py-4 text-right">
                          <button 
                            onClick={() => removeItem(item.productId)}
                            className="text-gray-500 hover:text-red-500 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="flex justify-between mt-6">
            <Link to="/products">
              <Button variant="outline" className="flex items-center">
                <ArrowRight size={18} className="mr-2 rotate-180" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${(getTotalPrice() * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${(getTotalPrice() * 1.1).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <Button 
                fullWidth 
                className="flex items-center justify-center"
                onClick={handleCheckout}
              >
                Proceed to Checkout
                <ArrowRight size={18} className="ml-2" />
              </Button>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">We Accept</h3>
                <div className="flex space-x-2">
                  <img src="https://images.unsplash.com/photo-1556742031-c6961e8560b0?q=80&w=1887&auto=format&fit=crop" alt="Payment Methods" className="h-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;