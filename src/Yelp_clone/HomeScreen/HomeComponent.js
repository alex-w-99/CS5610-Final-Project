import React from 'react';
import NavigationBar from "../Components/NavigationBar";
import CarouselImage from "../Components/carouselImage";
import CategoryActivitiesSelection from "../Components/Selection";
const HomeComponent = () => {
    return (
        <div>
            <CarouselImage/>
            <CategoryActivitiesSelection/>
        </div>
    )
}
export default HomeComponent;