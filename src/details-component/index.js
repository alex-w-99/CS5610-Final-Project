import React from 'react';
import Reviews from './reviews';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { findRestaurantThunk, createRestaurantThunk }
    from '../services/site-db-restaurants/site-restaurants-thunks';

const DetailsComponent = () => {
    const dispatch = useDispatch();
    useEffect(() => {
//        console.log("IN USE EFFECT: CALLING CLEANUP");
        dispatch(findRestaurantThunk({dispatch, business}));
    }, []);
    const { businessId } = useParams();
    const { businesses } = useSelector(state => state.businesses);
//    console.log("AFTER USE SELECTOR, BUSINESSES ARE " + JSON.stringify(businesses));
    const business = businesses.find(business => business.id == businessId);
//    console.log("FOUND THE BUSINESS" + JSON.stringify(business));
//    dispatch(findRestaurantThunk(business));
    let { restaurant, loading } = useSelector(state => state.siteRestaurant)
    console.log("FROM DETAILS SCREEN: RESTAURANT IS " + JSON.stringify(restaurant));
    if (!loading) {
        return (
          <>
            <img src={restaurant.image_url}
                 width={100}
                 height={100}/>
            <h1> {restaurant.name} </h1>
            <h2> {restaurant.address}</h2>
            <Reviews/>
         </>
        )
    }
    return (
         <h1> Loading.. </h1>
    );
 };
export default DetailsComponent;

