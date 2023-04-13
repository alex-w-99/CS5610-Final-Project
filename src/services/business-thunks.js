import {createAsyncThunk}
  from "@reduxjs/toolkit"
import * as service
  from "./yelp-service"


var longitude = null;
var latitude = null;

export const findBusinessesThunk = createAsyncThunk(
    'yelp/findBusinesses', async ({ query, location }) => {
    console.log('IN THUNK, query is ' + JSON.stringify(query));
    if (location == "null") {
    console.log("IN CONDITIONAL #1");
         if (navigator.geolocation) {
                 navigator.geolocation.getCurrentPosition(async (position) => {
                      if (longitude == null) {
                          /* We only need to find the user's location once */
                          /* NOTE: Integrating this with multiple users might not work well? */
                          console.log("Finding the longitude and latitude");
                          longitude = position.coords.longitude;
                          latitude = position.coords.latitude;
                      }
                      console.log("THUNK: Making call to yelp with " + query + " " + latitude + " "
                      + "longitude"
                      );
                      await service.getByCoordinates(query, longitude, latitude)
                  });
        } else {
            location = "Boston";
        }
    } else {
        await service.getByLocation(query, location);
    }
})