import React from 'react';
import SearchBar from '../search-bar';
import {useParams} from 'react-router-dom';
import {useState} from 'react';
import {getByLocation, getByCoordinates} from '../services/yelp-service.js';

const SearchComponent = () => {
 const {query, location} = useParams();
 const [businesses, setBusinesses] = useState(null);
 if (location == "null") {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
             const longitude = position.coords.longitude;
             const latitude = position.coords.latitude;
             setBusinesses(getByCoordinates(query, longitude, latitude));
             console.log("longitude is " + longitude);
         });
    } else {
        setBusinesses(getByLocation(query, "Boston"));
    }
 } else {
        setBusinesses(getByLocation(query, location));
 }
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