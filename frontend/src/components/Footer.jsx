import { BookOpen, Mail, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="  bg-white border-t border-gray-200 mt-auto">
            <div className="container mx-auto px-4 py-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                    {/* Brand Section */}
                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start mb-3">
                            <BookOpen className="w-6 h-6 text-[#d6a676] mr-2" />
                            <span className="text-xl font-bold text-gray-900">Booky</span>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Discover your next favorite book with our curated collection of exceptional literature from around the world.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="text-center">
                        <h3 className="font-semibold text-gray-900 mb-3">Quick Links</h3>
                        <div className="space-y-2">
                            <a href="/" className="block text-sm text-gray-600 hover:text-[#d6a676] transition-colors duration-200">
                                home
                            </a>
                            <a href="/books" className="block text-sm text-gray-600 hover:text-[#d6a676] transition-colors duration-200">
                                Books
                            </a>
                            <a href="/profile" className="block text-sm text-gray-600 hover:text-[#d6a676] transition-colors duration-200">
                                Profile
                            </a>

                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="text-center md:text-right">
                        <h3 className="font-semibold text-gray-900 mb-3">Get in Touch</h3>
                        <div className="space-y-2">
                            <div className="flex items-center justify-center md:justify-end text-sm text-gray-600">
                                <Mail className="w-4 h-4 mr-2" />
                                <span>shadanrashid786@gmail.com</span>
                            </div>
                            <p className="text-sm text-gray-600">
                                Have questions? We'd love to help!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 pt-6 flex flex-col items-center justify-center text-center">
                    <div className="flex flex-col sm:flex-row items-center text-sm text-gray-600 gap-1 sm:gap-2">
                        <span>&copy; {new Date().getFullYear()} Booky. All rights reserved.</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="flex items-center">
                            Made with <Heart className="w-3 h-3 text-red-500 mx-1" /> for book lovers
                        </span>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;