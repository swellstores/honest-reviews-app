import { useState } from 'react';

import { Review, callAppFunction } from '@/app/swell';

export default function CommentForm({
  review,
  setShowCommentForm,
  onClickToggleCommentForm,
}: {
  review: Review;
  setShowCommentForm: (showCommentForm: boolean) => void;
  onClickToggleCommentForm: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const [formData, setFormData] = useState({ body: '' });
  const [newComment, setNewComment] = useState<any>(null);

  const onChange = (event: React.ChangeEvent<any>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await callAppFunction('post', 'create-comment', {
        ...formData,
        review_id: review.id,
      });
      if (!result.errors) {
        setNewComment(result);
        setShowCommentForm(false);
      }
    } catch (err: any) {
      console.log(err);
      alert(err.message);
    }
  };

  return (
    <form onSubmit={onSubmit} className="mb-10">
      {newComment ? (
        <div>You comment has been submitted.</div>
      ) : (
        <>
          <div>
            <div className="mt-6">
              <label
                htmlFor="comment"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Add your comment
              </label>
              <div className="mt-2">
                <textarea
                  rows={4}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  name="body"
                  value={formData.body}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <a
              href=""
              onClick={onClickToggleCommentForm}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </a>
            <button
              type="submit"
              className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit comment
            </button>
          </div>
        </>
      )}
    </form>
  );
}
