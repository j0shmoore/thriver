import * as React from 'react';
import { Restaurant, Restaurants } from '../models/restaurant.model';

export const RestaurantCard = ({ name, imageSmallUrl, description}: Partial<Restaurant>): JSX.Element => {
  return (
    <div className='card' style={{ width: '18rem'}}>
      <img src={imageSmallUrl} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">Name {name}</h5>
        <p className="card-text">{description}</p>
      </div>
    </div>
  );
}

/**
 * Generates and renders featured restaurant list
 * @param {Restaurants} restaurants - The json file converted object
 * @param {Restaurant[]} restaurants.restaurants
 * @param {FeaturedRestaurant[]} restaurants.featuredRestaurants
 */
export const FeaturedRestaurants = ({ restaurants, featuredRestaurants }: Restaurants): JSX.Element => {
  const featuredCards = restaurants
    .filter(restaurant => 
      // First featured restaurantId was a number and didn't exist
      featuredRestaurants.some(({ restaurantId }) => `${restaurantId}` === restaurant.id)
    )
    .map(restaurant => (
      <RestaurantCard
        key={restaurant.id}
        name={restaurant.name}
        imageSmallUrl={restaurant.imageSmallUrl}
        description={restaurant.description}
      />
    ));

  return (
    <>
      <h2>Featured</h2>
      {featuredCards}
    </>
  );
}


/**
 * Generates and renders all restaurants
 * @param restaurants 
 */
export const AllRestaurants = ({ restaurants }: Partial<Restaurants>) => {
  const restaurantCards = restaurants.map(restaurant => (
    <RestaurantCard
      key={restaurant.id}
      name={restaurant.name}
      imageSmallUrl={restaurant.imageSmallUrl}
      description={restaurant.description}
    />
  ));
  return (
    <>
      <h2>All Restaurants</h2>
      {restaurantCards}
    </>
  )
}