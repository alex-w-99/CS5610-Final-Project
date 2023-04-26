import React from 'react';
import './styles/index.css'
import SearchBar from '../search-bar';
import ResultItem from './results-item';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { findBusinessesThunk } from '../services/yelp/business-thunks.js';
import "../utils/loading-spinner.css";

const SearchComponent = () => {
    const { businesses, loading, status } = useSelector(state => state.businesses);
    const {query, location} = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(findBusinessesThunk({query, location}));
        }, [query, location]);
    const apostrophe = '\u0027';

    if (query === undefined && location === undefined) {
        return (
            <>
            </>
        );
    }
    return(
        <>
            {
                status === 404 &&
                !loading &&
                <h1 className = 'cw-error-box'>
                    Yelp couldn{apostrophe}t find a location to match your search.
                </h1>
            }

            {
                status !== 404 &&
                <>
                    <h1 id="results-heading">Your Results</h1>
                    <ul className="ps-0"
                        id="result-item-list">
                        {
                            loading &&
                            <li className="list-group-item">
                                <div className="spinner">
                                </div>
                            </li>
                        }
                        {
                            !loading &&
                            businesses &&
                            businesses.map(restaurant =>
                                               <li key={restaurant._id} className="list-group-item">
                                                   <ResultItem restaurant={restaurant}/>
                                               </li>
                            )
                        }
                    </ul>
                </>
            }
        </>
    )
};

export default SearchComponent;
