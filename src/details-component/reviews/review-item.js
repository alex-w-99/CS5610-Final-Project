import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteReviewThunk, updateReviewThunk }
    from '../../services/site-db-restaurants/site-restaurants-thunks.js';
import Datify from './helpers/datify';

const ReviewItem = (
  {
    review = {
     "_id": "123",
     "restaurantId": "789",
     "userId": "345",
     "userName": "Sans",
     "userImage": "aPicture.jpeg",
     "isCritic": false,
     "text": "mid at best",
     "createdAt": "a time",
    }
  }
) => {
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const midDot = '\u00B7';
 const deleteReviewHandler = (review) => {
    dispatch(deleteReviewThunk(review));
  }
 const toProfile = () => {
    navigate(`/profile/${review.userId}`);
 }
 return(
   <div className="row">
     <div className="col-auto">
           <img width={50}
                height={50}
                className="float-end rounded-circle"
                onClick={toProfile}
                src={`../../../images/${review.userImage}`}/>
     </div>
     <div className="col-10">
       <i className="bi bi-x-lg float-end"
                   onClick={() => deleteReviewHandler(review._id)}></i>
        <i className="bi bi-pencil float-end"/>
       <div>
           <span className="fw-bold">{review.userName}</span> <span className="me-1"> {midDot}
           </span>
           <Datify review={review}/>
       </div>
       <div>
        {review.text}
      </div>
     </div>
   </div>
 )
};
export default ReviewItem;