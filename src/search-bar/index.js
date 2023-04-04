/* this is where I should add the filters as an object */

import React from 'react';
import {useState} from 'react';
import {Redirect} from 'react-router-dom';

const SearchBar = () => {
 const [search, setSearch] = useState('');

 const handleSubmit = () => {
   const searchUrl = makeQuery(search);
   <Redirect to=searchUrl/>
 }

 return(
    <form onSubmit={handleSubmit} className="mb-2">
                <input type="text"
                       id="user-search"
                       placeholder="Search"
                       onChange={(event) => setSearch(event.target.value)}/>
               <button type="submit"
                       className="btn btn-primary"
                       onClick={handleSubmit}>
                    <i className="bi bi-search me-1"/>
               </button>
    </form>
 )
};

export default SearchBar;