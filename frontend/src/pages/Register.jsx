// Register.jsx
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from ".././context/authContext.jsx";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const { register, loading, error } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await register(form.name, form.email, form.password);
        if (success) navigate("/");
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex items-center justify-center min-h-screen  px-4">
            <div className="bg-white shadow-md rounded-sm p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Register for Booky</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Full Name"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#e4ceb8]"
                    />
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="Email"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#e4ceb8]"
                    />

                    {/* Password field with toggle */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            placeholder="Password (min 6 characters)"
                            className="w-full px-4 py-2 pr-12 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#e4ceb8]"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            {showPassword ? (
                                <EyeOff className="w-4 h-4" />
                            ) : (
                                <Eye className="w-4 h-4" />
                            )}
                        </button>
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#d6a676] hover:bg-[#cc9762] text-white py-2 rounded-sm transition"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
                <p className="mt-4 text-sm text-center">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 hover:underline">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Register;