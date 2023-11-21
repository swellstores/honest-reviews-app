export const config: SwellConfig = {
  description: "Create or update a reaction from a storefront",
  route: {
    public: true,
  },
};

export async function post(req: SwellRequest) {
  const { swell, data, session } = req;

  if (!session?.account_id) {
    throw new SwellError("You must be logged in to submit a reaction", {
      status: 401,
    });
  }

  // Update or delete existing reaction
  if (data.id) {
    if (data.liked !== undefined) {
      return swell.put("/reviews:reactions/{id}", {
        id: data.id,
        account_id: session.account_id,
        parent_id: data.review_id,
        liked: data.liked,
      });
    }
    
    return swell.delete("/reviews:reactions/{id}", {
      id: data.id,
    });
  }

  // Create new reaction
  return swell.post("/reviews:reactions", {
    account_id: session.account_id,
    parent_id: data.review_id,
    liked: data.liked,
  });
}