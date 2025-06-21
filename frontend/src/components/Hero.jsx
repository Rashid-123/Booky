import { useNavigate } from "react-router-dom";
import { BookOpen } from 'lucide-react';
export const Hero = () => {
    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate('/login');
    };
    return (
        <div className="min-h-screen mt-10">
            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="text-center">

                    <div className="mb-8">
                        <BookOpen className="w-24 h-24 text-[#d6a676] mx-auto" />
                    </div>


                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        Welcome to <span className="text-[#d6a676]">Booky</span>
                    </h1>


                    <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
                        Discover, explore, and enjoy our curated collection of exceptional books.
                        Join thousands of book lovers who have found their next favorite read with us.
                    </p>


                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
                        <div className="bg-white p-6 rounded-md shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Featured Collections</h3>
                            <p className="text-gray-600">Access handpicked books curated by our expert team</p>
                        </div>
                        <div className="bg-white p-6 rounded-md shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Personalized Experience</h3>
                            <p className="text-gray-600">Get recommendations tailored to your reading preferences</p>
                        </div>
                        <div className="bg-white p-6 rounded-md shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Community Reviews</h3>
                            <p className="text-gray-600">Read and share reviews with fellow book enthusiasts</p>
                        </div>
                    </div>


                    <div className="bg-white p-8 rounded-md shadow-sm max-w-md mx-auto">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Reading?</h3>
                        <p className="text-gray-600 mb-6">
                            Please log in to access our featured books and personalized recommendations.
                        </p>
                        <button
                            onClick={handleLoginClick}
                            className="w-full bg-[#d6a676] hover:bg-[#c19660] text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
                        >
                            Login to Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}