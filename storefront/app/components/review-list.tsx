import { Product, Review, useProductReviews } from '@/app/swell';
import ReviewCard from '@/app/components/review-card';
import { ResultsResponse } from 'swell-js';

export default function ReviewList({
  product,
  reviews,
}: {
  product: Product;
  reviews?: ResultsResponse<Review>;
}) {
  if (!product) {
    return null;
  }

  const reviewList =
    reviews || product.reviews || useProductReviews(product, { product_id: product.id });

  return (
    <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
      <h3 className="sr-only">Recent reviews</h3>

      <div className="flow-root">
        <div className="-my-12 divide-y divide-gray-200">
          {reviewList.results.map((review: Review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}
