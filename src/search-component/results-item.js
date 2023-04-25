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
    <div className="row mb-3 p-2"
         id="result-item"
        onClick={toDetails}>
      <div className="col-5">
        <img width={150}
             height={150}
             height={150}
             src={restaurant.image_url}
             id="result-image"/>
      </div>
      <div className="col-7">
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
                <div className="pt-3 ps-5 fw-bold">
                    {restaurant.location.address1}
                 </div>
            </div>
        </div>
    </div>

 );
};
export default ResultItem;
