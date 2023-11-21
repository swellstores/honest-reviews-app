import { Review } from '@/app/swell';
import ReviewCard from '@/app/components/review-card';

export default function FeaturedReviews({ reviews }: { reviews?: any }) {
  if (!reviews?.count) {
    return null;
  }

  return (
    <div className='"py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8 lg:py-32"'>
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-0">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Featured reviews</h2>
      </div>
      <div className="flex flex-row mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.results.map((review: Review) => (
            <ReviewCard key={review.id} review={review} actions={false} featured={true} />
          ))}
        </div>
      </div>
    </div>
  );
}
