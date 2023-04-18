import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import NavigationBar from "./Components/NavigationBar";
import LandingPage from "./LandingPage";
import HomeScreen from "./HomeScreen";
import Profile from "./Profile";
//import React from "@types/react";

function App() {
    return (
        <BrowserRouter>
            <div className="container">
                <div>
                    <NavigationBar/>
                </div>

                <Routes>
                    <Route path="/landingpage" element={<LandingPage/>} />
                    <Route path="/home" element={<HomeScreen/>} />
                    <Route path="/profile" element={<Profile/>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
