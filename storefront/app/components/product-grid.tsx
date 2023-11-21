import { Product } from '@/app/swell';
import ProductCard from '@/app/components/product-card';

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <section aria-labelledby="trending-heading" className="bg-white" id="products">
      <div className="py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8 lg:py-32">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-0">
          <h2 id="trending-heading" className="text-2xl font-bold tracking-tight text-gray-900">
            Trending products
          </h2>
        </div>

        <div className="relative mt-8">
          <div className="relative w-full overflow-x-auto">
            <ul
              role="list"
              className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0"
            >
              {products.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
