/* this is where I should add the filters as an object */

import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { findBusinessesThunk } from '../services/yelp/business-thunks';
import makeQuery from "./makeQuery";

const SearchBar = () => {
 const [search, setSearch] = useState('');
 const [location, setLocation] = useState('');
 const navigate = useNavigate();
 const dispatch = useDispatch();
// initializeLocation();

 const handleSubmit = (event) => {
   event.preventDefault();
   var newSearch;
   console.log("SEARCH: LOCATION IS " + location);
   if (location.length === 0) {
        console.log("SEARCH: location length is 0")
        newSearch = makeQuery(search, "null");
        if (search.length === 0) {
            console.log("And so is search");
            navigate('search/', true);
            return;
        } else {
            navigate('search/' + newSearch.query, true);
        }
   } else {
        if (search.length === 0) {
            console.log("Search length is 0");
            newSearch = makeQuery("restaurants", location);
            navigate('search/restaurants/' + newSearch.location, true);
        } else {
            newSearch = makeQuery(search, location);
            navigate('search/' + newSearch.query + '/' + newSearch.location, true);
        }
   }
//   console.log("SEARCH BAR: LOCATION IS " + location);
//    useEffect(() => {
//    console.log("Calling the thunk with location " + location);
   dispatch(findBusinessesThunk(newSearch))
//    }, [])
//   console.log("Reset search");
 }

 return(
    <form onSubmit={(event) => handleSubmit(event)} className="mb-2">
                <input type="text"
                       id="restaurant-search"
                       placeholder="Search Restaurants"
                       onChange={(event) => setSearch(event.target.value)}/>
               <input type="text"
                      id="location-search"
                      placeholder="Location"
                      onChange={(event) => setLocation(event.target.value)}/>
               <button type="submit"
                       className="btn btn-primary"
                       onClick={(event) => handleSubmit(event)}>
                    <i className="bi bi-search me-1"/>
               </button>
    </form>
 )
};

export default SearchBar;