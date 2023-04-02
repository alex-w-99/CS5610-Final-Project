import React from 'react';

const SearchBar = () => {
 return(
    <form className="mb-2">
                <i className="bi bi-search me-1"/>
                <input type="text"
                       placeholder="Search"/>
    </form>
 )
};

export default SearchBar;