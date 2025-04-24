import React, { useEffect, useState } from 'react';
import { BsCart3 } from 'react-icons/bs';
import { FaRegHeart } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useSearch } from '../../context/SearchContext';
import { useAuth } from '../../hooks/useAuth';
import useFetch from '../../hooks/useFetch';
import { MdArrowDropDown, MdClose } from 'react-icons/md';
import UserAvatar from './UserAvatar';

const Navbar = () => {
    const { data, loading, error } = useFetch('/products.json');
    const { getCartCount } = useCart();
    const { getWishlistCount } = useWishlist();
    const { isAuthenticated } = useAuth();
    const { searchQuery, setSearchQuery } = useSearch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [languages, setLanguages] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (data && data.languages) {
            setLanguages(data.languages);
        }
    }, [data]);

    const handleLanguageSelect = (code) => {
        setSelectedLanguage(code);
        setDropdownOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const selectedLang = languages.find(l => l.code === selectedLanguage);

    return (
        <div className="flex items-center justify-between py-4 px-4">
            {/* Logo */}
            <Link to="/" className="flex items-center">
                <span className="text-primary text-2xl font-bold">V</span>
                <span className="text-gray-900 text-xl font-medium">eloura</span>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:block w-full mx-8 mr-50">
                <form onSubmit={handleSubmit} className="relative">
                    <input
                        type="text"
                        placeholder="What are you looking for?"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full py-2 pl-4 pr-10 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            className="absolute right-10 top-0 mt-2 mr-2 text-gray-400 hover:text-primary"
                        >
                            <MdClose size={20} />
                        </button>
                    )}
                    <button
                        type="submit"
                        className="absolute right-0 top-0 mt-2 mr-3 text-gray-400 hover:text-primary"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </form>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
                <Link to="/cart" className="relative text-gray-600 hover:text-primary">
                    <BsCart3 size={24} />
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {getCartCount()}
                    </span>
                </Link>
                <Link to="/wishlist" className="relative text-gray-600 hover:text-primary">
                    <FaRegHeart size={24} />
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {getWishlistCount()}
                    </span>
                </Link>

                {/* Custom Language Dropdown */}
                <div className="relative w-20">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center space-x-2 text-gray-600 hover:text-primary focus:outline-none"
                    >
                        {selectedLang && (
                            <div className="flex items-center gap-2 cursor-pointer">
                                <img src={selectedLang.flag} alt={selectedLang.language} className="w-5 h-5 rounded-full" />
                                <span className='flex items-center gap-1'>{selectedLang.language} <MdArrowDropDown size={24} style={{ color: "black" }} /></span>
                            </div>
                        )}
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-50">
                            {languages.map(lang => (
                                <div
                                    key={lang.id}
                                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleLanguageSelect(lang.code)}
                                >
                                    <img src={lang.flag} alt={lang.language} className="w-5 h-5 rounded-full mr-2" />
                                    <span>{lang.language}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className='w-1 h-8 rounded bg-black/25 ml-4'></div>

                {isAuthenticated() ? (
                    <UserAvatar />
                ) : (
                    <div className="flex items-center space-x-4">
                        <Link 
                            to="/login"
                            className="text-gray-600 hover:text-primary font-medium text-sm"
                        >
                            Login
                        </Link>
                        <Link 
                            to="/register"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
                        >
                            Register
                        </Link>
                    </div>
                )}

                {/* Mobile Menu */}
                <div className="relative md:hidden lg:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex items-center text-gray-600 hover:text-primary focus:outline-none"
                    >
                        <GiHamburgerMenu size={24} />
                    </button>
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                            <Link to="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Account</Link>
                            <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Orders</Link>
                            <Link to="/wishlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Wishlist</Link>
                            <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
