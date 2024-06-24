export interface Restaurant {
  id: number; // Assuming your Restaurant ID is of type Int in Prisma
  name: string;
  rating: number;
  diningRatings: number;
  deliveryRating: number;
  deliveryReviews: string;
  cuisines: string[];
  location: string;
  status: string;
  timing: string;
  safetyMeasures: string[];
  menu: MenuItem[]; // Assuming you have a one-to-many relationship between Restaurant and MenuItem
  knownFor: string[];
  averageCost: string;
  paymentMethods: string[];
  moreInfo: string[];
  images: Image[]; // Assuming you have a one-to-many relationship between Restaurant and Image for images
  menuPhotos: Image[]; // Assuming you have a one-to-many relationship between Restaurant and Image for menu photos
  reviews: Review[]; // Assuming you have a one-to-many relationship between Restaurant and Review
}

export interface MenuItem {
  id: number; // Assuming your MenuItem ID is of type Int in Prisma
  category: string;
  dishes: Dish[];
}
export interface Dish {
  id: number;
  name: string;
  price: number;
}

export interface Review {
  id: number; // Assuming your Review ID is of type Int in Prisma
  username: string;
  userReviews: number;
  userFollowers: number;
  rating: number;
  type: string;
  time: string;
  content?: string;
}

export interface Image {
  id: number; // Assuming your Image ID is of type Int in Prisma
  url: string;
  publicId: string;
}
export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  name: string;
  address: string; // Ensure 'address' is included
  role: string;
}
