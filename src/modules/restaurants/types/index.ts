import { Post } from "modules/profile/types";

export interface Restaurant {
  _id: string;
  merchant: string;
  name: string;
  description: string;
  coverImage: {
    mediaType: string;
    mediaId: string;
  };
  photos: {
    mediaType: string;
    mediaId: string;
  }[];
  opening: {
    days: string[];
    from: string;
    to: string;
  };
  address: string;
  location: {
    type: string;
    coordinates: [number, number]; // Tuple type for coordinates
  };
  menu: string[];
  qrCode: string;
  averageRating: number;
  ratingCount: number;
  createdAt: string;
  updatedAt: string;
  phone?: string;
}

type User = {
  _id: string;
  userName: string;
  firstName: string;
  lastName: string | null;
  photo: {
      mediaType: string;
      mediaId: string;
  };
  followers: string[];
  following: string[];
};

export type Review = {
  _id: string;
  star: number;
  description: string;
  by: User;
  to: string;
  post: Post;
  categories: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
};