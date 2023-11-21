import { useState, useEffect, createContext, useContext, SetStateAction } from 'react';
import { Product, Account, ImageObject, ImageProps } from './types';
import swell from 'swell-js';
export * from './types';
export { swell };

/**
 * Configuration
 * Add your Swell store URL, store ID, and public key to an .env.local file
 */

export const SWELL_URL = process.env.NEXT_PUBLIC_SWELL_URL || '';
export const STORE_ID = process.env.NEXT_PUBLIC_SWELL_STORE_ID || '';
export const PUBLIC_KEY = process.env.NEXT_PUBLIC_SWELL_STORE_KEY || '';
export const APP_ID = process.env.NEXT_PUBLIC_APP_ID || 'honest_reviews';

swell.init(STORE_ID, PUBLIC_KEY, {
  url: SWELL_URL,
});

/**
 * Context for global objects
 */

export const SwellContext = createContext({
  account: null,
  accountReady: false,
  setAccount: null,
  swellSettings: null,
  swellSettingsReady: false,
  appSettings: null,
  appSettingsReady: false,
} as {
  account: Account | null;
  accountReady: boolean;
  setAccount: SetStateAction<any>;
  swellSettings: SwellSettings | null;
  swellSettingsReady: boolean;
  appSettings: SwellData | null;
  appSettingsReady: boolean;
});

export function useSwellContext() {
  return useContext(SwellContext);
}

/**
 * Data hooks
 */

export function useProductList() {
  const [products, setProducts] = useState<any>(null);

  useEffect(() => {
    swell.products.list().then((products) => {
      setProducts(products);
    });
  }, []);

  return products;
}

export function useProductDetail(productId: string) {
  const { account, accountReady, appSettings, appSettingsReady } = useSwellContext();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    if (!productId) return;
    if (!accountReady || !appSettingsReady) return;
    swell.products
      .get(productId, {
        include: {
          reviews: {
            url: '/reviews',
            params: {
              product_id: 'id',
            },
            data: {
              expand: 'account, comments.account',
              include: {
                reaction: account &&
                  appSettings?.reactions?.enabled && {
                    url: '/reviews:reactions/:last',
                    params: {
                      parent_id: 'id',
                    },
                    data: {
                      account_id: account.id,
                      fields: 'id, liked',
                      sort: 'score desc',
                    },
                  },
              },
            },
          },
        },
      })
      .then((product) => {
        setProduct(product);
      });
  }, [productId, accountReady, appSettingsReady]);

  return product;
}

async function getReviews(
  appSettings: SwellData | null,
  account?: Account | null,
  query: SwellData = {}
) {
  return await swell.get('/reviews', {
    limit: 10,
    ...query,
    expand: 'account, comments.account',
    sort: 'score desc',
    include: {
      reaction: account &&
        appSettings?.reactions?.enabled && {
          url: '/reviews:reactions/:last',
          params: {
            parent_id: 'id',
          },
          data: {
            account_id: account.id,
            fields: 'id, liked',
            sort: 'score desc',
          },
        },
    },
  });
}

export function useProductReviews(product: Product, query: SwellData = {}) {
  const { account, accountReady, appSettings, appSettingsReady } = useSwellContext();
  const [reviews, setReviews] = useState<any>(null);

  useEffect(() => {
    if (!accountReady || !appSettingsReady) return;
    if (query?.featured && !appSettings?.featured?.enabled) return;

    getReviews(appSettings, account, { product_id: product.id, ...query }).then((reviews) => {
      setReviews(reviews);
    });
  }, [accountReady, appSettingsReady, account?.id, product?.id, JSON.stringify(query)]);

  return reviews;
}

export function useFeaturedReviews(query: SwellData = {}) {
  const { account, accountReady, appSettings, appSettingsReady } = useSwellContext();
  const [reviews, setReviews] = useState<any>();

  useEffect(() => {
    if (!accountReady || !appSettingsReady) return;
    if (!appSettings?.featured?.enabled) return;
    if (query?.product_id !== undefined && !query.product_id) return;

    getReviews(appSettings, account, {
      featured: true,
      limit: appSettings?.featured?.display_count || 3,
      ...query,
    }).then((reviews) => {
      setReviews(reviews);
    });
  }, [accountReady, appSettingsReady, account?.id, JSON.stringify(query)]);

  return reviews;
}

export function useReviewComments(reviewId: string, query: Object = {}) {
  const { account, accountReady } = useSwellContext();
  const [comments, setReviews] = useState<any>();

  useEffect(() => {
    if (!accountReady) return;

    swell
      .get('/reviews:comments', {
        parent_id: reviewId,
        limit: 10,
        ...query,
        expand: 'account',
        include: {
          reaction: account && {
            url: '/reviews:reactions/:last',
            params: {
              comment_id: 'id',
            },
            data: {
              parent_id: reviewId,
              account_id: account.id,
              fields: 'id, liked',
            },
          },
        },
      })
      .then((reviews) => {
        setReviews(reviews);
      });
  }, [accountReady, reviewId, account?.id, JSON.stringify(query)]);

  return comments;
}

/**
 * Helper methods
 */

export async function callAppFunction(method: string, functionName: string, data: any) {
  try {
    return swell.functions.request(method, APP_ID, functionName, data);
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
}

export function imageUrl(image: ImageObject, props: ImageProps) {
  const { width, height, padded, anchor } = props;

  const query = [width ? width * 2 : null, height ? height * 2 : null, padded, anchor]
    .filter(Boolean)
    .join('&');

  return `${image.file.url}?${query}`;
}
