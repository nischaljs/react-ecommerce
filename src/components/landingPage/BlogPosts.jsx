import { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';

const BlogPosts = () => {
  const { data, loading, error } = useFetch('/products.json');
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    if (data && data.blog) {
      setPosts(data.blog);
    }
  }, [data]);

  if (loading) return (
    <div className="container mx-auto px-4 py-6">
      <div className="h-6 bg-gray-200 rounded w-40 mb-8 animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(2)].map((_, index) => (
          <div key={index} className="h-80 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
    </div>
  );
  
  if (error) return <div className="text-center text-red-500 py-8">Failed to load blog posts</div>;
  
  if (!posts.length) return null;

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">Recent Post</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <a 
              key={post.id} 
              href="#" 
              className="group block relative rounded-lg overflow-hidden h-80"
            >
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-sm bg-gray-800/50 px-3 py-1 rounded-full w-fit mb-2">
                  {post.category}
                </span>
                <h3 className="text-2xl font-semibold group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPosts; 