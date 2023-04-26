import React from 'react';
import '../Profile.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { findAllRestaurantsThunk }
    from '../../services/site-db-restaurants/site-restaurants-thunks.js';
import BookMarkItem from './bookmark-item.js'
import "../../utils/loading-spinner.css";
import {Card} from "react-bootstrap";

const Bookmarks = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.users);

  useEffect(() => {
    dispatch(findAllRestaurantsThunk())
  }, [location.pathname]);

 const { restaurants, loading } = useSelector(state => state.allRestaurants);
 console.log("Restaurants:" + JSON.stringify(restaurants));
  let bookmarksArray = [];
  if (Array.length != 0 && Array.isArray(currentUser.bookmarks)) {
    for (const bookmark of currentUser.bookmarks) {
        restaurants.map(rest => {
            if (rest.yelpId == bookmark) {
                if (bookmarksArray.findIndex(b =>
                    b.id == rest.yelpId
                ) == -1) {
                bookmarksArray.push({
                    id: bookmark,
                    image: rest.image_url,
                    name: rest.name
                })
            }
        }
    })
  }
  }

  return(
      <>
          {
              loading
              ?
              <div className="spinner">
              </div>
              :
              <div className="mb-4">
                  <Card className="profile-card">
                      <Card.Body>
                          <Card.Title>
                              Bookmarks:
                          </Card.Title>
                          <ul className="list-group">
                              {
                                  bookmarksArray.map((ele) =>
                                                         <li key={ele.id}
                                                             onClick={() => navigate(`/details/${ele.id}`)}
                                                             className="list-group-item">
                                                             <BookMarkItem bookmark={ele}/>
                                                         </li>
                                  )
                              }
                          </ul>
                      </Card.Body>
                  </Card>
              </div>
          }
      </>
  )
}
export default Bookmarks;
