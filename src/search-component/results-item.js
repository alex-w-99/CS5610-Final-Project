import React from 'react';
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
    <div className="row" onClick={toDetails}    >
      <div className="col-auto">
        <img width={50}
             height={50}
             className="float-start"
             src={restaurant.image_url}/>
        <div className="fw-Bold">
                     {restaurant.name}
        </div>
      </div>
        <div className="col-10">
            { restaurant.is_closed ?
                <div className="text-danger fw-bold"> Closed</div>
                :
                <div className="text-success fw-bold"> Open now</div>
            }
        </div>
    </div>
 );
};
export default ResultItem;
