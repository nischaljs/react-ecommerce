const BASE_URL = 'https://fakestoreapi.com';

export const api = {
    // Products
    getAllProducts: async () => {
        const response = await fetch(`${BASE_URL}/products`);
        return response.json();
    },
    
    getProduct: async (id) => {
        const response = await fetch(`${BASE_URL}/products/${id}`);
        return response.json();
    },

    // Categories
    getCategories: async () => {
        const response = await fetch(`${BASE_URL}/products/categories`);
        return response.json();
    },

    getProductsByCategory: async (category) => {
        const response = await fetch(`${BASE_URL}/products/category/${category}`);
        return response.json();
    },

    // Cart
    getUserCart: async (userId) => {
        const response = await fetch(`${BASE_URL}/carts/user/${userId}`);
        return response.json();
    },

    addToCart: async (cartData) => {
        const response = await fetch(`${BASE_URL}/carts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartData)
        });
        return response.json();
    },

    // Auth
    login: async (credentials) => {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        });
        return response.json();
    },

    // User
    getUserProfile: async (userId) => {
        const response = await fetch(`${BASE_URL}/users/${userId}`);
        return response.json();
    },

    updateUserProfile: async (userId, userData) => {
        const response = await fetch(`${BASE_URL}/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });
        return response.json();
    },

    // Error handling wrapper
    handleRequest: async (request) => {
        try {
            const response = await request();
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
};