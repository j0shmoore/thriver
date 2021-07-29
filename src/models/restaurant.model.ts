export interface Restaurants {
  featuredRestaurants: FeaturedRestaurant[];
  restaurants: Restaurant[];
}

export interface FeaturedRestaurant {
  discount: number;
  restaurantId: string;
}

export interface Restaurant {
  description: string;
  id: string;
  imageSmallUrl: string;
  imageSrc: string;
  menu: MenuItem[];
  name: string;
  priceRange: number;
}

export interface MenuItem {
  name: string;
  price: number;
}

export interface Card {

}