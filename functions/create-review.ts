export const config: SwellConfig = {
  description: "Submit a review from a storefront",
  route: {
    public: true
  },
};

export default async function post(req: SwellRequest) {
  const { swell, data, session } = req;

  if (!session?.account_id) {
    throw new SwellError("You must be logged in to submit a review", { status: 401 });
  }

  return await swell.post('/reviews', {
    account_id: session.account_id,
    product_id: data.product_id,
    title: data.title,
    body: data.body,
    rating: data.rating,
  });
}
