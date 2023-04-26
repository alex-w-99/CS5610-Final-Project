import React from 'react';
import './styles/styles.css';
import Reviews from './reviews';
import Rating from './ratings';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { findRestaurantThunk } from '../services/site-db-restaurants/site-restaurants-thunks';
import "../utils/loading-spinner.css";
import { updateUserThunk } from '../services/users-thunks.js';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { Link } from 'react-router-dom';
//import { findBusinessThunk } from '../services/yelp/business-thunks.js';

const DetailsComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { businessId } = useParams();
    const { currentUser } = useSelector(state => state.users);

    //console.log("INDEX: currentUser is now " + JSON.stringify(currentUser))
    const goBack = () => { navigate(-1); }

    useEffect(
        () => {
            dispatch(findRestaurantThunk({dispatch, businessId}));
            },
        []
    );

    let { restaurant, loading } = useSelector(state => state.siteRestaurant)
    let bookmarkBool = false;
    if (restaurant && currentUser) {
        bookmarkBool = (currentUser.bookmarks.filter(e => e == restaurant.yelpId)
                            .length > 0);
    }
    //console.log("Bookmarkbool set to " + bookmarkBool);
    //console.log(currentUser.bookmarks.filter(e => e == restaurant.yelpId).length);

    const [bookmarked, setBookmarked] = useState(bookmarkBool);
    useEffect(
        () => {
            setBookmarked(bookmarkBool);
            },
        [bookmarkBool]
    );

    const { status } = useSelector(state => state.oneBusiness);
    // onBookmark handles when "Bookmark" button is clicked:
    const onBookmark = () => {
        if (gatekeep()) {
            return;
        }
        let userBookmarks = [];
        if (Array.isArray(currentUser.bookmarks)) {
            userBookmarks = JSON.parse(JSON.stringify(currentUser.bookmarks));
        }
        userBookmarks.push(restaurant.yelpId);
        dispatch(updateUserThunk(
            {
                ...currentUser,
                bookmarks: userBookmarks
            })
        );
        console.log("Bookmarks are" + currentUser.bookmarks);
        setBookmarked(true);
    };

    // onUnBookmark handles when "Un-Bookmark" button is clicked:
    const onUnBookmark = () => {
        let userBookmarks = JSON.parse(JSON.stringify(currentUser.bookmarks));
        userBookmarks = userBookmarks.filter(e => e != restaurant.yelpId);
        dispatch(updateUserThunk(
            {
                ...currentUser,
                bookmarks: userBookmarks
            })
        );
        setBookmarked(false);
    };
    let mode = "PERSONAL";
    if (currentUser) {
        mode = currentUser.userType;
    }

    const gatekeep = () => {
        if (!currentUser) {
            navigate('/login');
            return true;
        }
        else {
            return false;
        }
    }

    // RETURN VALUE:
    return(
        <>
            {
                loading &&
                <div className="spinner">
                </div>
            }
            {
                status === 404 &&
                <h1> No businesses found with specified id </h1>
            }
            {
                status === 200 &&
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

                                                                                             === -1 ?
                                                                                             `N/A`
                                                                                                    :
                                                                                             `${restaurant.userRating} / 5`
                                }
                                </div>
                                <div className="cw-rating-category mb-4">
                                    <i className="bi bi-star-fill text-warning"/> Critic Rating: {restaurant
                                                                                                      .criticRating === -1 ?
                                                                                                  `N/A`
                                                                                                                           :
                                                                                                  `${restaurant.criticRating} / 5`
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

                        <div className="mt-2 mb-2">
                            {
                                !bookmarked &&
                                <button className="btn btn-lg btn-primary"
                                        id="bookmark-button"
                                        onClick={() => onBookmark()}>
                                    Bookmark
                                </button>
                            }
                            {
                                bookmarked &&
                                <button className="btn btn-lg btn-success"
                                        id="bookmark-button"
                                        onClick={() => onUnBookmark()}>
                                    Un-Bookmark
                                </button>
                            }
                        </div>
                        {/*
                  RATINGS
                  */}
                        <div className="mt-3">
                            <span className="me-3"> {restaurant.address}</span>
                            <span className="me-3"><i className="bi bi-pin-map"></i> {restaurant
                                .city}, {restaurant.state === undefined ? `` : `${restaurant.state}, `}
                                {restaurant
                                    .country}</span>
                            {
                                restaurant.website === "" ?
                                ``
                                                          :
                                `
                          <div className="me-3"><i className="bi bi-laptop"></i> Website:
                          {restaurant.website}</span>`
                            }
                            {
                                restaurant.phone === "" ?
                                ``
                                                        :
                                `<div className="me-3"><i className="bi bi-telephone"></i> Phone:
                          {restaurant.phone}</div>`
                            }
                        </div>
                    </div>
                    { /* don't let businesses rate other businesses */
                        mode !== "RESTAURANT" &&
                        <Rating/>
                    }
                    <Reviews/>
                </>
            }
        </>
    )
}
export default DetailsComponent;

