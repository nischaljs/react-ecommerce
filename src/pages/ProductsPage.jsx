import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { Link, useSearchParams, useNavigate } from 'react-router';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useSearch } from '../context/SearchContext';
import { MdFilterList, MdSearch } from 'react-icons/md';
import { api } from '../services/api';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { searchQuery, setSearchQuery } = useSearch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const selectedCategory = searchParams.get('category') || 'all';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await api.getCategories();
        setCategories(['all', ...data]);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let data;
        
        if (selectedCategory && selectedCategory !== 'all') {
          data = await api.getProductsByCategory(selectedCategory);
        } else {
          data = await api.getAllProducts();
        }
        
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  useEffect(() => {
    // Update search query from URL params
    const searchFromUrl = searchParams.get('search');
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
    }
  }, [searchParams, setSearchQuery]);

  const handleCategoryChange = (category) => {
    const currentSearchParams = new URLSearchParams(searchParams);
    if (category === 'all') {
      currentSearchParams.delete('category');
    } else {
      currentSearchParams.set('category', category);
    }
    navigate(`/products?${currentSearchParams.toString()}`);
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  const handleWishlistToggle = (e, product) => {
    e.preventDefault();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = searchQuery 
      ? product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesSearch;
  });

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return <div className="text-center text-red-500 py-12">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-[300px] bg-cover bg-center" 
           style={{ backgroundImage: 'url(https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)' }}>
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Our Collection</h1>
            <p className="text-xl">Discover our curated selection of premium products</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-4">
            <MdFilterList size={24} className="text-gray-600" />
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <Link to={`/product/${product.id}`} className="block">
                <div className="relative h-[280px] overflow-hidden flex justify-center items-center bg-gray-50 p-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                  <button 
                    onClick={(e) => handleWishlistToggle(e, product)}
                    className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-all duration-300
                      ${isInWishlist(product.id) 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white text-gray-400 hover:text-red-500'}`}
                  >
                    <FaHeart className="w-5 h-5" />
                  </button>
                </div>
              </Link>

              <div className="flex flex-col justify-between flex-1 p-4">
                <Link to={`/product/${product.id}`}>
                  <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                  <h2 className="text-base font-medium text-gray-800 mt-2 mb-1 line-clamp-2">{product.title}</h2>
                  <div className="flex items-center gap-2 mb-4">
                    <p className="text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</p>
                    {product.price > 50 && (
                      <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">Premium</span>
                    )}
                  </div>
                </Link>
                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Promotional Banner */}
        <div className="mt-12 relative rounded-2xl overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/5632398/pexels-photo-5632398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Special Offer"
            className="w-full h-[200px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-transparent flex items-center">
            <div className="text-white p-8">
              <h3 className="text-3xl font-bold mb-2">Special Offer</h3>
              <p className="text-lg mb-4">Get 20% off on your first purchase!</p>
              <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
