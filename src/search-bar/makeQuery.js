import React from 'react';
//import getLocation from './get-location.js';

const makeQuery = (query, location) => {
//  var longitude, latitude;
//  const getLocation = () => {
//      navigator.geolocation.getCurrentPosition((position) => {
//          longitude = position.coords.longitude;
//          latitude = position.coords.latitude;
//          console.log("Longitude is " + longitude);
//          console.log("And latitude is " + latitude);
//      });
//  }

  query = query.replaceAll(" ","+");
  if (location !=  "null") {
    location = location.replaceAll(" ", "+");
  }
  console.log("MAKE QUERY query is " + query);
  console.log("MAKE QUERY location is " + location);
//  const radius = 10000;
//  if (location == '') {
////        console.log("Location is " + location);
////        if (navigator.geolocation) {
////            console.log("In the conditional");
////            const response = await getLocation();
//////            const {longitude, latitude} = JSON.stringify(response.data);
////            while(response.state == "pending") {
////                /* wait */
////            }
////            console.log("Response value is " + JSON.stringify(response));
////            if (typeof longitude === "undefined") {
////               longitude = 42.3601;
////               latitude = -71.0589;
////            }
////            return(query + "&latitude=" + latitude + "&longitude=" + longitude +
////                    "&radius=" + radius);
//            return(`${query}/null`);
//        } else {
//           console.log("Location is " + location);
           return({
                "query": query,
                "location": location,
           });
//        }
}

export default makeQuery;