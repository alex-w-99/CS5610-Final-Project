import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createReviewThunk }
    from '../../services/site-db-restaurants/site-restaurants-thunks';
import ReviewItem from './review-item';
import ReviewStats from './review-stats';

const Reviews = () => {
   const { restaurant, reviews, loading } =
            useSelector(state => state.siteRestaurant);
   const [review, setReview] = useState('');
   const dispatch = useDispatch();
   const handleSubmit = (event) => {
      event.preventDefault();
      const newReview = {
        restaurantId: restaurant._id,
        text: review
      }
      dispatch(createReviewThunk(review));
   }
   const reviewString = `Write a review for ${restaurant.name}...`
   return(
   <>
    <form onSubmit={(event) => handleSubmit(event)}>
       <div>
        <textarea placeholder={reviewString}
                  rows={5}
                  cols={50}
                  onChange={(event) => setReview(event.target.value)}/>
       </div>
        <button onClick={(event) => handleSubmit(event)}> Review </button>
    </form>
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
   </>
   )
};
export default Reviews;