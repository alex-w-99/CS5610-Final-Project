import SearchComponent from "./search-component";
import {BrowserRouter} from "react-router-dom";
import './App.css';

function App() {
  return (
     <BrowserRouter>
       <div className="container">
         <Routes>
           <Route path="/search"
                  element={<SearchComponent/>}/>
         </Routes>
       </div>
     </BrowserRouter>
  );
}

export default App;
