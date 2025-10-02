'use client';

import { useState } from 'react';
import ReviewCard from './ReviewCard';

interface Review {
  id: string;
  username: string;
  rating: number;
  comment: string;
  date: string;
}

interface CommentSectionProps {
  movieId: number;
  reviews?: Review[];
}

export default function CommentSection({ movieId, reviews = [] }: CommentSectionProps) {
  const [username, setUsername] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [userReviews, setUserReviews] = useState<Review[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReview: Review = {
      id: Date.now().toString(),
      username,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    };
    setUserReviews([newReview, ...userReviews]);
    setUsername('');
    setRating(5);
    setComment('');
  };
  const mockReviews: Review[] = [
    {
      id: '1',
      username: 'MovieFan123',
      rating: 8.5,
      comment: 'Amazing cinematography and great storyline. Highly recommend!',
      date: '2024-01-15'
    },
    {
      id: '2',
      username: 'CinemaLover',
      rating: 7.2,
      comment: 'Good movie overall, but the pacing could have been better.',
      date: '2024-01-10'
    }
  ];

  const displayReviews = [...userReviews, ...(reviews.length > 0 ? reviews : mockReviews)];

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">User Reviews</h2>
        <p className="text-gray-400">See what others think about this movie</p>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 mb-8">
        <h3 className="text-xl font-bold text-white mb-4">Write a Review</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:border-[#0DCAF0] focus:outline-none"
          />
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:border-[#0DCAF0] focus:outline-none"
          >
            {[1,2,3,4,5,6,7,8,9,10].map(num => (
              <option key={num} value={num}>⭐ {num}/10</option>
            ))}
          </select>
        </div>
        <textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          rows={4}
          className="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:border-[#0DCAF0] focus:outline-none mb-4"
        />
        <button
          type="submit"
          className="bg-[#0DCAF0] text-black px-6 py-2 rounded font-bold hover:bg-[#0DCAF0]/90 transition-colors"
        >
          Post Review
        </button>
      </form>
      
      <div className="space-y-6">
        {displayReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
      
      {displayReviews.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No reviews yet. Be the first to review!</p>
        </div>
      )}
    </section>
  );
}