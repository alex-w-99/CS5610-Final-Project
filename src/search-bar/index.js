/* this is where I should add the filters as an object */

import React from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import makeQuery from "./makeQuery";

const SearchBar = () => {
 const [search, setSearch] = useState('');
 const [location, setLocation] = useState('');
 const navigate = useNavigate();

 const handleSubmit = (event) => {
   if (search === '') {
       return;
   }
   event.preventDefault();
   const newSearch = makeQuery(search, location);
   setSearch(newSearch);
   console.log("Before navigate, search is " + newSearch);
   navigate('search/' + newSearch, true);
   console.log("Made it back from the navigate");
   setSearch('');
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