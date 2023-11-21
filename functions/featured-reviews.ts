export const config: SwellConfig = {
  description: "Get a list of featured reviews for a product",
  route: {
    public: true,
  },
};

export default async function get(req: SwellRequest) {
  const { swell, data } = req;

  if (!data.product_id) {
    return [];
  }

  const featuredReviews = await swell.get("/reviews", {
    product_id: data.product_id,
    limit: data.limit || 3,
    featured: true,
    status: "approved",
    fields: [
      "account_id",
      "product_id",
      "title",
      "body",
      "rating",
      "score",
      "images",
      "verified_buyer",
      "date_created",
    ],
  });

  return featuredReviews;
}
