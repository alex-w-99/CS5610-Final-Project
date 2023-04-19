import React from 'react';
import SearchBar from '../search-bar';
import ResultItem from './results-item';
import { useSelector } from 'react-redux';
import { findBusinessesThunk } from '../services/yelp/business-thunks'

const SearchComponent = () => {
//     const {query, location} = useParams();
     const { businesses, loading } = useSelector(state => state.businesses);

 console.log("SEARCH COMPONENT: Businesses are ")

 return(
    <>
    <h1>Yelp Search</h1>
    <ul>
    {
      loading &&
      <li className="list-group-item">
        Loading...
      </li>
    }
    {
      businesses.map(restaurant =>
        <li key={restaurant.id} className="list-group-item">
          <ResultItem restaurant={restaurant}/>
        </li>
      )
    }
    </ul>
    </>
 )
};

export default SearchComponent;