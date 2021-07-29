import * as React from 'react';
import { Restaurant, Restaurants } from '../models/restaurant.model';

export const RestaurantCard = ({ name, imageSmallUrl, description, priceRange }: Partial<Restaurant>): JSX.Element => {
  return (
    <div className='col'>
      <div className='card' style={{ width: '18rem'}}>
        <img src={imageSmallUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Name {name} - {formatPriceRange(priceRange)}</h5>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </div>
  );
}

const formatPriceRange = (priceRange: number) => {
  let rangeString = '$';
  for (let i = 0; i < priceRange; i++) {
    rangeString = `${rangeString}$`;
  }
  return rangeString;
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
        priceRange={restaurant.priceRange}
      />
    ))
    // Take first 3
    .slice(0, 3);

  return (
    <>
      <h2>Featured</h2>
      <div className='card-group'>
        {featuredCards}
      </div>
    </>
  );
}


/**
 * Generates and renders all restaurants
 * @param restaurants 
 */
export const AllRestaurants = ({ restaurants, filter, priceRanges }: Partial<Restaurants> & { filter: string; priceRanges: number[]; }) => {
  const restaurantCards = restaurants
    .filter(restaurant => filter !== '' ? restaurant.name.toLowerCase().includes(filter.toLowerCase()) : true)
    .filter(restaurant => priceRanges.length > 0 ? priceRanges.includes(restaurant.priceRange) : true)
    .map(restaurant => (
      <RestaurantCard
        key={restaurant.id}
        name={restaurant.name}
        imageSmallUrl={restaurant.imageSmallUrl}
        description={restaurant.description}
        priceRange={restaurant.priceRange}
      />
    ));

  return (
    <>
      <h2>All Restaurants</h2>
      <div className='row row-cols-1 row-cols-md-2 g-4'>
        {restaurantCards}
      </div>
    </>
  )
}

interface SearchProps {
  updateSearch: (searchText: string) => void;
  updatePriceRanges: (priceRanges: number[]) => void;
}

export const SearchRestaurants = ({ updateSearch, updatePriceRanges }: SearchProps) => {
  const [search, setSearch] = React.useState('');
  const [priceRanges, setPriceRanges] = React.useState([]);

  const handleUpdateSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
    updateSearch(event.target.value);
  };

  const handleUpdatePriceRanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    const priceRange = parseInt(event.target.value);
    if (event.target.checked) {
      setPriceRanges([...priceRanges, priceRange]);
      updatePriceRanges([...priceRanges, priceRange]);
    }
    else {
      setPriceRanges(priceRanges.filter(range => range !== priceRange));
      updatePriceRanges(priceRanges.filter(range => range !== priceRange));
    }
  };

  return (
    <div className='input-group mb-3'>
      <input type='text' className='form-control' placeholder='Search' aria-label='Search' value={search} onChange={handleUpdateSearch} />
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value="0" id="0" onChange={handleUpdatePriceRanges} />
        <label className="form-check-label" htmlFor="0">
          $
        </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value="1" id="1" onChange={handleUpdatePriceRanges} />
        <label className="form-check-label" htmlFor="1">
          $$
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value="2"
          id="2"
          onChange={handleUpdatePriceRanges}
        />
        <label className="form-check-label" htmlFor="2">
          $$$
        </label>
      </div>
    </div>
  );
}
