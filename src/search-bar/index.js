/* this is where I should add the filters as an object */

import React from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { findBusinessesThunk, initializeLocation} from '../services/business-thunks';
import makeQuery from "./makeQuery";

const SearchBar = () => {
 const [search, setSearch] = useState('');
 const [location, setLocation] = useState('null');
 const navigate = useNavigate();
 const dispatch = useDispatch();
 initializeLocation();

 const handleSubmit = (event) => {
   if (search === '') {
       return;
   }
   event.preventDefault();
   var newSearch;
   if (location.length === 0) {
        newSearch = makeQuery(search, "null");
   } else {
        newSearch = makeQuery(search, location);
   }
   console.log("SEARCH BAR: LOCATION IS " + location);
   navigate('search/' + newSearch.query + '/' + newSearch.location, true);
//    useEffect(() => {
    console.log("Calling the thunk with location " + location);
       dispatch(findBusinessesThunk(newSearch))
//    }, [])
   console.log("Reset search");
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