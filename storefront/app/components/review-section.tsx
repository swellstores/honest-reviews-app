import { StarIcon } from '@heroicons/react/20/solid';
import ReviewList from './review-list';
import { Product, Review, useProductReviews } from '../swell';
import ReviewForm from './review-form';
import { useEffect, useState } from 'react';
import { ResultsResponse } from 'swell-js';

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(' ');
}

export default function ReviewSection({
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

  const [reviewCount, setReviewCount] = useState({
    counts: [
      { rating: 1, count: 0 },
      { rating: 2, count: 0 },
      { rating: 3, count: 0 },
      { rating: 4, count: 0 },
      { rating: 5, count: 0 },
    ],
  });

  useEffect(() => {
    if (reviews) {
      const counts = [...reviewCount.counts];
      reviewList.results?.forEach((review: Review) => {
        counts[review.rating - 1].count += 1;
      });
      setReviewCount({ counts });
    }
  }, [reviewList]);

  return (
    <div className="bg-gray-50" id="reviews">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-32">
        <div className="lg:col-span-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customer Reviews</h2>

          <div className="mt-3 flex items-center">
            <div>
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      product.$app?.honest_reviews?.rating || 0 > rating
                        ? 'text-yellow-400'
                        : 'text-gray-300',
                      'h-5 w-5 flex-shrink-0'
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="sr-only">{product.$app?.honest_reviews?.rating} out of 5 stars</p>
            </div>
            <p className="ml-2 text-sm text-gray-900">
              Based on {product.$app?.honest_reviews?.review_count || 0} reviews
            </p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Review data</h3>
            {reviewList?.results.length > 0 && (
              <dl className="space-y-3">
                {reviewCount.counts.map((count) => (
                  <div key={count.rating} className="flex items-center text-sm">
                    <dt className="flex flex-1 items-center">
                      <p className="w-3 font-medium text-gray-900">
                        {count.rating}
                        <span className="sr-only"> star reviews</span>
                      </p>
                      <div aria-hidden="true" className="ml-1 flex flex-1 items-center">
                        <StarIcon
                          className={classNames(
                            count.count > 0 ? 'text-yellow-400' : 'text-gray-300',
                            'h-5 w-5 flex-shrink-0'
                          )}
                          aria-hidden="true"
                        />

                        <div className="relative ml-3 flex-1">
                          <div className="h-3 rounded-full border border-gray-200 bg-gray-100" />
                          {count.count > 0 ? (
                            <div
                              className="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
                              style={{
                                width: `calc(${count.count} / ${product.$app?.honest_reviews?.review_count} * 100%)`,
                              }}
                            />
                          ) : null}
                        </div>
                      </div>
                    </dt>
                    <dd className="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
                      {Math.round(
                        (count.count / (product.$app?.honest_reviews?.review_count || 0)) * 100
                      )}
                      %
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          <div className="mt-10">
            <h3 className="text-lg font-medium text-gray-900">Share your thoughts</h3>
            <p className="mt-1 text-sm text-gray-600">
              If you’ve used this product, share your thoughts with other customers
            </p>
            <ReviewForm product={product} />
          </div>
        </div>
        {reviews && reviews.results.length > 0 && (
          <ReviewList product={product} reviews={reviews} />
        )}
      </div>
    </div>
  );
}
