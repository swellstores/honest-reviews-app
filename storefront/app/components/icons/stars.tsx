import { useState } from 'react';

export default function Stars({
  rating = 0,
  number = true,
}: {
  rating?: number;
  number?: boolean;
}) {
  return (
    <div className="flex items-center">
      <Star fill={rating >= 1} />
      <Star fill={rating >= 2} />
      <Star fill={rating >= 3} />
      <Star fill={rating >= 4} />
      <Star fill={rating >= 5} />
      {number && <span className="ml-1 text-primary-600">{rating}</span>}
    </div>
  );
}

export function StarsInput({ onChange }: { onChange: (rating: number) => void }) {
  const [rating, setRating] = useState(0);

  const [hoverRating, setHoverRating] = useState(0);

  const onClickStar = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const newRating = parseInt(event.currentTarget.dataset.rating as string, 10);
    setRating(newRating);
    onChange(newRating);
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((n) => (
        <a
          key={n}
          href=""
          onClick={onClickStar}
          data-rating={n}
          onMouseEnter={() => setHoverRating(n)}
          onMouseLeave={() => setHoverRating(0)}
          className="hover:opacity-50"
        >
          <Star fill={hoverRating >= n || rating >= n} />
        </a>
      ))}
      <span className="ml-1 text-primary-600">{rating}</span>
    </div>
  );
}

export function Star({ fill }: { fill: boolean }) {
  return (
    <svg
      className={`mr-1 ${
        fill ? 'w-5 h-5 fill-current text-yellow-400' : 'w-5 h-5 fill-current text-gray-300'
      }`}
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
