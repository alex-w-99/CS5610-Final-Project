import React from 'react';
import './styles/index.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { findBusinessesThunk } from '../services/yelp/business-thunks.js';
import makeQuery from './helpers/make-query';

const SearchBar = () => {
 const [search, setSearch] = useState('');
 const [location, setLocation] = useState('');
 const navigate = useNavigate();
 const dispatch = useDispatch();
 const handleSubmit = (event) => {
   event.preventDefault();
   if (search.length === 0) {
     navigate('search/' + location);
   } else {
     navigate('search/' + search + '/' + location, true)
   }
   var newSearch;
   console.log("SEARCH: LOCATION IS " + location);
   if (location.length === 0) {
        console.log("SEARCH: location length is 0")
        if (search.length === 0) {
            console.log("And so is search");
            navigate('search/', true);
            return;
        } else {
            newSearch = makeQuery(search, "null");
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
//   dispatch(findBusinessesThunk(newSearch));
 }

 return(
     <div className="container">
         <form onSubmit={(event) => handleSubmit(event)} className="form-group mb-2 row">
             <div className="col-6 ps-3 pe-0">
                 <input type="text"
                        id="restaurant-search"
                        placeholder="Restaurant"
                        className="form-control"
                        onChange={(event) => setSearch(event.target.value)}/>
             </div>
             <div className="col-4 mb-0 ps-0 pe-0">
                 <input type="text"
                        id="location-search"
                        placeholder="Location"
                        className="form-control"
                        onChange={(event) => setLocation(event.target.value)}/>
             </div>
             <div className="col-2">
                 <button type="submit"
                         className="btn btn-danger m"
                         onClick={(event) => handleSubmit(event)}>
                     <i className="bi bi-search"/>
                 </button>
                 <img src="../../images/yelp-icon.jpg"
                      width={70}/>
             </div>
         </form>
     </div>
 )
};

export default SearchBar;