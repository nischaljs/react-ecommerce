import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check for saved auth token
        const token = localStorage.getItem('auth_token');
        const userId = localStorage.getItem('user_id');
        if (token && userId) {
            loadUserProfile(userId);
        } else {
            setLoading(false);
        }
    }, []);

    const loadUserProfile = async (userId) => {
        try {
            const userData = await api.getUserProfile(userId);
            setUser(userData);
        } catch (err) {
            setError(err.message);
            logout(); // Clear invalid session
        } finally {
            setLoading(false);
        }
    };

    const login = async (username, password) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await api.login({ username, password });
            
            if (response.token) {
                localStorage.setItem('auth_token', response.token);
                // For demo purposes, using a fixed user ID since the API always returns the same token
                const userId = 1; 
                localStorage.setItem('user_id', userId);
                
                // Load user profile
                await loadUserProfile(userId);
                return true;
            }
        } catch (err) {
            setError('Invalid credentials');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_id');
        setUser(null);
    };

    const updateProfile = async (userData) => {
        try {
            setLoading(true);
            setError(null);
            
            if (!user?.id) throw new Error('No user logged in');
            
            const updatedUser = await api.updateUserProfile(user.id, userData);
            setUser(updatedUser);
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const isAuthenticated = () => {
        return !!user;
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            error,
            login,
            logout,
            updateProfile,
            isAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;