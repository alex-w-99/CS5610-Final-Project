import React from 'react';
import SearchBar from '../search-bar';
import {useSelector} from 'react-redux';
import {findBusinessesThunk}
  from "../services/business-thunks"

const SearchComponent = () => {
//     const {query, location} = useParams();
     const {businesses, loading} = useSelector(state => state.businesses);

 console.log("SEARCH COMPONENT: Businesses are ")
 return(
    <>
    <h1>Yelp Search</h1>
        <pre>{/*JSON.stringify(results, null, 2)*/}</pre>
    </>
 )
};

export default SearchComponent;