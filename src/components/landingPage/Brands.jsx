import { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';

const Brands = () => {
  const { data, loading, error } = useFetch('/products.json');
  const [brands, setBrands] = useState([]);
  
  useEffect(() => {
    if (data && data.brands) {
      setBrands(data.brands);
    }
  }, [data]);

  if (loading) return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-8">
        <div className="h-6 bg-gray-200 rounded w-40 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="h-16 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
    </div>
  );
  
  if (error) return <div className="text-center text-red-500 py-8">Failed to load brands</div>;
  
  if (!brands.length) return null;

  return (
    <section className="py-12 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Shop by Brands</h2>
          <a href="#" className="text-primary text-sm hover:underline">See All</a>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
          {brands.slice(0, 12).map(brand => (
            <a 
              key={brand.id} 
              href="#" 
              className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
            >
              <img 
                src={brand.logo} 
                alt={brand.name} 
                className="h-10 object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands; 