import React from 'react';
import './styles/index.css'
import SearchBar from '../search-bar';
import ResultItem from './results-item';
import { useSelector } from 'react-redux';

const SearchComponent = () => {
 const { businesses, loading } = useSelector(state => state.businesses);
 return(
    <>
    <h1>Your Results</h1>
    <ul className="ps-0"
        id="result-item-list">
    {
      loading &&
      <li className="list-group-item">
        Loading...
      </li>
    }
    {
      businesses.map(restaurant =>
        <li key={restaurant.id} className="list-group-item">
          <ResultItem restaurant={restaurant}/>
        </li>
      )
    }
    </ul>
    </>
 )
};

export default SearchComponent;