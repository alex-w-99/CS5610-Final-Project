import React from 'react';
import './styles/styles.css'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createReviewThunk, findReviewsThunk }
    from '../../services/site-db-restaurants/site-restaurants-thunks';
import ReviewItem from './review-item';
import ReviewStats from './review-stats';

const Reviews = () => {
   const navigate = useNavigate();
   const { restaurant } =
            useSelector(state => state.siteRestaurant);
   const { currentUser } =
            useSelector(state => state.users)
   const { reviews, loading } =
            useSelector(state => state.reviews);
   const [review, setReview] = useState('');
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(findReviewsThunk(restaurant));
      }, []);

   const handleSubmit = (event) => {
       if (currentUser) {  // only submit review if a currentUser is logged in
           event.preventDefault();
           const newReview = {
               restaurantId: restaurant._id,
               text: review,
               userName: `${currentUser.firstName} ${currentUser.lastName}`,
               userImage: currentUser.profilePicture,
               userId: currentUser._id,
               isCritic: currentUser.userType === "CRITIC"
           }
           dispatch(createReviewThunk(newReview));
           setReview('');
       }
   }
   const requireLogin = () => {
      if (!currentUser) {
        navigate('/login');
      }
   }
   const reviewString = `Write a review for ${restaurant.name}...`
   let mode = "PERSONAL";
   if (currentUser) {
       mode = currentUser.userType;
   }
   return(
   <>
     { /* businesses cannot review each other */
        mode !== "RESTAURANT" &&
        <form onSubmit={(event) => handleSubmit(event)}>
           <div>
            <textarea placeholder={reviewString}
                      className="cw-text-box"
                      rows={5}
                      cols={50}
                      value={review}
                      onChange={(event) => setReview(event.target.value)}
                      onClick={requireLogin}/>
           </div>
           <button onClick={(event) => handleSubmit(event)}
                className="btn btn-danger mt-1">
             Review
           </button>
         </form>
     }
       <ul className="mt-3">
        {
          loading &&
          <li className="list-group-item">
            Loading...
          </li>
        }
        {
          reviews.map(r =>
            <li key={r._id} className="list-group-item">
              <ReviewItem review={r}/>
              <ReviewStats review={r}/>
            </li>
          )
        }
        </ul>
   </>
   )
};
export default Reviews;