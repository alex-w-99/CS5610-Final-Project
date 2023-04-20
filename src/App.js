import SearchComponent from "./search-component";
import DetailsComponent from "./details-component";
import SearchBar from "./search-bar";
import {Routes, Route} from "react-router";
import {BrowserRouter} from "react-router-dom";
import restaurantReducer from "./reducers/site-restaurants-reducer.js";
import singleBusinessReducer from "./reducers/single-business-reducer.js"
import businessReducer from "./reducers/business-reducer.js";
import reviewsReducer from "./reducers/reviews-reducer.js";
import './App.css';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from "react-redux";

const store = configureStore(
   {reducer: {businesses: businessReducer, siteRestaurant: restaurantReducer,
              reviews: reviewsReducer, oneBusiness: singleBusinessReducer}});

function App() {
  return (
  <Provider store={store}>
     <BrowserRouter>
       <div className="container">
       <SearchBar/>
         <Routes>
           <Route path="/search/*"
                  element={<SearchComponent/>}/>
           <Route path="/details/:businessId"
                  element={<DetailsComponent/>}/>
         </Routes>
       </div>
     </BrowserRouter>
  </Provider>
  );
}

export default App;
