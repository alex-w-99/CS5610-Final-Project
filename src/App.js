import SearchComponent from "./search-component";
import SearchBar from "./search-bar";
import {Routes, Route} from "react-router";
import {BrowserRouter} from "react-router-dom";
import location from "./reducers/location-reducer.js"
import './App.css';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from "react-redux";
const store = configureStore({
    reducer: {location}
});

function App() {
  return (
    <Provider store={store}>
     <BrowserRouter>
       <div className="container">
       <SearchBar/>
         <Routes>
           <Route path="/search/:query/:location"
                  element={<SearchComponent/>}/>
         </Routes>
       </div>
     </BrowserRouter>
   </Provider>
  );
}

export default App;
