import React from 'react'
import {Provider} from "react-redux";
import {Route, Routes} from "react-router";
import {configureStore} from "@reduxjs/toolkit";
import HomeScreen from "./HomeScreen";
import LandingPage from "./LandingPage";
import {BrowserRouter} from "react-router-dom";
import Profile from "./Profile";
import NavigationBar from "./Components/NavigationBar";




function Yelp_clone() {
    return (
        /**
         * Since there is a single landing page and multiple home screens
         * Landing page should be a separate component
         * */
        <>
            <div>
                <NavigationBar/>
            </div>
            <Routes>
                <Route path="landingpage" element={<LandingPage/>} />
                <Route path="home" element={<HomeScreen/>} />
                <Route path="profile" element={<Profile/>} />
            </Routes>
        </>




    );
}

export default Yelp_clone;
