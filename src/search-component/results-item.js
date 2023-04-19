import React from 'react';
import './styles/index.css';
import { useNavigate } from 'react-router-dom';


const ResultItem = (
  {
    restaurant = {
     "id": "123",
     "name": "Template",
     "image_url": "",
     "is_closed": false,
    }
  }
 ) => {
 const navigate = useNavigate();
 const toDetails = () => {
    navigate(`/details/${restaurant.id}`);
 }
 return(
  <div>
    <div className="row mb-2 p-2"
        onClick={toDetails}
        id="result-item-box">
      <div className="col-4">
        <img width={100}
             height={100}
             src={restaurant.image_url}/>
      </div>
      <div className="col-8">
        <div className="fw-bold cw-restaurant-name ps-5 pt-3">
                     {restaurant.name}
        </div>
            { restaurant.is_closed ?
                <div className="text-danger
                     fw-bold"> <i className= "bi bi-x me-2 ps-5"/>
                     Closed </div>
                :
                <div className="text-success
                     fw-bold pt-3"> <i className= "bi bi-circle-fill me-2 ps-5"/>
                     Open now</div>
            }
            </div>
        </div>
    </div>

 );
};
export default ResultItem;
