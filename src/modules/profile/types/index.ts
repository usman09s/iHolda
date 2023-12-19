export type User = {
  _id: string;
  userName: string;
  firstName: string | null;
  lastName: string | null;
  photo: {
    mediaId: string;
    mediaType: string;
  } | null;
  followers: string[];
  following: string[];
  metCount: number;
  createdAt: string; // You might want to use a Date type here
};

export type Post = {
  _id: string;
  user: string;
  text: string | null;
  subText: string | null;
  media: {
    mediaType: string;
    mediaId: string;
  }[];
  mediaType: string | null;
  audio: string | null;
  thumbnail: string | null;
  visibility: string;
  hexCode: string | null;
  sharedPost: any; // You might want to define a type for sharedPost if it has a specific structure
  sharedBy: any; // You might want to define a type for sharedBy if it has a specific structure
  shareCount: number;
  bookmarkCount: number;
  comments: any[]; // You might want to define a type for comments if they have a specific structure
  likes: any[]; // You might want to define a type for likes if they have a specific structure
  taggedUsers: any[]; // You might want to define a type for taggedUsers if they have a specific structure
  userQuiz: any; // You might want to define a type for userQuiz if it has a specific structure
  met: any; // You might want to define a type for met if it has a specific structure
  rating: string;
  createdAt: string;
  updatedAt: string;
};

export type MoodObject = {
  user: User;
  mood: string | null;
};

export type UserMoment = {
  _id: string;
  users: MoodObject[];
  post: Post;
};
