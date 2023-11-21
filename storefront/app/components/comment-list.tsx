import { Review, Comment, useSwellContext } from '@/app/swell';
import { formatDateShort } from '@/app/utils';
import ReactionChooser from '@/app/components/reaction-chooser';

export default function CommentList({ review }: { review: Review }) {
  const { account, appSettings } = useSwellContext();

  if (!review?.comments?.results.length || !appSettings?.comments?.enabled) {
    return null;
  }

  return (
    <div>
      {review.comments.results.map((comment: Comment) => (
        <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
          <div className="flex justify-between gap-x-4">
            <div className="py-0.5 text-xs leading-5 text-gray-500">
              <span className="font-medium text-gray-900">
                {' '}
                {comment.account.$app?.honest_reviews?.name ||
                  comment.account.name ||
                  'Anonymous'}{' '}
              </span>{' '}
              commented
            </div>
            <time
              dateTime="comment.date_created"
              className="flex-none py-0.5 text-xs leading-5 text-gray-500"
            >
              {formatDateShort(comment.date_created)}
            </time>
          </div>
          <p className="text-sm leading-6 text-gray-500">{comment.body}</p>
          {account && <ReactionChooser review={review} comment={comment} />}
        </div>
      ))}
    </div>
  );
}
