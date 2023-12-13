import { autoApproveActions } from './approval';

export async function autoReviewActions(req: SwellRequest, settings: SwellData): Promise<void> {
  await autoApproveActions(req, 'reviews', req.data, req.data, settings);
}

export async function updateProductRating(req: SwellRequest): Promise<void> {
  const { swell, data: review } = req;

  const { rating, count } = await getProductReviewRating(req, {
    product_id: review.product_id,
    status: 'approved',
  });

  await swell.put('/products/{id}', {
    id: review.product_id,
    $app: {
      [req.appId]: { rating, review_count: count },
    },
  });
}

export async function getProductReviewRating(
  req: SwellRequest,
  query: SwellData
): Promise<{ count: number; rating: number }> {
  const { swell } = req;

  const result = await swell.get('/reviews/:group', {
    where: query,
    count: {
      $sum: 1,
    },
    rating_total: {
      $sum: 'rating',
    },
  });

  if (!result) {
    console.warn('Unable to aggregate product reviews', query);
    return { count: 0, rating: 0 };
  }

  return {
    count: result.count || 0,
    rating: result.count ? result.rating_total / result.count : 0,
  };
}
