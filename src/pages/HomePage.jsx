import Hero from '../components/landingPage/Hero';
import Categories from '../components/landingPage/Categories';
import FeaturedProducts from '../components/landingPage/FeaturedProducts';
import CollectionsShowcase from '../components/landingPage/CollectionsShowcase';
import FeaturedDeals from '../components/landingPage/FeaturedDeals';
import Brands from '../components/landingPage/Brands';
import BlogPosts from '../components/landingPage/BlogPosts';

const HomePage = () => {
  return (
    <div className="space-y-6">
      <div className=" mx-auto px-4 pt-6">
        <Hero />
      </div>
      <Categories />
      <FeaturedProducts />
      <CollectionsShowcase />
      <FeaturedDeals />
      <Brands />
      <BlogPosts />
    </div>
  );
};

export default HomePage; 