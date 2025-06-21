import { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { useAuth } from '../context/authContext';
import BookCard from '../components/BookCard';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


// Main Featured Books Page Component
const Home = () => {
    const { token, } = useAuth();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalBooks, setTotalBooks] = useState(0);



    useEffect(() => {
        // Simulate API call
        const fetchBooks = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${API_BASE_URL}/books/`, {
                    params: {
                        page: currentPage,
                        limit: 6
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setBooks(response.data.books);
                setTotalPages(response.data.totalPages);

                setTotalBooks(response.data.totalBooks);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching featured books:', error);
                setBooks([]);

            }


        }
        fetchBooks();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center ">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#d6a676] border-t-transparent mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading  books...</p>
                </div>
            </div>
        );


    }

    return (
        <div className="max-w-7xl mx-auto min-h-screen mt-20">

            <div className="">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">All Books</h1>

                        </div>
                        <div className="hidden md:flex items-center space-x-4">
                            <span className="text-sm text-gray-500">
                                {totalBooks} books found
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                {books.length === 0 ? (
                    <div className="text-center py-12">
                        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Featured Books Found</h3>
                        <p className="text-gray-600">Check back later for our latest featured selections.</p>
                    </div>
                ) : (
                    <>
                        {/* Books Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 mb-8">
                            {books.map((book) => (
                                <BookCard key={book.id} book={book} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center space-x-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`px-4 py-2 rounded-lg ${currentPage === page
                                            ? 'bg-[#d6a676] text-white'
                                            : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;