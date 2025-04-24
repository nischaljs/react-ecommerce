import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import useFetch from '../../hooks/useFetch';

const ProductCard = ({ product }) => {
  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-lg mb-3">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">Unega</span>
        </div>
        <div className="absolute inset-0 bg-black/25 bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="bg-white text-gray-800 font-medium py-2 px-4 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            Quick View
          </button>
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <h3 className="text-gray-800 font-medium">{product.name}</h3>
          <p className="text-sm text-blue-500">{product.stock}</p>
        </div>
        <p className="text-gray-800 font-semibold">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

const FeaturedProducts = () => {
  const { data, loading, error } = useFetch('/products.json');
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    if (data && data.featuredProducts) {
      setProducts(data.featuredProducts);
    }
  }, [data]);

  if (loading) return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 h-72 rounded-lg mb-3"></div>
            <div className="bg-gray-200 h-4 w-3/4 rounded mb-2"></div>
            <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
  
  if (error) return <div className="text-center text-red-500 py-12">Failed to load products</div>;
  
  if (!products.length) return null;

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">New Arrivals</h2>
          <Link to="/products" className="text-primary text-sm hover:underline">See All</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;