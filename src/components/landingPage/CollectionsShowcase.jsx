import { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';

const CollectionsShowcase = () => {
  const { data, loading, error } = useFetch('/products.json');
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    if (data && data.collections) {
      setCollections(data.collections);
    }
  }, [data]);

  if (loading) return (
    <div className="container mx-auto px-4 py-12">
      <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-200 h-80 rounded-lg"></div>
        <div className="bg-gray-200 h-80 rounded-lg"></div>
      </div>
    </div>
  );

  if (error) return <div className="text-center text-red-500 py-12">Failed to load collections</div>;

  if (!collections.length) return null;

  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        <div className="flex gap-8 h-[600px]">
          {/* Left column - Delivery */}
          <div className=" flex-5 md:col-span-1 row-span-2 bg-primary rounded-lg overflow-hidden bg-cover bg-center relative"
            style={{ backgroundImage: 'url(https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)' }}>
            <div className="p-10 flex flex-col h-full justify-center text-white">
              <h2 className="text-7xl font-bold mb-8 max-w-[30%]">Your Style,</h2>
              <h3 className="text-4xl font-bold mb-2">Delivered.</h3>
              <h4 className="text-2xl font-semibold mb-6">Exclusively Online.</h4>
              <p className="mb-8 text-xl text-white/80">www.veloura.com</p>
            </div>
          </div>

          {/* Right columns - Collections */}
          <div className='flex flex-4 flex-col gap-8 md:col-span-2'>
            {collections.slice(0, 2).map((collection) => (
              <div key={collection.id} className="bg-white rounded-lg overflow-hidden shadow-sm h-[50%]  "style={{ backgroundImage: `url(${collection.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } }>
                <div className="bg-black/25 p-6 rounded-lg h-full flex flex-col justify-between px-4 py-6">
                    <p className="text-white text-xl mb-1">{collection.subtitle}</p>
                    <h3 className="text-4xl font-semibold text-blue-300 mb-4">{collection.title}</h3>
                    <div className="flex justify-between items-end">
                      <button className="bg-primary hover:bg-primary/90 text-white bg-gray-800 font-bold  px-8 py-4 rounded-xl cursor-pointer text-sm">
                        {collection.buttonText}
                      </button>
                      </div>
                      </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionsShowcase;
