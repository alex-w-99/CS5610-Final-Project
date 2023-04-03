import React from 'react'
import HomeScreen from "./HomeScreen";

function Yelp_clone() {
    return (
        /**
         * Since there is a single landing page and multiple home screens
         * Landing page should be a separate component
         * */
        <>
            <h2>LANDING PAGE</h2>
            <HomeScreen/>
        </>

    );
}

export default Yelp_clone;
