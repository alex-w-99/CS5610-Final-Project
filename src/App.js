import React from "react";
import { BrowserRouter, Navigate } from "react-router-dom";
import { Routes, Route } from "react-router";
import NavigationBar from "./navigation-bar";
import LandingPage from "./landing-page";
import HomeScreen from "./home-component";
import Profile from "./profile";
import ProfileOverview from "./profile-overview";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./reducers/users-reducer";
import EditProfile from "./edit-profile";
import profileReducer from "./reducers/profile-reducer";
import About from "./about";
import Login from "./login";
import Register from "./register";
import PageNotFound from "./page-not-found";
import followReducer from "./reducers/follow-reducer";
import SearchComponent from "./search-component";
import DetailsComponent from "./details-component";
import SearchBar from "./search-bar";
import restaurantReducer from "./reducers/site-restaurants-reducer.js";
import ratingsReducer from "./reducers/ratings-reducer.js";
import singleBusinessReducer from "./reducers/single-business-reducer.js"
import businessReducer from "./reducers/business-reducer.js";
import reviewsReducer from "./reducers/reviews-reducer.js";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import CurrentUser from "./users/current-user";

library.add(faStar);

const store = configureStore(
    {
        reducer:
            {
                users: usersReducer,
                profile: profileReducer,
                follow: followReducer,
                businesses: businessReducer,
                siteRestaurant: restaurantReducer,
                reviews: reviewsReducer,
                ratings: ratingsReducer,
                oneBusiness: singleBusinessReducer
            }
    }
);

function App() {
    return (
        <Provider store={store}>
            <CurrentUser>
                <BrowserRouter>

                    <div className="container mt-2">

                        <SearchBar/>

                        <div>
                            <NavigationBar/>
                        </div>

                        <Routes>

                            <Route
                                index
                                element={<LandingPage/>}
                            />
                            <Route
                                path="/home"
                                element={<HomeScreen/>}
                            />
                            <Route
                                path="/profile"
                                element={
                                    <Profile/>
                                }
                            />
                            <Route
                                path="/profile/:uid"
                                element={<ProfileOverview/>}
                            />
                            <Route
                                path="/profile/edit-profile"
                                element={
                                    <EditProfile/>
                                }
                            />
                             <Route 
                                 path="/search/"
                                 element={
                                      <SearchComponent/>
                                 }
                             />
                             <Route 
                                 path="/search/:query"
                                element={
                                     <SearchComponent/>
                                 }
                             />
                            <Route 
                                 path="/search/:query/:location"
                                 element={
                                      <SearchComponent/>
                                 }
                            />
                            <Route
                                  path="/details/:businessId"
                                  element={
                                      <DetailsComponent/>
                                  }
                            />
                            <Route
                                path="/login"
                                element={<Login/>}
                            />
                            <Route
                                path="/register"
                                element={<Register/>}
                            />

                            <Route
                                path="/about"
                                element={<About/>}
                            />

                            { /* Route for all other non-defined routes */ }
                            <Route
                                path="*"
                                element={<Navigate to="/404"/>}
                            />
                            <Route path="/404"
                                element={<PageNotFound/>}
                            />

                        </Routes>
                    </div>
                </BrowserRouter>
            </CurrentUser>
        </Provider>
    );
}

export default App;
