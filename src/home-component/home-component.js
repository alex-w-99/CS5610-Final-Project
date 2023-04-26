import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findBusinessesThunk} from "../services/yelp/business-thunks";
import CarouselImage from "../Components/carousel-image";
import CategoryActivitiesSelection from "../Components/selection";


const HomeComponent = () => {
    const dispatch = useDispatch();
    const { businesses, status } =  useSelector(state => state.businesses);
    const[activities, setActivities] = useState([]);
    useEffect(() => {
        dispatch(findBusinessesThunk({ query: "restaurants"})).then(() => businessesReady());
    }, []);

    const businessesReady = () => {
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
        setActivities(activitiesArray);
    }

    return (
        <div>
            <CarouselImage />
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