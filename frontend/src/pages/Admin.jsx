import { useState } from 'react';
import { useAuth } from "../context/authContext";
import { BookOpen, Plus, AlertCircle, CheckCircle, X } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const categories = [
    { "id": 1, "name": "Fiction" },
    { "id": 2, "name": "Science Fiction" },
    { "id": 3, "name": "Self-Help" },
    { "id": 4, "name": "Non-Fiction" },
    { "id": 5, "name": "Biography" },
    { "id": 6, "name": "Horror" },
    { "id": 7, "name": "Mystery" },
    { "id": 8, "name": "Thriller" },
    { "id": 9, "name": "History" },
    { "id": 10, "name": "Romance" },
    { "id": 11, "name": "Adventure" },
    { "id": 12, "name": "Philosophy" },
    { "id": 13, "name": "Technology" },
    { "id": 14, "name": "Psychology" },
    { "id": 15, "name": "Poetry" },
    { "id": 16, "name": "Business" },
    { "id": 17, "name": "Science" },
    { "id": 18, "name": "Drama" },
    { "id": 19, "name": "Comedy" }
];

const Admin = () => {
    const { user, token } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        categoryId: '',
        featured: false
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [errors, setErrors] = useState({});

    if (!user || user.role !== 'ADMIN') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center bg-white p-8 rounded-lg shadow-md">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">Access Denied</h2>
                    <p className="text-gray-600">You do not have permission to access this page.</p>
                </div>
            </div>
        );
    }

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (!formData.author.trim()) {
            newErrors.author = 'Author is required';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        } else if (formData.description.trim().length < 10) {
            newErrors.description = 'Description must be at least 10 characters long';
        }

        if (!formData.categoryId) {
            newErrors.categoryId = 'Category is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            setMessage({ type: 'error', text: 'Please fix the errors below' });
            return;
        }

        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await axios.post(`${API_BASE_URL}/admin/add-book`, {
                title: formData.title.trim(),
                author: formData.author.trim(),
                description: formData.description.trim(),
                categoryId: parseInt(formData.categoryId),
                featured: formData.featured
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            setMessage({ type: 'success', text: 'Book added successfully!' });
            setFormData({
                title: '',
                author: '',
                description: '',
                categoryId: '',
                featured: false
            });
            setErrors({});
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to add book. Please try again.';
            setMessage({ type: 'error', text: errorMessage });
        } finally {
            setLoading(false);
        }
    };

    const closeMessage = () => {
        setMessage({ type: '', text: '' });
    };

    return (
        <div className="min-h-screen  mt-20">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center mb-4">
                        <BookOpen className="w-8 h-8 text-[#d6a676] mr-3" />
                        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    </div>
                    <p className="text-gray-600">Add new books to Platfrom</p>
                </div>

                {/* Message Alert */}
                {message.text && (
                    <div className={`mb-6 p-4 rounded-lg flex items-center justify-between ${message.type === 'success'
                        ? 'bg-green-50 border border-green-200 text-green-800'
                        : 'bg-red-50 border border-red-200 text-red-800'
                        }`}>
                        <div className="flex items-center">
                            {message.type === 'success' ? (
                                <CheckCircle className="w-5 h-5 mr-2" />
                            ) : (
                                <AlertCircle className="w-5 h-5 mr-2" />
                            )}
                            <span>{message.text}</span>
                        </div>
                        <button
                            onClick={closeMessage}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {/* Add Book Form */}
                <div className="bg-white rounded-sm shadow-md p-6">
                    <div className="flex items-center mb-6">
                        <Plus className="w-6 h-6 text-[#d6a676] mr-2" />
                        <h2 className="text-2xl font-semibold text-gray-900">Add New Book</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Title */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                    Book Title *
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6a676] focus:border-transparent transition-colors ${errors.title ? 'border-red-400 bg-red-50' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter book title"
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                                )}
                            </div>

                            {/* Author */}
                            <div>
                                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                                    Author *
                                </label>
                                <input
                                    type="text"
                                    id="author"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6a676] focus:border-transparent transition-colors ${errors.author ? 'border-red-400 bg-red-50' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter author name"
                                />
                                {errors.author && (
                                    <p className="mt-1 text-sm text-red-600">{errors.author}</p>
                                )}
                            </div>
                        </div>

                        {/* Category */}
                        <div>
                            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-2">
                                Category *
                            </label>
                            <select
                                id="categoryId"
                                name="categoryId"
                                value={formData.categoryId}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6a676] focus:border-transparent transition-colors ${errors.categoryId ? 'border-red-400 bg-red-50' : 'border-gray-300'
                                    }`}
                            >
                                <option value="">Select a category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {errors.categoryId && (
                                <p className="mt-1 text-sm text-red-600">{errors.categoryId}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                Description *
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                value={formData.description}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6a676] focus:border-transparent transition-colors resize-vertical ${errors.description ? 'border-red-400 bg-red-50' : 'border-gray-300'
                                    }`}
                                placeholder="Enter book description (minimum 10 characters)"
                            />
                            <div className="mt-1 flex justify-between items-center">
                                {errors.description ? (
                                    <p className="text-sm text-red-600">{errors.description}</p>
                                ) : (
                                    <p className="text-sm text-gray-500">
                                        {formData.description.length}/500 characters
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Featured Checkbox */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="featured"
                                name="featured"
                                checked={formData.featured}
                                onChange={handleInputChange}
                                className="w-4 h-4 text-[#d6a676] border-gray-300 rounded focus:ring-[#d6a676] focus:ring-2"
                            />
                            <label htmlFor="featured" className="ml-2 text-sm font-medium text-gray-700">
                                Mark as Featured Book
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end pt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${loading
                                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                    : 'bg-[#d6a676] hover:bg-[#c19660] text-white shadow-md hover:shadow-lg'
                                    }`}
                            >
                                {loading ? (
                                    <div className="flex items-center">
                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                                        Adding Book...
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Book
                                    </div>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Admin;