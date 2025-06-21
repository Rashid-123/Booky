import { useState, useEffect } from "react";
import { User, Mail, Calendar, Shield, Edit2, Save, X, Loader } from "lucide-react";
import { useAuth } from "../context/authContext";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Profile = () => {
    const { updatedUser, token, isAuthenticated } = useAuth();

    // State management
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        email: ""
    });

    // Fetch user profile on component mount
    useEffect(() => {
        if (isAuthenticated && token) {
            fetchUserProfile();
        }
    }, [isAuthenticated, token]);

    const fetchUserProfile = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await axios.get(`${API_BASE_URL}/auth/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log("Profile Response:", response.data);
            const userData = response.data.user;
            setUser(userData);
            setFormData({
                name: userData.name,
                email: userData.email
            });
        } catch (error) {
            console.error("Error fetching profile:", error);

            if (error.response?.status === 401) {
                setError("Session expired. Please login again.");
            } else if (error.response?.status === 404) {
                setError("User profile not found.");
            } else {
                setError("Failed to load profile. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));


        if (error) setError("");
        if (success) setSuccess("");
    };

    const handleEditToggle = () => {
        if (isEditing) {

            setFormData({
                name: user.name,
                email: user.email
            });
            setError("");
            setSuccess("");
        }
        setIsEditing(!isEditing);
    };

    const handleSave = async () => {

        if (!formData.name.trim()) {
            setError("Name is required");
            return;
        }

        if (!formData.email.trim()) {
            setError("Email is required");
            return;
        }

        if (formData.name.trim().length < 2) {
            setError("Name must be at least 2 characters long");
            return;
        }


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError("Please enter a valid email address");
            return;
        }

        setIsSaving(true);
        setError("");
        setSuccess("");

        try {
            const response = await axios.put(
                `${API_BASE_URL}/auth/profile`,
                {
                    name: formData.name.trim(),
                    email: formData.email.trim()
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log("Update Response:", response.data);
            const updatedUser = response.data.user;

            // Update local state
            setUser(updatedUser);
            setFormData({
                name: updatedUser.name,
                email: updatedUser.email
            });


            // Update auth context


            setSuccess("Profile updated successfully!");
            setIsEditing(false);

            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(""), 3000);

        } catch (error) {
            console.error("Error updating profile:", error);

            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else if (error.response?.status === 400) {
                setError("Invalid data provided. Please check your input.");
            } else if (error.response?.status === 401) {
                setError("Session expired. Please login again.");
            } else {
                setError("Failed to update profile. Please try again.");
            }
        } finally {
            setIsSaving(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getRoleColor = (role) => {
        switch (role) {
            case 'ADMIN':
                return 'bg-red-100 text-red-800';
            case 'USER':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
                    <p className="text-gray-600">Please login to view your profile.</p>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center ">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#d6a676] border-t-transparent mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile Not Found</h2>
                    <p className="text-gray-600">Unable to load profile information.</p>
                    <button
                        onClick={fetchUserProfile}
                        className="mt-4 bg-[#d6a676] hover:bg-[#b8956a] text-white px-4 py-2 rounded-md transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen  py-8 mt-20">
            <div className="max-w-2xl mx-auto px-4">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
                    <p className="text-gray-600">Manage your account information</p>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-800 font-medium">{success}</p>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-800 font-medium">{error}</p>
                    </div>
                )}


                <div className="bg-white shadow-sm rounded-lg overflow-hidden">

                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                        <button
                            onClick={handleEditToggle}
                            disabled={isSaving}
                            className="flex items-center space-x-2 text-[#d6a676] hover:text-[#b8956a] transition-colors disabled:opacity-50"
                        >
                            {isEditing ? (
                                <>
                                    <X className="w-4 h-4" />
                                    <span>Cancel</span>
                                </>
                            ) : (
                                <>
                                    <Edit2 className="w-4 h-4" />
                                    <span>Edit</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* Card Body */}
                    <div className="px-6 py-6">
                        <div className="space-y-6">

                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <User className="w-4 h-4 mr-2" />
                                    Full Name
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d6a676] focus:border-transparent"
                                        placeholder="Enter your full name"
                                    />
                                ) : (
                                    <p className="text-gray-900 text-lg">{user.name}</p>
                                )}
                            </div>


                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <Mail className="w-4 h-4 mr-2" />
                                    Email Address
                                </label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d6a676] focus:border-transparent"
                                        placeholder="Enter your email address"
                                    />
                                ) : (
                                    <p className="text-gray-900 text-lg">{user.email}</p>
                                )}
                            </div>

                            {/* Role Field (Read-only) */}
                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <Shield className="w-4 h-4 mr-2" />
                                    Role
                                </label>
                                <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(user.role)}`}>
                                    {user.role}
                                </span>
                            </div>

                            {/* Timestamps */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        Member Since
                                    </label>
                                    <p className="text-gray-600">{formatDate(user.createdAt)}</p>
                                </div>
                                <div>
                                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        Last Updated
                                    </label>
                                    <p className="text-gray-600">{formatDate(user.updatedAt)}</p>
                                </div>
                            </div>
                        </div>

                        {/* Save Button */}
                        {isEditing && (
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="flex items-center space-x-2 bg-[#d6a676] hover:bg-[#b8956a] text-white px-6 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSaving ? (
                                        <>
                                            <Loader className="w-4 h-4 animate-spin" />
                                            <span>Saving...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4" />
                                            <span>Save Changes</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;