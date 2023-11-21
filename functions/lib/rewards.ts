export async function createReviewReward(req: SwellRequest, settings: SwellData): Promise<void> {
  if (!settings.rewards?.enabled) return;

  const { swell, data: review } = req;

  // Reward can be manually disabled
  if (review.reward_disabled) {
    return;
  }

  // Create a reward credit for an approved review
  const reward = await swell.post('/rewards', {
    review_id: review.id,
    account_id: review.account_id,
    amount:
      review.$locale?.reward_amount || review.reward_amount || settings.rewards?.default_amount,
  });

  if (reward.errors) {
    console.error('Error creating reward', review.errors);
  }
}

export async function createRewardCredit(req: SwellRequest, settings: SwellData): Promise<void> {
  if (!settings.rewards?.enabled) return;

  const { swell, data: reward } = req;

  // Create an account credit based on the reward
  await swell.post('/accounts:credits', {
    parent_id: reward.account_id,
    amount: reward.$locale?.amount || reward.amount,
    reason: 'promo',
    reason_message: `Reward for an honest review`,
    $app: {
      honest_reviews: { review_id: reward.review_id, reward_id: reward.id },
    },
  });

  await swell.put('/reviews/{id}', {
    id: reward.review_id,
    rewarded: true,
  });
}
