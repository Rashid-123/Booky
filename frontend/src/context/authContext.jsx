import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
const AuthContext = createContext(null);


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const AuthProvider = ({ children }) => {


    const [user, setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem('user');
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Failed to parse user from localStorage:", error);
            return null;
        }
    });

    const [token, setToken] = useState(() => {
        return localStorage.getItem('token') || null;
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);


    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, {
                email,
                password,
            });

            const data = response.data;

            setUser(data.user);
            setToken(data.token);
            return true;
        } catch (err) {
            setError(err.message);
            console.error('Login error:', err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const register = async (name, email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/register`, {
                name,
                email,
                password,
            });

            const data = response.data;

            setUser(data.user);
            setToken(data.token);
            return true;
        } catch (err) {
            setError(err.message);
            console.error('Registration error:', err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const updateUser = async (name, email) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.put(`${API_BASE_URL}/auth/update`, {
                name,
                email,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = response.data;

            setUser(data.user);
            return true;
        } catch (err) {
            setError(err.message);
            console.error('Update user error:', err);
            return false;
        } finally {
            setLoading(false);
        }
    }

    const logout = () => {
        setUser(null);
        setToken(null);
        // localStorage is cleared by the useEffect hooks above
    };

    const authContextValue = {
        user,
        updateUser,
        token,
        isAuthenticated: !!user && !!token,
        login,
        register,
        logout,
        loading,
        error,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    return useContext(AuthContext);
};
