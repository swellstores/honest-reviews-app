import { calculateReactionScores } from "./lib/reactions.js";

export const config: SwellConfig = {
  description: "Apply scores to reviews and comments based on reactions",
  model: {
    events: [
      "review.reaction.created",
      "review.reaction.updated",
      "review.reaction.deleted",
    ],
  },
};

export default async function (req: SwellRequest) {
  const settings = await req.swell.settings();

  await calculateReactionScores(req, settings);
}
