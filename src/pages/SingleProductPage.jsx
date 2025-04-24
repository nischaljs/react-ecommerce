import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { FaHeart, FaShare, FaStar } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { api } from '../services/api';

const SingleProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      try {
        setLoading(true);
        const productData = await api.getProduct(productId);
        setProduct(productData);
        
        // Fetch related products from same category
        const relatedData = await api.getProductsByCategory(productData.category);
        setRelatedProducts(relatedData.filter(p => p.id !== productData.id).slice(0, 4));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndRelated();
  }, [productId]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.description,
        url: window.location.href,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error || 'Product not found'}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center p-8">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              <div className="mb-4">
                <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < Math.round(product.rating?.rate || 0) 
                        ? 'text-yellow-400' 
                        : 'text-gray-300'}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    ({product.rating?.count || 0} reviews)
                  </span>
                </div>
              </div>

              <p className="text-gray-600 mb-6">
                {product.description}
              </p>

              <div className="flex items-center gap-2 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.price > 50 && (
                  <span className="text-sm text-red-600 bg-red-50 px-3 py-1 rounded-full">
                    Premium Product
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add to Cart
                </button>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t">
                <button
                  onClick={handleWishlistToggle}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors
                    ${isInWishlist(product.id)
                      ? 'bg-red-50 border-red-200 text-red-600'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  <FaHeart />
                  {isInWishlist(product.id) ? 'Saved' : 'Save'}
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  <FaShare />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4"
                >
                  <div className="aspect-square rounded bg-gray-100 flex items-center justify-center p-4 mb-4">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.title}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
                    {relatedProduct.title}
                  </h3>
                  <p className="text-lg font-semibold text-gray-900">
                    ${relatedProduct.price.toFixed(2)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProductPage;