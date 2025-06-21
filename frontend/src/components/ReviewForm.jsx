import { Star, User, Calendar, MessageCircle, ArrowLeft, Share2 } from 'lucide-react';


const ReviewForm = ({
    showReviewForm,
    setShowReviewForm,
    newReview,
    setNewReview,
    newRating,
    setNewRating,
    onSubmitReview,
    isSubmitting
}) => {
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

    if (!showReviewForm) return null;

    return (
        <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Write a Review</h3>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
                <div className="flex items-center space-x-1">
                    {renderStars(newRating, true, "w-6 h-6")}
                    <span className="ml-2 text-sm text-gray-600">
                        {newRating > 0 ? `${newRating} star${newRating !== 1 ? 's' : ''}` : 'Click to rate'}
                    </span>
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                <textarea
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    placeholder="Share your thoughts about this book... (minimum 10 characters)"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d6a676] focus:border-transparent resize-none"
                    rows="4"
                    disabled={isSubmitting}
                />
                <div className="text-sm text-gray-500 mt-1">
                    {newReview.length}/10 characters minimum
                </div>
            </div>

            <div className="flex space-x-3">
                <button
                    onClick={onSubmitReview}
                    className="bg-[#d6a676] hover:bg-[#b8956a] text-white py-2 px-6 rounded-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!newReview.trim() || newReview.trim().length < 10 || newRating === 0 || isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
                <button
                    onClick={() => setShowReviewForm(false)}
                    className="border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-6 rounded-sm font-medium transition-colors disabled:opacity-50"
                    disabled={isSubmitting}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};


export default ReviewForm;