import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createRatingThunk, updateRatingThunk, findRatingThunk,
         updateRestaurantThunk }
    from '../../services/site-db-restaurants/site-restaurants-thunks';
import calcNewRating from './helpers/average.js';

/* LEFT OFF: For some reason put is throwing an error on update
 * I want to check what exactly I'm passing to it
 * Looks like the conditional gets procc'd after onstarclick calls the state function */


const Ratings = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { restaurant } =
            useSelector(state => state.siteRestaurant);
   const { currentUser } =
            useSelector(state => state.users)
   const { rating, updating } =
            useSelector(state => state.ratings);
   let userId = -1;
   if (currentUser) {
       userId = currentUser._id;
   }
   let restaurantId = restaurant._id;
   useEffect(() => {
       dispatch(findRatingThunk({restaurantId, userId}));
   }, [])

   console.log("TOP OF INDEX: RATING IS " + JSON.stringify(rating));
   let score = 0;
   if (rating.score != {}) {
       score = rating.score;
   }
   const [currRating, setCurrRating] = useState(score);
   /* don't let user do this without logging in */
   const gatekeep = () => {
     if (!currentUser) {
        navigate('/login');
        return true;
     }
     return false;
   }
   const OnStarClick = (stars) => {
       if (gatekeep()) {
          return;
       }
       console.log("Curr rating is " + JSON.stringify(rating))
       if (JSON.stringify(rating) != '{}') {
           dispatch(updateRatingThunk({
             ...rating,
             score: stars
           }))
           oldScoreEntry(stars);
       } else {
         dispatch(createRatingThunk({
             restaurantId: restaurant._id,
             userId: currentUser._id,
             isCritic: currentUser.userType == "CRITIC",
             score: stars
         }))
         newScoreEntry(stars);
       }
       setCurrRating(stars);
    }

   const oldScoreEntry = (stars) => {
     if (currentUser.userType == "CRITIC") {
        console.log("Old rating, curr score: " + restaurant.criticRating);
        console.log("Curr ratings: " + restaurant.criticRatingCount)
        let newScore = calcNewRating(rating.score, stars, restaurant.criticRating,
              restaurant.criticRatingCount);
        dispatch(updateRestaurantThunk({
          ...restaurant,
          criticRating: newScore.toFixed(1)
        }))
     } else {
        let newScore = calcNewRating(rating.score, stars, restaurant.userRating,
              restaurant.userRatingCount);
        dispatch(updateRestaurantThunk({
          ...restaurant,
          userRating: newScore.toFixed(1)
        }))
     }
   }

   const newScoreEntry = (stars) => {
       if (currentUser.userType == "CRITIC") {
         let newScore = calcNewRating(null, stars, restaurant.criticRating,
               restaurant.criticRatingCount);
         dispatch(updateRestaurantThunk({
           ...restaurant,
           criticRating: newScore.toFixed(1),
           criticRatingCount: restaurant.criticRatingCount + 1
         }))
       } else {
         let newScore =
            calcNewRating(null, stars, restaurant.userRating,
                   restaurant.userRatingCount);
         dispatch(updateRestaurantThunk({
           ...restaurant,
           userRating: newScore.toFixed(1),
           userRatingCount: restaurant.userRatingCount + 1
         }))
      }
   }
   return (
   <>
    {
      !updating &&
      <div className="mb-2">
        <span className="fw-bold"> Rate {restaurant.name}: </span>
        <i className={currRating >= 1 ? "bi bi-star-fill text-warning"
                       :  "bi bi-star-fill text-secondary"}
           onClick={() => OnStarClick(1)}></i>
        <i className={currRating >= 2 ? "bi bi-star-fill text-warning"
                                   :  "bi bi-star-fill text-secondary"}
           onClick={() => OnStarClick(2)}></i>
        <i className={currRating >= 3 ? "bi bi-star-fill text-warning"
                                   :  "bi bi-star-fill text-secondary"}
           onClick={() => OnStarClick(3)}></i>
        <i className={currRating >= 4 ? "bi bi-star-fill text-warning"
                                         :  "bi bi-star-fill text-secondary"}
                 onClick={() => OnStarClick(4)}></i>
        <i className={currRating >= 5 ? "bi bi-star-fill text-warning"
                                   :  "bi bi-star-fill text-secondary"}
           onClick={() => OnStarClick(5)}></i>
       </div>
     }
     {
       updating &&
       <div className="fw-bold mb-2"> Submitting... </div>
     }
   </>
   )
}
export default Ratings;