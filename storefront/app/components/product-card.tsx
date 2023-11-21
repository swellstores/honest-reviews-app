import Link from 'next/link';

import { swell, Product } from '@/app/swell';
import ProductImage from '@/app/components/product-image';
import { formatCurrency } from '@/app/utils';
import { StarIcon } from '@heroicons/react/20/solid';

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <li key={product.id} className="inline-flex w-64 flex-col text-center lg:w-auto mb-8">
      <div className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200">
          <ProductImage
            className="h-full w-full object-cover object-center group-hover:opacity-75"
            product={product}
            width={500}
            height={500}
          />
        </div>
        <div className="mt-6">
          <h3 className="mt-1 font-semibold text-gray-900">
            <Link href="/products/[slug]" as={`/products/${product.slug}`}>
              <span className="absolute inset-0" />
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-gray-900">{formatCurrency(swell, product.price)}</p>

          <div className="mt-3 flex flex-col items-center">
            <p className="sr-only">{product.$app?.honest_reviews?.rating} out of 5 stars</p>
            <div className="flex items-center">
              {[0, 1, 2, 3, 4].map((rating) => (
                <StarIcon
                  key={rating}
                  className={classNames(
                    product.$app?.honest_reviews?.rating || 0 > rating
                      ? 'text-yellow-400'
                      : 'text-gray-200',
                    'h-5 w-5 flex-shrink-0'
                  )}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
