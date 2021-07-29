import * as React from 'react';
import { useState } from 'react';
import { Restaurants } from '../models/restaurant.model';
import { AllRestaurants, FeaturedRestaurants, SearchRestaurants } from './Restaurant';

export const App = () => {
  const { featuredRestaurants, restaurants }: Restaurants = require('../restaurants.json');

  const [search, setSearch] = useState('');
  const [priceRanges, setPriceRanges] = useState([]);

  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-light justify-content-between'>
        <a className='navbar-brand text-dark' href='#'>
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
            <a className='nav-item nav-link text-dark mr-2 ml-2' href='#'>
              Restaurants
            </a>
            <a className='nav-item nav-link text-dark mr-2 ml-2' href='#'>
              Surprise Me
            </a>
          </div>
        </div>
      </nav>

      <SearchRestaurants
        updateSearch={setSearch}
        updatePriceRanges={setPriceRanges}
      />

      <FeaturedRestaurants
        featuredRestaurants={featuredRestaurants}
        restaurants={restaurants}
      />

      <AllRestaurants
        restaurants={restaurants}
        filter={search}
        priceRanges={priceRanges}
      />
    </>
  );
}
