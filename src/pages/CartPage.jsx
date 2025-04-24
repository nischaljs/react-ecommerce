import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router';
import { Trash2, Plus, Minus } from 'lucide-react';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    // Handle checkout process for logged in users
    console.log('Proceeding to checkout...');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link
            to="/products"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8   shadow-md p-4 rounded-xl">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-xl">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border-b last:border-b-0"
              >
                {/* Product Image */}
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-grow">
                  <Link
                    to={`/product/${item.id}`}
                    className="text-lg font-medium text-gray-800 hover:text-blue-600 transition line-clamp-1"
                  >
                    {item.title}
                  </Link>
                  <p className="text-gray-500 text-sm mb-2">{item.category}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100 transition"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-2 border-x">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100 transition"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-600 transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right md:ml-4">
                  <p className="text-lg font-semibold text-gray-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  {item.quantity > 1 && (
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)} each
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <Link
              to="/products"
              className="text-blue-600 hover:underline flex items-center gap-2"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>

        <div className='drop-shadow-2xl  shadow-xl p-4 rounded-xl'>
          {/* Order Summary */}
          {/* Order Summary */}
          <div className="lg:col-span-1"></div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          {/* Promo Code Input */}
          <div className="mb-4"></div>
          <label htmlFor="promo" className="block text-sm text-gray-600 mb-2">
            Promo Code
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="promo"
              className="flex-1 border rounded-lg px-3 py-2 text-sm"
              placeholder="Enter promo code"
            />
            <button className="bg-orange-300 text-gray-800 px-4 py-2 rounded-lg text-sm hover:bg-orange-400 transition">
              Apply
            </button>
          </div>

          <div className="space-y-2 my-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            {/* Discount Row */}
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-$0.00</span>
            </div>
          </div>

          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
          </div>

          <button 
            onClick={handleCheckout}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
      <div className='relative w-full h-[30vh] overflow-hidden my-4 rounded-md'>
        <img src="https://images.pexels.com/photos/5008005/pexels-photo-5008005.jpeg" alt="cover image" className='w-full h-full object-center object-cover'/>
        <div className='absolute inset-0 bg-black/40 bg-opacity-40 flex items-center justify-center'></div>
          <div className='text-center text-white absolute z-20 top-0'>
            <h3 className='text-8xl font-bold mb-2'>Summer Sale!</h3>
            <p className='text-xl '>Get up to 50% off on selected items</p>
          </div>
        </div>
      </div>
  );
};

export default CartPage;