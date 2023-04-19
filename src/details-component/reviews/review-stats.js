import "../../index.css"
import { updateReviewThunk }
     from '../../services/site-db-restaurants/site-restaurants-thunks.js';
import { useSelector, useDispatch} from 'react-redux'


const ReviewStats = (
{
   review = {
     "likes": 15,
     "dislikes": 0,
     "liked": false,
   }
 }) => {
 const dispatch = useDispatch();

 const onLike = () => {
    if (review.liked) {
        dispatch(updateReviewThunk({...review,
           likes: review.likes - 1,
           liked: false}));
    } else {
        let newDislikes = review.dislikes;
        if (review.disliked) {
          newDislikes -= 1;
        }
        dispatch(updateReviewThunk({...review,
           likes: review.likes + 1,
           liked: true,
           disliked: false,
           dislikes: newDislikes
           }));
    }
 }
 
 const onDislike = () => {
    if (review.disliked) {
        dispatch(updateReviewThunk({...review,
           likes: review.likes - 1,
           disliked: false}));
    } else {
        let newLikes = review.likes;
        if (review.liked) {
          newLikes -= 1;
        }
        dispatch(updateReviewThunk({...review,
           likes: review.likes + 1,
           disliked: true,
           liked: false,
           likes: newLikes}));
    }
 }

 return(
    <div className="row">
        <div className="col-2"></div>
        <div className="col-10 wd-flex-container wd-flex-center-vertical wd-flex-sb p-3 wd-icons">
            <div>
                 <i onClick={onLike}
                 className={review.liked ? "bi bi-hand-thumbs-up me-2 text-success"
                 :
                 "bi bi-hand-thumbs-up me-2"
                 }>
                 </i>
                 {review.likes}
                  <i onClick={onDislike}
                  className={review.disliked ? "bi bi-hand-thumbs-down ms-3 me-2 text-danger"
                  :
                  "bi bi-hand-thumbs-down ms-3 me-2"
                  }>
                  </i>
                  {review.likes}
           </div>
        </div>
    </div>
 );
};

export default ReviewStats;