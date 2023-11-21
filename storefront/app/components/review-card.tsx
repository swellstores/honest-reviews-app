import { useState } from 'react';

import { Review, useSwellContext } from '@/app/swell';
import { formatDateShort } from '@/app/utils';
import ReactionChooser from '@/app/components/reaction-chooser';
import CommentIcon from '@/app/components/icons/comment';
import CommentForm from '@/app/components/comment-form';
import CommentList from '@/app/components/comment-list';

import { StarIcon } from '@heroicons/react/20/solid';

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(' ');
}

export default function ReviewCard({
  review,
  actions = true,
  featured = false,
}: {
  review: Review;
  actions?: boolean;
  featured?: boolean;
}) {
  const { account, appSettings } = useSwellContext();
  const [showCommentForm, setShowCommentForm] = useState(false);

  const onClickToggleCommentForm = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setShowCommentForm(!showCommentForm);
  };

  return (
    <div key={review.id} className="py-12">
      <div className="flex items-center">
        <div className="">
          <h4 className="text-sm font-bold text-gray-900">
            {review.account.$app?.honest_reviews?.name || review.account.name}{' '}
          </h4>
          <time
            dateTime={review.date_created}
            className="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-0 lg:border-0 lg:pl-0 text-xs"
          >
            {formatDateShort(review.date_created)}
          </time>
          <div className="mt-2 flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                className={classNames(
                  review.rating > rating ? 'text-yellow-400' : 'text-gray-300',
                  'h-5 w-5 flex-shrink-0'
                )}
                aria-hidden="true"
              />
            ))}
          </div>
          <p className="sr-only">{review.rating} out of 5 stars</p>
        </div>
      </div>

      <div
        className="mt-4 space-y-6 text-base italic text-gray-600"
        dangerouslySetInnerHTML={{ __html: review.body }}
      />
      {actions && account && (
        <div className="flex flex-row gap-2 items-center">
          <ReactionChooser review={review} />
          {appSettings?.comments?.enabled && (
            <a
              href=""
              onClick={onClickToggleCommentForm}
              className="text-sm text-opacity-50 hover:text-opacity-100 mt-2"
            >
              <CommentIcon />
            </a>
          )}
        </div>
      )}
      {showCommentForm && (
        <div className="mt-4">
          <CommentForm
            review={review}
            setShowCommentForm={setShowCommentForm}
            onClickToggleCommentForm={onClickToggleCommentForm}
          />
        </div>
      )}
      {!featured && (
        <div className="mt-4">
          <CommentList review={review} />
        </div>
      )}
    </div>
  );
}
