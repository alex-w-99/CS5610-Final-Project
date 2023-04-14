import React from 'react';
import NavigationBar from "../Components/navigationbar";
import CarouselImage from "../Components/carouselImage";
import CategoryActivitiesSelection from "../Components/Selection";
const HomeComponent = () => {
    return (
        <div>
            <NavigationBar />

            <CarouselImage/>
            <CategoryActivitiesSelection/>
        </div>
    )
}
export default HomeComponent;