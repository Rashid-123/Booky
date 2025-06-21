

import { useEffect, useState } from 'react';
import { Star, User, MessageCircle, ArrowLeft, } from 'lucide-react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from '../context/authContext'; // Adjust the path as necessary
import axios from 'axios';
import ReviewForm from '../components/ReviewForm';
import ReviewsList from '../components/ReviewsList'; // Adjust the path as necessary

// Separate Reviews List Component


const BookDetailsPage = () => {
    const [book, setBook] = useState([]);
    const { token } = useAuth();
    const [loading, setLoading] = useState(true);
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);

    const [newReview, setNewReview] = useState('');
    const [newRating, setNewRating] = useState(0);
    const [showReviewForm, setShowReviewForm] = useState(false);

    const navigate = useNavigate();

    const { bookId } = useParams();
    console.log("Book ID:", bookId);

    useEffect(() => {
        const fetchBookDetails = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${API_BASE_URL}/books/${bookId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log("Book Details Response:", response.data);
                const data = response.data;
                setBook(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching book details:', error);
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [bookId, token]);

    const handleSubmitReview = async () => {
        if (!newReview.trim() || newReview.trim().length < 10 || newRating === 0) {
            alert('Please provide a review (minimum 10 characters) and rating.');
            return;
        }

        setIsSubmittingReview(true);

        try {
            const response = await axios.post(
                `${API_BASE_URL}/reviews/${bookId}`,
                {
                    content: newReview.trim(),
                    rating: newRating
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('Review submitted successfully:', response.data);

            // Add the new review to the book's reviews array
            const newReviewData = response.data.review;
            setBook(prevBook => ({
                ...prevBook,
                reviews: [newReviewData, ...prevBook.reviews],
                totalReviews: prevBook.totalReviews + 1,
                // Recalculate average rating
                averageRating: ((prevBook.averageRating * prevBook.totalReviews) + newRating) / (prevBook.totalReviews + 1)
            }));

            // Reset form
            setNewReview('');
            setNewRating(0);
            setShowReviewForm(false);

            alert('Review submitted successfully!');
        } catch (error) {
            console.error('Error submitting review:', error);

            if (error.response?.data?.message) {
                alert(`Error: ${error.response.data.message}`);
            } else if (error.response?.status === 400) {
                alert('Invalid review data. Please check your input.');
            } else if (error.response?.status === 401) {
                alert('You need to be logged in to submit a review.');
            } else if (error.response?.status === 404) {
                alert('Book not found.');
            } else {
                alert('Failed to submit review. Please try again.');
            }
        } finally {
            setIsSubmittingReview(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#d6a676] border-t-transparent mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading book details...</p>
                </div>
            </div>
        );
    }

    const renderStars = (rating, interactive = false, size = "w-4 h-4") => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(
                    <Star
                        key={i}
                        className={`${size} fill-yellow-400 text-yellow-400 ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
                        onClick={interactive ? () => setNewRating(i + 1) : undefined}
                    />
                );
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <div key={i} className={`relative ${size}`}>
                        <Star className={`${size} text-gray-300 absolute`} />
                        <Star className={`${size} fill-yellow-400 text-yellow-400 absolute clip-half`} />
                    </div>
                );
            } else {
                stars.push(
                    <Star
                        key={i}
                        className={`${size} text-gray-300 ${interactive ? 'cursor-pointer hover:scale-110 transition-transform hover:text-yellow-400' : ''}`}
                        onClick={interactive ? () => setNewRating(i + 1) : undefined}
                    />
                );
            }
        }
        return stars;
    };
    const handleBackToBooks = () => {
        navigate(-1); // Goes back to the previous page in history
    };
    return (!loading &&
        <div className="mt-20 min-h-screen bg-[]">
            <div>
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <button onClick={handleBackToBooks} className="flex items-center text-gray-600 hover:text-[#d6a676] transition-colors">
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back to Books
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden mb-8">
                    <div className="p-8">
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="md:col-span-1">
                                <div className="bg-[#f6efe5] rounded-lg aspect-[3/4] flex items-center justify-center shadow-sm">
                                    <div className="text-8xl mb-4">📚</div>
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center space-x-2">
                                        <span className="inline-block px-3 py-1 text-[#d6a676] text-sm font-semibold rounded-full border border-[#d6a676]">
                                            {book.category?.name}
                                        </span>
                                        {book.featured && (
                                            <div className="px-3 py-1 bg-yellow-50 text-yellow-500 text-sm font-semibold rounded-full">
                                                Featured
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                    {book.title}
                                </h1>

                                <div className="flex items-center text-gray-600 mb-4">
                                    <User className="w-5 h-5 mr-2" />
                                    <span className="text-lg font-medium">{book.author}</span>
                                </div>

                                {/* Rating Section */}
                                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="flex items-center">
                                                {renderStars(book.averageRating || 0, false, "w-5 h-5")}
                                            </div>
                                            <span className="text-lg font-semibold text-gray-900">
                                                {book.averageRating > 0 ? book.averageRating.toFixed(1) : 'No rating'}
                                            </span>
                                        </div>
                                        <span className="text-gray-600">
                                            {book.totalReviews || 0} review{(book.totalReviews || 0) !== 1 ? 's' : ''}
                                        </span>
                                    </div>
                                </div>

                                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                    {book.description}
                                </p>

                                {/* Action Buttons */}
                                <div className="flex space-x-4">
                                    <button
                                        onClick={() => setShowReviewForm(!showReviewForm)}
                                        className="border border-[#d6a676] text-[#d6a676] hover:bg-[#d6a676] hover:text-white py-3 px-6 rounded-sm font-medium transition-colors flex items-center"
                                        disabled={isSubmittingReview}
                                    >
                                        <MessageCircle className="w-4 h-4 mr-2" />
                                        Write Review
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Review Form Component */}
                <ReviewForm
                    showReviewForm={showReviewForm}
                    setShowReviewForm={setShowReviewForm}
                    newReview={newReview}
                    setNewReview={setNewReview}
                    newRating={newRating}
                    setNewRating={setNewRating}
                    onSubmitReview={handleSubmitReview}
                    isSubmitting={isSubmittingReview}
                />

                {/* Reviews List Component */}
                <ReviewsList
                    reviews={book.reviews || []}
                    totalReviews={book.totalReviews || 0}
                />
            </div>
        </div>
    );
};

export default BookDetailsPage;