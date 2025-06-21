import React, { useState } from 'react';
import { Menu, X, User, BookOpen, Home, LogOut, LogIn } from 'lucide-react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const { isAuthenticated, logout, user } = useAuth();
    console.log(user)
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
        navigate('/');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navItems = [
        { name: 'Home', icon: Home, href: '/' },
        { name: 'Books', icon: BookOpen, href: '/books' },
        { name: 'Profile', icon: User, href: '/profile' }
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200 p-1">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <div className="flex items-center">
                            <span className="text-2xl font-bold text-gray-900">Booky</span>
                        </div>
                    </div>

                    <div className="hidden md:block">
                        {isAuthenticated && (
                            <div className="ml-10 flex items-baseline space-x-8">
                                {navItems.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-600 hover:bg-slate-100 rounded-md transition-colors duration-200"
                                    >
                                        <item.icon className="h-4 w-4 mr-2" />
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="hidden md:block">
                        <div className="flex items-center space-x-4">
                            {user?.role === 'ADMIN' && (
                                <a
                                    href="/dashboard"
                                    className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-600 bg-[#faf7f2] rounded-md transition-colors duration-200"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Admin Dashboard
                                </a>
                            )}
                            {isAuthenticated ? (
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center px-3 py-1.5 text-xs font-medium text-white bg-red-400 hover:bg-red-500 rounded-md transition-colors duration-200"
                                >
                                    <LogOut className="h-4 w-4 mr-2" />
                                    Logout
                                </button>
                            ) : (
                                <a
                                    href="/login"
                                    className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-400 rounded-md transition-colors duration-200"
                                >
                                    <LogIn className="h-4 w-4 mr-2" />
                                    Login
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-600 hover:bg-gray-50 focus:outline-none"
                        >
                            {isMenuOpen ? (
                                <X className="block h-6 w-6" />
                            ) : (
                                <Menu className="block h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {isAuthenticated && (
                            <>
                                {navItems.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="flex items-center px-2.5 py-1.5 text-base font-medium text-gray-700 hover:text-gray-600 hover:bg-[#faf7f2] rounded-md transition-colors duration-200"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <item.icon className="h-5 w-5 mr-3" />
                                        {item.name}
                                    </a>
                                ))}
                            </>
                        )}

                        <div className="pt-2 space-y-1">
                            {user?.role === 'ADMIN' && (
                                <a
                                    href="/dashboard"
                                    className="flex items-center px-2.5 py-1.5 text-base font-medium text-gray-700  bg-[#faf7f2] rounded-md transition-colors duration-200 mb-4"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Admin Dashboard
                                </a>
                            )}
                            {isAuthenticated ? (
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center w-full px-2.5 py-1.5 text-base font-medium text-white bg-red-400 hover:bg-red-500 rounded-md transition-colors duration-200"
                                >
                                    <LogOut className="h-5 w-5 mr-3" />
                                    Logout
                                </button>
                            ) : (
                                <a
                                    href="/login"
                                    className="flex items-center w-full px-2.5 py-1.5 text-base font-medium text-white bg-blue-500 hover:bg-blue-400 rounded-md transition-colors duration-200"
                                >
                                    <LogIn className="h-5 w-5 mr-3" />
                                    Login
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;