import { useState, useEffect, useCallback } from 'react';
import useFetch from '../../hooks/useFetch';

const Hero = () => {
  const { data, loading, error } = useFetch('/products.json');
  const [heroData, setHeroData] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  useEffect(() => {
    if (data && data.hero) {
      setHeroData(data.hero);
    }
  }, [data]);

  // Auto-slide functionality
  useEffect(() => {
    if (heroData.length <= 1) return;
    
    const interval = setInterval(() => {
      changeSlide((currentSlideIndex + 1) % heroData.length);
    }, 3000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [heroData.length, currentSlideIndex]);

  // Handle slide change with transition
  const changeSlide = useCallback((newIndex) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlideIndex(newIndex);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 300);
  }, [isTransitioning]);

  // Handle dot click
  const goToSlide = useCallback((index) => {
    if (index === currentSlideIndex) return;
    changeSlide(index);
  }, [currentSlideIndex, changeSlide]);

  if (loading) return (
    <div className="w-full h-[600px] bg-gray-200 animate-pulse rounded-lg">loading...</div>
  );
  
  if (error) return <div className="text-center text-red-500 py-12">Failed to load hero section</div>;
  
  if (!heroData || heroData.length === 0) return null;

  const currentSlide = heroData[currentSlideIndex];

  return (
    <section className="relative h-[600px] bg-gray-100 rounded-lg overflow-hidden">
      {/* Image background with transition effect */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <img 
          src={currentSlide.image} 
          alt={currentSlide.title} 
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/50 "></div>
      </div>
      
      {/* Text content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-6 md:px-12">
          <div className={`max-w-lg transform transition-all duration-700 ${isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
            <p className="text-white text-sm md:text-base uppercase tracking-[0.25em] mb-2 font-light animate-fadeIn">
              {currentSlide.tagline}
            </p>
            <h1 className="text-white text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg relative 
                          before:content-[''] before:absolute before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-white
                          animate-slideUp">
              {currentSlide.title}
            </h1>
            <p className="text-white/90 text-sm md:text-base mb-8 max-w-md font-light tracking-wide animate-fadeIn" 
               style={{ animationDelay: '0.3s' }}>
              {currentSlide.subtitle}
            </p>
            <a 
              href="#" 
              className="group inline-block bg-white hover:bg-opacity-90 text-gray-900 font-medium py-3 px-8 rounded-md transition-all 
                       hover:shadow-lg relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 
                       before:w-full before:h-full before:bg-white before:transform before:translate-x-[-100%] hover:before:translate-x-0 
                       before:transition-transform before:duration-300 before:z-[-1] animate-fadeIn"
              style={{ animationDelay: '0.5s' }}
            >
              <span className="relative z-10">{currentSlide.buttonText}</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Navigation dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <div className="flex space-x-3">
          {heroData.map((_, index) => (
            <button 
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlideIndex 
                  ? "bg-white scale-110" 
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
      

      
     
    </section>
  );
};

export default Hero; 