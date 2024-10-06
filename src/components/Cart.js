import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

export function Cart({ products = [], addBill }) {
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const addToCart = (product, isHalfPlate) => {
    const price = isHalfPlate ? (product.halfPrice || product.fullPrice) : product.fullPrice;
    const existingItem = cartItems.find(item => item.productId === product.id && item.isHalfPlate === isHalfPlate);

    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.productId === product.id && item.isHalfPlate === isHalfPlate
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { productId: product.id, quantity: 1, price, isHalfPlate }]);
    }
    toast.success(`Added ${product.name} (${isHalfPlate ? 'Half' : 'Full'}) to cart`);
  };

  const removeFromCart = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
    toast.success('Item removed from cart');
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    const bill = {
      id: Date.now().toString(),
      items: cartItems,
      total,
      paymentMethod,
      timestamp: Date.now()
    };
    addBill(bill);
    setCartItems([]);
    toast.success('Bill generated successfully');
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Cart</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow rounded-lg p-4 flex flex-col justify-between">
            <div className="mb-4">
              <h3 className="text-lg font-medium break-words">{product.name}</h3>
            </div>
            <div className="space-y-2">
              <button
                onClick={() => addToCart(product, false)}
                className="w-full inline-flex justify-center items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Full (₹{product.fullPrice})
              </button>
              {product.halfPrice && (
                <button
                  onClick={() => addToCart(product, true)}
                  className="w-full inline-flex justify-center items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Half (₹{product.halfPrice})
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <h3 className="text-xl font-semibold mt-8 mb-4">Cart Items:</h3>
      <ul className="divide-y divide-gray-200">
        {cartItems.map((item, index) => {
          const product = products.find(p => p.id === item.productId);
          return (
            <li key={index} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <span className="text-sm sm:text-base mb-2 sm:mb-0">
                {product?.name} ({item.isHalfPlate ? 'Half' : 'Full'}) x {item.quantity}
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-sm sm:text-base">₹{item.price * item.quantity}</span>
                <button
                  onClick={() => removeFromCart(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Total: ₹{total}</h3>
        <div className="mt-4 space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="cash"
              checked={paymentMethod === 'cash'}
              onChange={() => setPaymentMethod('cash')}
              className="form-radio h-5 w-5 text-indigo-600"
            />
            <span className="ml-2">Cash</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="online"
              checked={paymentMethod === 'online'}
              onChange={() => setPaymentMethod('online')}
              className="form-radio h-5 w-5 text-indigo-600"
            />
            <span className="ml-2">Online</span>
          </label>
        </div>
        <button
          onClick={handleCheckout}
          disabled={cartItems.length === 0}
          className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Generate Bill
        </button>
      </div>
    </div>
  );
}