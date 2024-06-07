export interface Restaurant {
  name: string;
  rating: number;
  diningRatings: number;
  deliveryRating: number;
  deliveryReviews: string;
  cuisine: string[];
  location: string;
  status: string;
  timing: string;
  safetyMeasures: string[];
  menu: menuItem[];
  cuisines: string[];
  knownFor: string[];
  averageCost: string;
  paymentMethods: string[];
  moreInfo: string[];
  images: string[];
  menuPhotos: string[];
}
export interface menuItem {
  category: string;
  dishes: string[];
}
