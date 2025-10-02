'use client';

interface Review {
  id: string;
  username: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#0DCAF0] rounded-full flex items-center justify-center text-black font-bold">
            {review.username.charAt(0).toUpperCase()}
          </div>
          <span className="text-white font-medium">{review.username}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-yellow-500 text-black px-2 py-1 rounded text-sm font-bold">
            ⭐ {review.rating}/10
          </span>
          <span className="text-gray-400 text-sm">{review.date}</span>
        </div>
      </div>
      <p className="text-gray-300 leading-relaxed">{review.comment}</p>
    </div>
  );
}