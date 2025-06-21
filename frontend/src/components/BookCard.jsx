import { useState } from 'react';
import { Star, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BookCard = ({ book }) => {
    const [isLiked, setIsLiked] = useState(false);
    const navigate = useNavigate();
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                );
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <div key={i} className="relative w-4 h-4">
                        <Star className="w-4 h-4 text-gray-300 absolute" />
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 absolute clip-half" />
                    </div>
                );
            } else {
                stars.push(
                    <Star key={i} className="w-4 h-4 text-gray-300" />
                );
            }
        }
        return stars;
    };

    return (
        <div className="bg-white  shadow-md hover:shadow-sm transition-all duration-300 overflow-hidden group">
            {/* Book Cover Placeholder */}


            {/* Book Info */}
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <span className="inline-block px-2 py-1  text-[#d6a676] text-xs font-semibold rounded-full border border-[#d6a676] mr-2">
                        {book.category.name}
                    </span>
                    {book.featured && (
                        <div className=" px-3 py-1.5 bg-yellow-50 text-yellow-500 text-xs font-semibold rounded-full">
                            Featured
                        </div>
                    )}

                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2  ">
                    {book.title}
                </h3>

                <div className="flex items-center text-gray-600 mb-3">
                    <User className="w-4 h-4 mr-1" />
                    <span className="text-sm">{book.author}</span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {book.description}
                </p>

                {/* Rating */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                            {renderStars(book.averageRating)}
                        </div>
                        <span className="text-sm text-gray-600">
                            {book.averageRating > 0 ? book.averageRating.toFixed(1) : 'No rating'}
                        </span>
                    </div>
                    <span className="text-xs text-gray-500">
                        {book.totalReviews} review{book.totalReviews !== 1 ? 's' : ''}
                    </span>
                </div>



                {/* Action Buttons */}
                <div className="flex space-x-2">
                    <button
                        onClick={() => navigate(`/bookDetails/${book.id}`)} className="flex-1 bg-[#d6a676]  text-white py-2 px-4 rounded-sm font-medium transition-colors">
                        View Details
                    </button>

                </div>
            </div>
        </div>
    );
};

export default BookCard;