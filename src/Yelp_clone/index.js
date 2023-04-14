import React from 'react'
import {Provider} from "react-redux";
import {Route, Routes} from "react-router";
import {configureStore} from "@reduxjs/toolkit";
import HomeScreen from "./HomeScreen";


const store = configureStore(
    {reducer: {}},);

function Yelp_clone() {
    return (
        /**
         * Since there is a single landing page and multiple home screens
         * Landing page should be a separate component
         * */
        <Provider store={store}>
            <div>
                <Routes>
                    <Route path="home" element={<HomeScreen/>} index/>
                </Routes>
            </div>

        </Provider>


    );
}

export default Yelp_clone;
