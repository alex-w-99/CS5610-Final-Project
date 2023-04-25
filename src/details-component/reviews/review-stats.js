import "../../index.css"
import { updateReviewThunk }
     from '../../services/site-db-restaurants/site-restaurants-thunks.js';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';


const ReviewStats = (
{
   review = {
     "likes": 15,
     "dislikes": 0,
     "likingUsers": [],
     "dislikingUsers": []
   }
 }) => {
 const navigate = useNavigate();
 const dispatch = useDispatch();
 const { currentUser } =
           useSelector(state => state.users);
 /* Can't just pass currentUser._id to below filters in case currentUser
    doesn't exist */
 let id = -1;
 if (currentUser) {
    id = currentUser._id;
 }
 const[liked, setLiked] = useState(
    review.likingUsers.includes(id));
 const[disliked, setDisliked] = useState(
    review.dislikingUsers.includes(id));
 const requireLogin = () => {
    if (!currentUser) {
      navigate('/login');
      return true;
    }
    return false;
  }

 const onDislike = () => {
    if (requireLogin()) {
       return;
    }
    let dislikers = JSON.parse(JSON.stringify(review.dislikingUsers));
    let likers = JSON.parse(JSON.stringify(review.likingUsers));
    likers = likers.filter((user) => user !== id);
    if (disliked) {
        dislikers = dislikers.filter((user) =>  user !== id);
        dispatch(updateReviewThunk({...review,
           dislikes: review.dislikes - 1,
           dislikingUsers: dislikers}));
       setDisliked(false);
    } else {
        let newLikes = review.likes;
        if (liked) {
          newLikes -= 1;
        }
        dislikers.push(id);
        dispatch(updateReviewThunk({...review,
           dislikes: review.dislikes + 1,
           likes: newLikes,
           likingUsers: likers,
           dislikingUsers: dislikers}));
        setLiked(false);
        setDisliked(true);
    }
 }

  const onLike = () => {
     if (requireLogin()) {
       return;
     }
     let likers = JSON.parse(JSON.stringify(review.likingUsers));
     let dislikers = JSON.parse(JSON.stringify(review.dislikingUsers));
     dislikers = dislikers.filter((user) => user !== id);
     if (liked) {
         /* the user is unliking */
         likers = likers.filter((user) => user !== id);
         dispatch(updateReviewThunk({...review,
            likes: review.likes - 1,
            likingUsers: likers}));
        setLiked(false);
     } else {
         /* the user is liking */
         let newDislikes = review.dislikes;
         if (review.disliked) {
           newDislikes -= 1;
         }
         likers.push(id)
         dispatch(updateReviewThunk({...review,
            likes: review.likes + 1,
            dislikes: newDislikes,
            dislikingUsers: dislikers,
            likingUsers: likers
            }));
         setLiked(true);
         setDisliked(false);
     }
  }
 return(
    <div className="row">
        <div className="col-9"></div>
        <div className="col-3 p-3 ">
            <div>
                <i onClick={onLike}
                 className={liked ? "bi bi-hand-thumbs-up me-2 text-success"
                 :
                 "bi bi-hand-thumbs-up me-2"
                 }>
                </i>
                 {review.likes}
                 <i onClick={onDislike}
                  className={disliked ? "bi bi-hand-thumbs-down ms-3 me-2 text-danger"
                  :
                  "bi bi-hand-thumbs-down ms-3 me-2"
                  }>
                 </i>
                  {review.dislikes}
           </div>
        </div>
    </div>
 );
};

export default ReviewStats;