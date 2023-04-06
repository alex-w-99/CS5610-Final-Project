import React from 'react';
import SearchBar from '../search-bar';
import {useParams} from 'react-router-dom';

const SearchComponent = () => {
 const {query} = useParams();
 return(
    <>
        {console.log("In search component query is " + query)}
        {query}
    </>
 )
};

export default SearchComponent;