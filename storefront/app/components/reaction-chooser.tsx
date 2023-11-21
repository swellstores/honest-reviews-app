import { useState } from 'react';

import { callAppFunction, Review, Comment, useSwellContext } from '@/app/swell';
import { ThumbsInput } from '@/app/components/icons/thumbs';

export default function ReactionChooser({
  review,
  comment,
}: {
  review: Review;
  comment?: Comment;
}) {
  const { appSettings } = useSwellContext();

  if (!appSettings?.reactions?.enabled) {
    return null;
  }

  const [reactionRecord, setReactionRecord] = useState(review.reaction);

  const onClickReaction = async (liked: boolean) => {
    const shouldDelete = reactionRecord?.liked === liked;
    const result = await callAppFunction('post', 'create-reaction', {
      review_id: review.id,
      ...(comment ? { comment_id: comment.id } : undefined),
      ...(reactionRecord?.id ? { id: reactionRecord.id } : undefined),
      ...(shouldDelete ? undefined : { liked }),
    });
    setReactionRecord(shouldDelete ? undefined : result);
  };

  return (
    <div className="mt-1">
      <ThumbsInput onChange={onClickReaction} reaction={reactionRecord?.liked} />
    </div>
  );
}
