'use client';

import { swell, useProductDetail, useProductReviews } from '@/app/swell';
import ProductImage from '@/app/components/product-image';
import { StarIcon } from '@heroicons/react/20/solid';
import ReviewSection from '@/app/components/review-section';
import { formatCurrency } from '@/app/utils';

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductDetail({ params }: { params: { slug: string } }) {
  const product = useProductDetail(params.slug);

  if (!product) {
    return null;
  }

  const reviews = product.reviews || useProductReviews(product, { product_id: product.id });

  return (
    <main className="mx-auto mt-8 max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-0">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 sm:pb-32 sm:pt-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          {/* Product details */}
          <div className="lg:max-w-lg lg:self-end">
            <div className="mt-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {product.name}
              </h1>
            </div>

            <section aria-labelledby="information-heading" className="mt-4">
              <h2 id="information-heading" className="sr-only">
                Product information
              </h2>

              <div className="flex items-center">
                <p className="text-lg text-gray-900 sm:text-xl">
                  {formatCurrency(swell, product.price)}
                </p>

                <div className="ml-4 border-l border-gray-300 pl-4">
                  <h2 className="sr-only">Reviews</h2>
                  <div className="flex items-center">
                    <div>
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              product.$app?.honest_reviews?.rating > rating
                                ? 'text-yellow-400'
                                : 'text-gray-300',
                              'h-5 w-5 flex-shrink-0'
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="sr-only">
                        {product.$app?.honest_reviews?.rating} out of 5 stars
                      </p>
                    </div>
                    <p className="ml-2 text-sm text-gray-500">{reviews?.results?.length} reviews</p>
                  </div>
                </div>
              </div>

              <div className="mt-2 flex">
                <a
                  href="#reviews"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  See all reviews
                </a>
              </div>

              <div className="mt-4 space-y-6">
                <p
                  className="text-base text-gray-500"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                ></p>
              </div>
            </section>
          </div>

          {/* Product image */}
          <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
              <ProductImage
                product={product}
                width={400}
                height={400}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>

      <ReviewSection product={product} reviews={reviews} />
    </main>
  );
}
