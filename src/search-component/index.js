import React from 'react';
import SearchBar from '../search-bar';
import {useParams} from 'react-router-dom';
import {getBusinesses} from '../services/yelp-service.js';

const SearchComponent = () => {
 const {query} = useParams();
 const businesses = getBusinesses(query);
 console.log(businesses);
 return(
    <>
    <h1>Yelp Search</h1>
        {query}

        <pre>{/*JSON.stringify(results, null, 2)*/}</pre>
    </>
 )
};

export default SearchComponent;