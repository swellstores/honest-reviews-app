'use client';

import { useProductList, useFeaturedReviews } from '@/app/swell';
import ProductGrid from '@/app/components/product-grid';
import FeaturedReviews from '@/app/components/featured-reviews';

export default function Home() {
  const products = useProductList();
  const reviews = useFeaturedReviews();

  if (!products?.results) {
    return null;
  }

  return (
    <div>
      <div className="relative">
        {/* Decorative image and overlay */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <img
            src="/home-page-hero.jpg"
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-gray-900 opacity-50" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0">
          <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">
            New comments are here
          </h1>
          <p className="mt-4 text-xl text-white">
            The new arrivals have, well, newly arrived. Check out the latest options from our summer
            small-batch release while they're still in stock.
          </p>
          <a
            href="#products"
            className="mt-8 inline-block rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100"
          >
            Browse products
          </a>
        </div>
      </div>
      <ProductGrid products={products.results} />
      {reviews?.results?.length > 0 && <FeaturedReviews reviews={reviews} />}
    </div>
  );
}
