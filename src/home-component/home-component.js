import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findBusinessesThunk} from "../services/yelp/business-thunks";
import CarouselImage from "../Components/carousel-image";
import CategoryActivitiesSelection from "../Components/selection";
import RecentReviews from './recent-reviews';
import './index.css'


const HomeComponent = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.users)
    const { businesses, status } =  useSelector(state => state.businesses);
    let activities = [];
    useEffect(() => {
        dispatch(findBusinessesThunk({ query: "restaurants"}));
    }, []);
    let criticPersonal = false;
    if (currentUser) {
        criticPersonal = ((currentUser.userType == "PERSONAL") ||
                                         (currentUser.userType == "CRITIC"))
    }
    if (businesses != '[]') {
        console.log("In businesses ready, businesses are " + JSON.stringify(businesses));
        const activitiesArray = businesses
            .slice(0, 12)
            .map((business) => ({
                title: business.name,
                description: business.categories && business.categories[0] && business.categories[0].title,
                category: business.categories && business.categories[0] && business.categories[0].title,
                imageUrl: business.image_url,
                price: business.price,
                review_count: business.review_count,
                rating: business.rating,
                distance: business.distance,
                id: business.id
            }));
        activities = activitiesArray;
    }

    return (
        <div>
          {
            currentUser &&
            <>
            {
                criticPersonal &&
                <h1 className="text-center display-4 py-4"> Welcome Back, {currentUser.firstName} </h1>
            }
          </>
          }
            <CarouselImage />
          {
             currentUser &&
             <>
             {
             criticPersonal &&
            <div className="d-flex justify-content-center mt-4 mb-4">
              <div className="cw-card mt-3">
                    <div className="text-center cw-card-title display-4 mb-3"> Recent Reviews </div>
                     <RecentReviews/>
              </div>
            </div>
              }
              </>
          }
            {activities.length > 0 && (
            <>
            {
                status === 200 &&
                <CategoryActivitiesSelection
                    activities={activities}

                />
            }
            </>
            )}
        </div>
    );
};
export default HomeComponent;