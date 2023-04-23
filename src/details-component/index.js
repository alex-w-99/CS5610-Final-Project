import React from 'react';
import Reviews from './reviews';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { findBusinessThunk } from
    '../services/yelp/business-thunks.js';
import { findRestaurantThunk, createRestaurantThunk }
    from '../services/site-db-restaurants/site-restaurants-thunks';

const DetailsComponent = () => {
  const dispatch = useDispatch();
  const { businessId } = useParams();
  useEffect(() => {
          dispatch(findRestaurantThunk({dispatch, businessId}));
     }, []);
  let { restaurant, loading } = useSelector(state => state.siteRestaurant)
  const { status } = useSelector(state => state.oneBusiness);
  console.log("FROM DETAILS SCREEN: RESTAURANT IS " + JSON.stringify(restaurant));
 return(
    <>
    {
      loading &&
      <h1> Loading.. </h1>
    }
    {
      status == 404 &&
      <h1> No businesses found with specified id </h1>
    }
    {
      status == 200 &&
      !loading &&
       <>
          <img src={restaurant.image_url}
               width={500}/>
          <h1> {restaurant.name} </h1>
          <h2> {restaurant.address}</h2>
          <Reviews/>
       </>
    }
    </>
 )
}
export default DetailsComponent;

