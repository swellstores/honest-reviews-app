export async function calculateReactionScores(
  req: SwellRequest,
  settings: SwellData
): Promise<void> {
  if (!settings.reactions?.enabled) return;

  const { swell, data: reaction } = req;
  const { likes_only, reviews_only } = settings?.reactions || {};

  const review = await swell.get('/reviews/{id}', {
    id: reaction.parent_id,
    expand: 'account',
  });

  if (!review) {
    console.error('Review not found', reaction);
    return;
  }

  // Get all reaction totals based on settings
  const [reviewLikes, reviewDislikes, commentLikes, commentDislikes] = await Promise.all([
    // Reviews
    reaction.liked ? getReactionLikes(req, { parent_id: reaction.parent_id, liked: true }) : null,
    !reaction.liked && !likes_only
      ? getReactionLikes(req, { parent_id: reaction.parent_id, liked: false })
      : null,
    // Comments
    reaction.liked && !reviews_only
      ? getReactionLikes(req, {
          comment_id: reaction.comment_id,
          liked: true,
        })
      : null,
    !reaction.liked && !reviews_only
      ? getReactionLikes(req, {
          comment_id: reaction.comment_id,
          liked: false,
        })
      : null,
  ]);

  // Update all relevant reaction counts and scores
  await Promise.all([
    // Reviews
    reviewLikes?.value !== undefined &&
      swell.put('/reviews/{id}', {
        id: reaction.parent_id,
        like_count: reviewLikes.value,
      }),
    reviewDislikes?.value !== undefined &&
      swell.put('/reviews/{id}', {
        id: reaction.parent_id,
        dislike_count: reviewDislikes.value,
      }),
    // Comments
    commentLikes?.value !== undefined &&
      swell.put('/reviews:comments/{id}', {
        id: reaction.comment_id,
        like_count: commentLikes.value,
      }),
    commentDislikes?.value !== undefined &&
      swell.put('/reviews:comments/{id}', {
        id: reaction.comment_id,
        dislike_count: commentDislikes.value,
      }),
    // Reviewer score
    swell.put('/accounts/{id}', {
      id: review.account_id,
      $app: {
        [req.appId]: {
          score: (review.account?.$app?.[req.appId]?.score || 0) + (reaction.liked ? 1 : -1),
        },
      },
    }),
  ]);
}

export async function getReactionLikes(req: SwellRequest, query): Promise<{ value: number }> {
  const { swell } = req;

  return await swell.get('/reviews:reactions/:group', {
    where: query,
    value: {
      $sum: 1,
    },
  });
}
