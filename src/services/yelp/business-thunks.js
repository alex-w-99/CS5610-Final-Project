import { createAsyncThunk }
  from "@reduxjs/toolkit"
import * as service
  from "./yelp-service.js"
import { createRestaurantThunk } from
    '../site-db-restaurants/site-restaurants-thunks';

var longitude = null;
var latitude = null;

export const findBusinessesThunk = createAsyncThunk(
    'yelp/findBusinesses', async ({ query, location }) => {
    console.log("TIME TO FIND SOME BUSINESSES");
    var businesses;
    if (location == undefined) {
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
    console.log("Going to call get by location now");
    businesses = await service.getByLocation(query, location)
    return businesses;
})

export const findBusinessThunk = createAsyncThunk(
    /* async function params:
     *  create:     a boolean for whether this function should create a new
     *              ChewsWisely restaurant entry for the business it finds
     *  dispatch:   dispatch function to allow it to call createRestaurant
     *              thunk
     *  businessId: ID of target business
     */
    'yelp/findBusinesses', async ({ dispatch, businessId, create }) => {
    console.log("Going to get business with id " + businessId);
    const response = await service.getById(businessId);
    if (create) {
      const business = JSON.parse(JSON.parse(JSON.stringify(response)));
      dispatch(createRestaurantThunk({dispatch, business}));
    }
    return response;
})