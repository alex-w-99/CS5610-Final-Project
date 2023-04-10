/* this is where I should add the filters as an object */

import React from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import makeQuery from "./makeQuery";

const SearchBar = () => {
 const [search, setSearch] = useState('');
 const navigate = useNavigate();

 const handleSubmit = (event) => {
   if (search == '') {
       return;
   }
   event.preventDefault();
   const newSearch = makeQuery(search);
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
                       id="user-search"
                       placeholder="Search"
                       onChange={(event) => setSearch(event.target.value)}/>
               <button type="submit"
                       className="btn btn-primary"
                       onClick={(event) => handleSubmit(event)}>
                    <i className="bi bi-search me-1"/>
               </button>
    </form>
 )
};

export default SearchBar;