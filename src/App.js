import SearchComponent from "./search-component";
import SearchBar from "./search-bar";
import {Routes, Route} from "react-router";
import {BrowserRouter} from "react-router-dom";
import './App.css';

function App() {
  return (
     <BrowserRouter>
       <div className="container">
       <SearchBar/>
         <Routes>
           <Route path="/search/:query"
                  element={<SearchComponent/>}/>
         </Routes>
       </div>
     </BrowserRouter>
  );
}

export default App;
