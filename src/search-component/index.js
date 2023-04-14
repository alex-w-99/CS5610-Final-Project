import React from 'react';
import SearchBar from '../search-bar';
import {useSelector} from 'react-redux';
import {findBusinessesThunk}
  from "../services/business-thunks"
import ResultItem from "./results-item";

const SearchComponent = () => {
//     const {query, location} = useParams();
     const {businesses, loading} = useSelector(state => state.businesses);

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
          {console.log("Here's what we're passing to function: " + restaurant.id)}
          <ResultItem restaurant={restaurant}/>
        </li>
      )
    }
    </ul>
    </>
 )
};

export default SearchComponent;