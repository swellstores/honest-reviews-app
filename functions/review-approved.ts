import { updateProductRating } from "./lib/reviews";
import { createReviewReward } from "./lib/rewards";

export const config: SwellConfig = {
  description: "Handle review approval features",
  model: {
    events: ["review.approved"],
  },
};

export default async function (req: SwellRequest) {
  const settings = await req.swell.settings();

  await Promise.all([
    updateProductRating(req),
    createReviewReward(req, settings),
  ]);
}
