import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createReviewThunk, findReviewsThunk }
    from '../../services/site-db-restaurants/site-restaurants-thunks';
import ReviewItem from './review-item';
import ReviewStats from './review-stats';

const Reviews = () => {
   const { restaurant } =
            useSelector(state => state.siteRestaurant);
    const { reviews, loading } =
            useSelector(state => state.reviews);
   const [review, setReview] = useState('');
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(findReviewsThunk(restaurant));
      }, []);
   const handleSubmit = (event) => {
      event.preventDefault();
      const newReview = {
        restaurantId: restaurant._id,
        text: review,
        userName: "Fake person",
        userImage: "default-profile-pic.jpg",
        userId: "123"
      }
      dispatch(createReviewThunk(newReview));
      setReview('');
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