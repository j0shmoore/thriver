import * as React from 'react';
import { Restaurants } from '../models/restaurant.model';
import { AllRestaurants, FeaturedRestaurants } from './RestaurantCard';

export const App = () => {
  let { featuredRestaurants, restaurants }: Restaurants = require('../restaurants.json');
  console.log(featuredRestaurants);
  console.log(restaurants);

  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-light justify-content-between'>
        <a className='navbar-brand text-light' href='#'>
          Feed Me
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNavAltMarkup'
          aria-controls='navbarNavAltMarkup'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
          <div className='navbar-nav ml-auto'>
            <a className='nav-item nav-link text-light mr-2 ml-2' href='#'>
              Restaurants
            </a>
            <a className='nav-item nav-link text-light mr-2 ml-2' href='#'>
              Surprise Me
            </a>
          </div>
        </div>
      </nav>
      <FeaturedRestaurants
        featuredRestaurants={featuredRestaurants}
        restaurants={restaurants}
      />
      <AllRestaurants
        restaurants={restaurants}
      />
    </>
  );
}
