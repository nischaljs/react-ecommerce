import React from 'react';
import { Link } from 'react-router';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">💝</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-8">Browse our products and add items you love to your wishlist!</p>
          <Link
            to="/products"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Explore Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-[200px] bg-cover bg-center" 
           style={{ backgroundImage: 'url(https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)' }}>
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-2">My Wishlist</h1>
            <p className="text-lg">{wishlistItems.length} items saved</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <Link to={`/product/${item.id}`} className="block relative h-[200px]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain p-4"
                />
              </Link>
              
              <div className="p-4">
                <Link to={`/product/${item.id}`}>
                  <h3 className="font-medium text-gray-800 mb-2 line-clamp-2">{item.title}</h3>
                </Link>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-blue-600 font-semibold">${item.price.toFixed(2)}</span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FaShoppingCart size={16} />
                    Move to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="p-2 text-red-500 hover:text-red-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Promotional Banner */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Share Your Wishlist</h3>
              <p className="text-blue-100">Let your friends know what you're wishing for!</p>
            </div>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              Share Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;