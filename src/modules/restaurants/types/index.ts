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
  contact?: string;
}
