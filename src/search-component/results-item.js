import React from "react";

const ResultItem = (
    restaurant = {
     "name": "Template",
     "image_url": "",
     "is_closed": false,
    }
 ) => {
 return(
    <div className="row">
      <div className="col-auto">
        <img width={50}
             height={50}
             className="float-start"
             src={restaurant.image_url}/>
      </div>
        <div className="col-10">
            <div className="fw-Bold">
                {restaurant.name}
            </div>
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
