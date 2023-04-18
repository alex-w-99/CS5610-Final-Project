import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import NavigationBar from "./Components/NavigationBar";
import LandingPage from "./LandingPage";
import HomeScreen from "./HomeScreen";
import Profile from "./Profile";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import usersReducer from "./reducers/users-reducer";
//import CurrentUser from "./users/current-user";
//import React from "@types/react";

const store = configureStore(
    {
        reducer:
            {
                users: usersReducer,
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
                            <Route path="/" element={<LandingPage/>} />
                            <Route path="/landingpage" element={<LandingPage/>} />
                            <Route path="/home" element={<HomeScreen/>} />
                            <Route path="/profile" element={<Profile/>} />
                            { /* <Route path="/about" element={<About/>} /> */ }
                        </Routes>
                    </div>
                </BrowserRouter>

        </Provider>

    );
}

export default App;
