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
      businesses.map(business =>
        <li key={business.id} className="list-group-item">
          <ResultItem restaurant={business}/>
        </li>
      )
    }
    </ul>
    </>
 )
};

export default SearchComponent;