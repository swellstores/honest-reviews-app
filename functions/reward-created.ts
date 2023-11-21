import { createRewardCredit } from "./lib/rewards";
import { notifyRewardCreated } from "./lib/slack";

export const config: SwellConfig = {
  description: "Create a reward for an approved review",
  model: {
    events: ["reward.created"],
  },
};

export default async function (req: SwellRequest) {
  const settings = await req.swell.settings();

  await Promise.all([
    createRewardCredit(req, settings),
    notifyRewardCreated(req, settings),
  ]);
}
