export interface Restaurant {
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
  menu: MenuItem[];
  knownFor: string[];
  averageCost: string;
  paymentMethods: string[];
  moreInfo: string[];
  images: string[];
  menuPhotos: string[];
  reviews: Review[];
}

export interface MenuItem {
  category: string;
  dishes: string[];
}

export interface Review {
  username: string;
  userReviews: number;
  userFollowers: number;
  rating: number;
  type: string;
  time: string;
  content?: string;
}
