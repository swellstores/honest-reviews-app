import { useState } from 'react';
import Link from 'next/link';

import { StarsInput } from '@/app/components/icons/stars';
import { useSwellContext, Product, callAppFunction } from '@/app/swell';

export default function ReviewForm({ product }: { product: Product }) {
  const { account } = useSwellContext();
  const [formData, setFormData] = useState({ title: '', body: '', rating: 5 });
  const [showForm, setShowForm] = useState(false);

  const onChange = (event: React.ChangeEvent<any>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const onChangeRating = (rating: number) => {
    setFormData((prevFormData) => ({ ...prevFormData, rating }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await callAppFunction('post', 'create-review', {
        ...formData,
        product_id: product.id,
      });
      window.location.href = '/review-submitted';
    } catch (err: any) {
      console.log(err);
      alert(err.message);
    }
  };

  const onClickShowForm = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setShowForm(true);
  };

  const onClickHideForm = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setShowForm(false);
  };

  return (
    <form onSubmit={onSubmit} className="mt-6">
      {!account ? (
        <div>
          <Link href="/login" className="text-indigo-600">
            Log in
          </Link>{' '}
          or{' '}
          <Link href="/signup" className="text-indigo-600">
            sign up
          </Link>{' '}
          to submit a review.
        </div>
      ) : !showForm ? (
        <a
          href=""
          onClick={onClickShowForm}
          className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
        >
          Write a review
        </a>
      ) : (
        <div className="mt-6">
          <h2 className="text-lg font-medium text-gray-900">Write a review</h2>

          <div className="mt-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Review title
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="title"
                name="title"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={formData.title}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="comment" className="block text-sm font-medium leading-6 text-gray-900">
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

          <div className="mt-6">
            <label htmlFor="rating" className="block text-sm font-medium leading-6 text-gray-900">
              Your rating
            </label>
            <div className="mt-2">
              <StarsInput onChange={onChangeRating} />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <a
              href=""
              onClick={onClickHideForm}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </a>
            <button
              type="submit"
              className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit Review
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
