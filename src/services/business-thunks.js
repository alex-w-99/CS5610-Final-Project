import {createAsyncThunk}
  from "@reduxjs/toolkit"
import * as service
  from "./yelp-service"


var longitude = null;
var latitude = null;

export const initializeLocation = () => {
     if (navigator.geolocation && longitude == null) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                  /* We only need to find the user's location once */
                  console.log("Finding the longitude and latitude");
                  longitude = position.coords.longitude;
                  latitude = position.coords.latitude;
            });
    }
}

export const findBusinessesThunk = createAsyncThunk(
    'yelp/findBusinesses', async ({ query, location }) => {
    var businesses;
    console.log('IN THUNK, query is ' + JSON.stringify(query));
    if (location == "null") {
        if (longitude != "null") {
            console.log("THUNK: CALLING WITH COORDINATES");
            businesses = await service.getByCoordinates(query, longitude, latitude);
            return businesses;
        } else {
//    console.log("IN CONDITIONAL #1");
//         if (navigator.geolocation) {
//                navigator.geolocation.getCurrentPosition(async (position) => {
//                      if (longitude == null) {
//                          /* We only need to find the user's location once */
//                          console.log("Finding the longitude and latitude");
//                          longitude = position.coords.longitude;
//                          latitude = position.coords.latitude;
//                      }
//                      console.log("THUNK: Making call to yelp with " + query + " " + latitude + " "
//                      + "longitude"
//                      );
//                      businesses = await service.getByCoordinates(query, longitude, latitude);
//                      console.log("THUNK GOT BUSINESSES: " + businesses);
//                  });
//        } else {
            location = "Boston";
        }
    }
    businesses = await service.getByLocation(query, location)
    console.log("RETURNING FROM THUNK WITH BUSINESSES: " + businesses);
    return businesses;
})