export const config: SwellConfig = {
  description: "Submit a comment from a storefront",
  route: {
    public: true,
  },
};

export async function post(req: SwellRequest) {
  const { swell, data, session } = req;

  if (!session?.account_id) {
    throw new SwellError("You must be logged in to submit a comment", {
      status: 401,
    });
  }

  return await swell.post('/reviews:comments', {
    account_id: session.account_id,
    parent_id: data.review_id,
    title: data.title,
    body: data.body,
  });
}
