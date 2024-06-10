// src/types/restaurant.ts

export interface Restaurant {
  id: number;
  name: string;
  rating: number;
  diningRatings: number;
  deliveryRating: number;
  deliveryReviews: string;
  location: string;
  status: string;
  timing: string;
  safetyMeasures: string[];
  cuisines: { name: string }[];
  knownFor: string[];
  averageCost: string;
  paymentMethods: string[];
  moreInfo: string[];
  images: string[];
  menuPhotos: string[];
  menu: MenuItem[];
}

export interface MenuItem {
  id: number;
  category: string;
  dishes: Dish[];
}

export interface Dish {
  id: number;
  name: string;
  menuCategoryId: number;
}
