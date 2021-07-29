import * as React from 'react';
import { Restaurant, Restaurants } from '../models/restaurant.model';

export const RestaurantCard = ({ name, imageSmallUrl, description}: Partial<Restaurant>): JSX.Element => {
  return (
    <div className='col'>
      <div className='card' style={{ width: '18rem'}}>
        <img src={imageSmallUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Name {name}</h5>
          <p className="card-text">{description}</p>
        </div>
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
  console.log(`all rest: ${filter}`);
  const restaurantCards = restaurants
    .filter(restaurant => filter !== '' ? restaurant.name.toLowerCase().includes(filter.toLowerCase()) : true)
    // .filter(restaurant => priceRanges && priceRanges.includes(restaurant.priceRange))
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
    console.log(event.target.value);
    setSearch(event.target.value)
    updateSearch(event.target.value);
  };

  const handleUpdatePriceRanges = () => {
    updatePriceRanges(priceRanges);
  };

  return (
    <div className="input-group mb-3">
      <input type="text" className="form-control" placeholder="Search" aria-label="Search" value={search} onChange={handleUpdateSearch} />
    </div>
  );
}
