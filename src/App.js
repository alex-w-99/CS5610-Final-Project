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
import CurrentUser from "./users/current-user";
import React from "react";
import profileReducer from "./reducers/profile-reducer";
import About from "./about";
import Login from "./login";
import Register from "./register";
import PageNotFound from "./page-not-found";

const store = configureStore(
    {
        reducer:
            {
                users: usersReducer,
                profile: profileReducer,
            }
    }
);

function App() {
    return (
        <Provider store={store}>

                <BrowserRouter>
                    <div className="container">
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

        </Provider>
    );
}

export default App;
