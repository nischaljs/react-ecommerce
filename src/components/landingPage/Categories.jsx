import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { api } from '../../services/api';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Category images mapping (since API doesn't provide images)
    const categoryImages = {
        "electronics": "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg",
        "jewelery": "https://images.pexels.com/photos/265906/pexels-photo-265906.jpeg",
        "men's clothing": "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg",
        "women's clothing": "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg"
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await api.getCategories();
                setCategories(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
                {[1, 2, 3, 4].map((n) => (
                    <div key={n} className="h-64 bg-gray-200 rounded-lg"></div>
                ))}
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-red-500">Failed to load categories</div>;
    }

    return (
        <section className="py-12 px-4">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Shop by Category</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <Link
                            key={category}
                            to={`/products?category=${encodeURIComponent(category)}`}
                            className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <div className="aspect-w-16 aspect-h-9">
                                <img
                                    src={categoryImages[category]}
                                    alt={category}
                                    className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                <h3 className="text-xl font-semibold text-white capitalize">
                                    {category.replace("'s", '')}
                                </h3>
                                <p className="text-white/80 text-sm mt-1">
                                    Explore Collection →
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
