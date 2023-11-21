import Image from 'next/image';

import { Product, ImageObject, imageUrl } from '@/app/swell';

type ImageProps = { product: Product; width?: number; height?: number; className?: string };

export default function ProductImage({
  product,
  width = 500,
  height = 500,
  className,
}: ImageProps) {
  if (!product.images?.[0]) {
    return null;
  }
  return (
    <Image
      className={className}
      src={imageUrl(product.images[0] as ImageObject, { width, height })}
      width={width}
      height={height}
      alt={product.name}
    />
  );
}
