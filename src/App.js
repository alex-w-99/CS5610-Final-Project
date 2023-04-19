import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import NavigationBar from "./Components/NavigationBar";
import LandingPage from "./LandingPage";
import HomeScreen from "./HomeScreen";
import Profile from "./profile";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import usersReducer from "./reducers/users-reducer";
import EditProfile from "./edit-profile";
import CurrentUser from "./users/current-user";
import React from "react";
//import profileReducer from "./reducers/profile-reducer";

const store = configureStore(
    {
        reducer:
            {
                users: usersReducer,
                //profile: profileReducer,
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
                                path="/landingpage"
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
                                path="/profile/edit-profile"
                                element={
                                    <EditProfile/>
                                }
                            />
                            { /* <Route path="/about" element={<About/>} /> */ }

                        </Routes>
                    </div>
                </BrowserRouter>

        </Provider>
    );
}

export default App;
