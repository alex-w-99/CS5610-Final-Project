import React from 'react';
import { useNavigate } from 'react-router-dom';

const ReviewItem = ({
    review = {
        "text": "lorem ipsum",
        "restaurantId": "123",
        "restaurantName": "hello"
    }
 }) => {
 const navigate = useNavigate();
  if (! review.restaurantYelp) {
     return;
  }
 let print = review.text.slice(0,100);
 if (review.text.length > 100) {
    print += '...';
 }
 console.log("the nav link would be " + `details/${review.restaurantId}`)
 return(
    <div onClick={() => (navigate(`/details/${review.restaurantYelp}`))}>
        <div className="fw-bold"> {review.restaurantName} </div>
         <div> "{print}"</div>
    </div>
 )
}
export default ReviewItem;