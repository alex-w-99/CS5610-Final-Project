import React from 'react';
import './styles/styles.css';
import Reviews from './reviews';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams, useNavigate } from 'react-router-dom';
import { findBusinessThunk } from
    '../services/yelp/business-thunks.js';
import { findRestaurantThunk, createRestaurantThunk }
    from '../services/site-db-restaurants/site-restaurants-thunks';

const DetailsComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { businessId } = useParams();
  const goBack = () => {
      navigate(-1);
  }
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
       <div className="cw-banner-box mb-2">
               <div id="top-bar" className="row">
                   <div className="col-1 wd-back-button">
                       <i className="text-dark bi bi-arrow-left me-5"
                                       onClick={goBack}>
                       </i>
                   </div>
                    <div className="col-11">
                        <p>{restaurant.name}</p>
                   </div>
               </div>
               <div id="ratings-summary-banner"
                    className="row">
                   <div className="col-5 d-md-block d-none">
                     <img src={restaurant.image_url} id="restaurant-pic"/>
                   </div>
                   <div className="col-7">
                     <div className="cw-rating-category">
                       <i className="bi bi-person text-primary"/> User Rating: {restaurant
                       .userRating

                       == -1 ?
                       `N/A`
                       :
                       `{restaurant.userRating} / 5`
                       }
                     </div>
                   <div className="cw-rating-category mb-4">
                      <i className="bi bi-star-fill text-warning"/> Critic Rating: {restaurant
                      .criticRating == -1 ?
                      `N/A`
                      :
                      `{restaurant.criticRating} / 5`
                      }
                   </div>
                 </div>
                 <div className="d-md-none d-sm-block mt-2 mb-2">
                    <img src={restaurant.image_url}
                         className="d-block d-md-none rounded-circle"
                         width={250}
                         height={250}/>
                 </div>
               </div>
           </div>
          <div id="profile-info"
                className="mb-2">
                  <div className="fw-bolder" id="restaurant-name">
                      {restaurant.name}
                  </div>
                  {/*
                  RATINGS
                  */}
                  <div className="mt-3">
                      <span className="me-3"> {restaurant.address}</span>
                      <span className="me-3"><i className="bi bi-pin-map"></i> {restaurant
                      .city}, {restaurant.state == undefined ? `` : `${restaurant.state}, `}
                      {restaurant
                      .country}</span>
                      {
                          restaurant.website == "" ?
                          ``
                          :
                          `
                          <div className="me-3"><i className="bi bi-laptop"></i> Website:
                          {restaurant.website}</span>`
                      }
                      {
                          restaurant.phone == "" ?
                          ``
                          :
                          `<div className="me-3"><i className="bi bi-telephone"></i> Phone:
                          {restaurant.phone}</div>`
                      }
                  </div>

              </div>
          <Reviews/>
       </>
    }
    </>
 )
}
export default DetailsComponent;

