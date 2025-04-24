import { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';

const FeaturedDeals = () => {
  const { data, loading, error } = useFetch('/products.json');
  const [deals, setDeals] = useState([]);
  
  useEffect(() => {
    if (data && data.featuredDeals) {
      setDeals(data.featuredDeals);
    }
  }, [data]);

  if (loading) return (
    <div className="container mx-auto px-4 py-6">
      <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-200 h-60 rounded-lg"></div>
        <div className="bg-gray-200 h-60 rounded-lg"></div>
      </div>
    </div>
  );
  
  if (error) return <div className="text-center text-red-500 py-12">Failed to load deals</div>;
  
  if (!deals.length) return null;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">Featured Deals</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {deals.map(deal => (
            <div key={deal.id} className="rounded-lg overflow-hidden shadow-sm flex flex-col md:flex-row bg-white">
              <div className={`w-full md:w-1/2 ${deal.id === 1 ? 'bg-[#CFD0D2]' : 'bg-[#81AEC3]'} p-8 flex flex-col justify-center`}>
                <div className="flex items-center">
                  {deal.id === 1 && (
                    <div className="mr-2 text-white">
                      <span className="text-xl font-semibold">V</span>eloura
                    </div>
                  )}
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${deal.id === 1 ? 'text-gray-800' : 'text-white'}`}>
                  {deal.title}
                </h3>
                <p className={`text-sm mb-6 ${deal.id === 1 ? 'text-gray-600' : 'text-white/80'}`}>
                  {deal.subtitle}
                </p>
                <a 
                  href="#" 
                  className={`inline-block py-2 px-5 rounded text-sm font-medium ${
                    deal.id === 1 
                      ? 'bg-white text-primary hover:bg-gray-100' 
                      : 'bg-[#CFD0D2] text-gray-600 hover:bg-primary/90'
                  } transition-colors w-fit`}
                >
                  {deal.buttonText}
                </a>
              </div>
              <div className="w-full md:w-1/2">
                <img 
                  src={deal.image} 
                  alt={deal.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDeals; 