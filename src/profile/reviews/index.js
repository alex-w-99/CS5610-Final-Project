import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findReviewsByUserThunk }
    from '../../services/site-db-restaurants/site-restaurants-thunks.js';
import ReviewItem
    from './review-item.js';

const Reviews = () => {
  const dispatch = useDispatch();
  const { reviews, loading } = useSelector(state => state.reviews);
  const { currentUser } = useSelector(state => state.users);
  useEffect(() => {
    dispatch(findReviewsByUserThunk(currentUser));
  }, [])
  return(
      <>
       {
         !loading &&
         reviews.map(r =>
         <div key={r._id} className="mt-1 mb-1">
            <ReviewItem review={r}/>
         </div>)
        }
      </>
  )
}
export default Reviews;