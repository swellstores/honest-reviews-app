import { notifyReviewCreated } from "./lib/slack";
import { autoReviewActions, updateProductRating } from "./lib/reviews";

export const config: SwellConfig = {
  description: "Handle review submission features",
  model: {
    events: ["review.created"],
  },
};

export default async function (req: SwellRequest) {
  const settings = await req.swell.settings();

  await Promise.all([
    autoReviewActions(req, settings).then(() => updateProductRating(req)),
    notifyReviewCreated(req, settings),
  ]);
}
