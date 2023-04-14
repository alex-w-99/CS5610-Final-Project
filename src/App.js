import Yelp_clone from "./Yelp_clone"
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";

/**
 * Driver calls the Yelp Clone -- starts at landing page
 * */
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Yelp_clone/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
