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
  media: string[];
  mediaType: string;
  audio: string | null;
  userQuiz?: any;
  thumbnail: string | null;
  visibility: string;
  hexCode: string | null;
  sharedPost: string | null;
  sharedBy: string | null;
  comments: any[]; // You might want to define a type for comments
  likes: any[]; // You might want to define a type for likes
  taggedUsers: any[]; // You might want to define a type for tagged users
  met: string;
  createdAt: string; // You might want to use a Date type here
  updatedAt: string; // You might want to use a Date type here
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
