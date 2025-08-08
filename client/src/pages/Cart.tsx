import React, { useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: 'Tool Name', price: 9.99, quantity: 1, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Game Name', price: 4.99, quantity: 2, image: 'https://via.placeholder.com/150' },
  ]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="px-6 py-4 bg-green-100 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-green-700">Your Cart</h1>
        </div>

        {/* Cart Items */}
        <div className="p-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-4 border-b last:border-b-0">
              <div className="flex items-center">
                <div className="w-24 h-24 rounded-lg overflow-hidden mr-4 shadow-sm">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-600">${item.price}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex items-center mr-4">
                  <button
                    className="bg-green-50 hover:bg-green-200 text-green-700 font-bold py-2 px-3 rounded-l"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="w-16 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700"
                    value={item.quantity}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (!isNaN(value)) {
                        updateQuantity(item.id, value);
                      }
                    }}
                  />
                  <button
                    className="bg-green-50 hover:bg-green-200 text-green-700 font-bold py-2 px-3 rounded-r disabled:opacity-50"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    disabled={item.quantity >= 10}
                  >
                    +
                  </button>
                </div>
                <button
                  className="text-red-600 hover:text-red-700 font-bold py-2 px-4 rounded"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="px-6 py-4 bg-green-50 border-t border-gray-200">
          <div className="text-right">
            <p className="text-lg font-semibold text-gray-800">Total: ${calculateTotal().toFixed(2)}</p>
          </div>

          {/* Checkout Button */}
          <div className="text-right mt-4">
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Checkout with Stripe
            </button>
          </div>

          {/* Continue Shopping Button */}
          <div className="text-left mt-2">
            <a href="/" className="text-blue-600 hover:text-blue-700 font-semibold">
              Continue Shopping
            </a>
          </div>
        </div>

        {/* Refund Policy */}
        <div className="px-6 py-3 text-sm text-gray-500">
          <p>30-day refund policy applies to all purchases.</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;