import { useState } from 'react';

export function ThumbsInput({
  onChange,
  reaction,
}: {
  onChange: (rating: boolean) => void;
  reaction?: boolean | undefined;
}) {
  const [reactionState, setReaction] = useState(reaction);

  const onClickReaction = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const newReaction = Boolean(event.currentTarget.dataset.liked);
    setReaction(newReaction === reactionState ? undefined : newReaction);
    onChange(newReaction);
  };

  return (
    <div className="flex flex-row items-center gap-1">
      <a href="" onClick={onClickReaction} data-liked="true">
        <ThumbsUp chosen={reactionState ? true : false} />
      </a>
      <a href="" onClick={onClickReaction}>
        <ThumbsDown chosen={reactionState === false ? true : false} />
      </a>
    </div>
  );
}

export function ThumbsUp({ chosen }: { chosen?: boolean }) {
  return (
    <svg
      className={`h-6 w-6 ${chosen ? 'text-green-500' : 'text-gray-500'}`}
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={chosen ? '2' : '1'}
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      transform="scale(0.8)"
    >
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  );
}

export function ThumbsDown({ chosen }: { chosen?: boolean }) {
  return (
    <svg
      className={`h-6 w-6 mt-2 ${chosen ? 'text-red-500' : 'text-gray-500'}`}
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={chosen ? '2' : '1'}
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      transform="scale(0.8)"
    >
      <path d="M17 14V2" />
      <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
    </svg>
  );
}
