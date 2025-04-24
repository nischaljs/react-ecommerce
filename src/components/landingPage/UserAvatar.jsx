import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { FaUser, FaSignOutAlt, FaHeart, FaShoppingBag, FaCog } from 'react-icons/fa';

const UserAvatar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 focus:outline-none"
            >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-medium">
                        {user?.name?.firstname?.[0]?.toUpperCase() || 'U'}
                    </span>
                </div>
                <span className="hidden md:block text-sm font-medium text-gray-700">
                    {user?.name?.firstname || 'User'}
                </span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b">
                        <p className="text-sm font-medium text-gray-900">
                            {user?.name?.firstname} {user?.name?.lastname}
                        </p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    
                    <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                    >
                        <FaUser className="w-4 h-4 mr-3" />
                        Profile
                    </Link>
                    
                    <Link
                        to="/wishlist"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                    >
                        <FaHeart className="w-4 h-4 mr-3" />
                        Wishlist
                    </Link>
                    
                    <Link
                        to="/orders"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                    >
                        <FaShoppingBag className="w-4 h-4 mr-3" />
                        Orders
                    </Link>
                    
                    <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                    >
                        <FaCog className="w-4 h-4 mr-3" />
                        Settings
                    </Link>
                    
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                        <FaSignOutAlt className="w-4 h-4 mr-3" />
                        Sign out
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserAvatar;