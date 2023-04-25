import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { findBusinessesThunk} from "../services/yelp/business-thunks";
import CarouselImage from "../Components/carousel-image";
import CategoryActivitiesSelection from "../Components/selection";


const HomeComponent = () => {
    const dispatch = useDispatch();
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        dispatch(findBusinessesThunk({ query: "", location: "" })).then(
            (response) => {
                const businesses = response.payload;
                const activitiesData = businesses
                    .slice(0, 10)
                    .map((business) => ({
                        title: business.name,
                        description: business.categories && business.categories[0] && business.categories[0].title,
                        category: business.categories && business.categories[0] && business.categories[0].title,
                        imageUrl: business.image_url,
                    }));
                setActivities(activitiesData);
            }
        );
    }, []);

    return (
        <div>
            <CarouselImage />
            {activities.length > 0 && (
                <CategoryActivitiesSelection
                    activities={activities}

                />
            )}
        </div>
    );
};
export default HomeComponent;