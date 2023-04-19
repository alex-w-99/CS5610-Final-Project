import { createAsyncThunk }
  from "@reduxjs/toolkit"
import * as service
  from "./yelp-service.js"

var longitude = null;
var latitude = null;

export const findBusinessesThunk = createAsyncThunk(
    'yelp/findBusinesses', async ({ query, location }) => {
    var businesses;
    if (location == "null") {
        /* default location */
        location = "Boston";
        if (longitude != null) {
            businesses = await service.getByCoordinates(query, longitude, latitude);
            return businesses;
        } else {
             if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(async (position) => {
                        /* This is a callback function - we call the thunk again at the end
                          so that the businesses are re-generated once we have user's coordinates */
                          if (longitude == null) {
                              /* We only need to find the user's location once */
                              longitude = position.coords.longitude;
                              latitude = position.coords.latitude;
                          }
                          businesses = await service.getByCoordinates(query, longitude, latitude);
                          findBusinessesThunk({query, location});
                      });
            }
        }
    }
    businesses = await service.getByLocation(query, location)
    return businesses;
})