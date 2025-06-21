import { Star, User, Calendar, MessageCircle, ArrowLeft, Share2 } from 'lucide-react';


const ReviewsList = ({ reviews, totalReviews }) => {
    const renderStars = (rating, size = "w-4 h-4") => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(
                    <Star key={i} className={`${size} fill-yellow-400 text-yellow-400`} />
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
                    <Star key={i} className={`${size} text-gray-300`} />
                );
            }
        }
        return stars;
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">Reviews ({totalReviews})</h3>
            </div>

            <div className="divide-y divide-gray-200">
                {reviews.map((review) => (
                    <div key={review.id} className="p-6">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-[#d6a676] rounded-full flex items-center justify-center text-white font-semibold">
                                    {review.user.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900">{review.user.name}</div>
                                    <div className="text-sm text-gray-500">{formatDate(review.createdAt)}</div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                {renderStars(review.rating)}
                            </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{review.content}</p>
                    </div>
                ))}

                {reviews.length === 0 && (
                    <div className="p-6 text-center text-gray-500">
                        No reviews yet. Be the first to review this book!
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewsList;