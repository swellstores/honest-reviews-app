import { ResultsResponse, Product as SwellProduct, Account as SwellAccount } from 'swell-js';

export interface ImageObject {
  file: {
    url: string;
  };
}

export interface ImageProps {
  width?: number;
  height?: number;
  padded?: boolean;
  anchor?: 'top' | 'bottom' | 'left' | 'right';
}

export interface Product extends SwellProduct {
  reviews?: ResultsResponse<Review>;
  featured_reviews?: ResultsResponse<Review>;
  $app: {
    [key: string]: any;
    honest_reviews?: {
      rating: number;
      review_count: number;
    };
  };
}

export interface Account extends SwellAccount {
  $app: {
    [key: string]: any;
    honest_reviews?: {
      name?: number;
      photo?: ImageObject;
      about?: string;
      review_count?: number;
    };
  };
  errors?: any;
}

export interface Review {
  id: string;
  title: string;
  body: string;
  product_id: string;
  rating: number;
  account: Account;
  comments: { results: Comment[]; count: number };
  date_created: string;
  reaction: {
    id: string;
    liked: boolean;
  };
}

export interface Comment {
  id: string;
  title: string;
  body: string;
  parent_id: string;
  product_id: string;
  account_id: string;
  rating: number;
  account: Account;
  date_created: string;
  reaction: {
    id: string;
    liked: boolean;
  };
}

export interface Reaction {
  id: string;
  parent_id: string;
  comment_id: string;
  liked: string;
  date_created: string;
  date_updated: string;
}
