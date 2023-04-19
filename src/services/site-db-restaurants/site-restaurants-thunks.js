import { createAsyncThunk }
  from "@reduxjs/toolkit";
import * as service
  from "./site-restaurants-service"
import matchSchema from './helpers/yelp-to-site';

let lastQuery;

export const findRestaurantThunk = createAsyncThunk(
  'restaurants/findRestaurants', async ({dispatch, business}) => {
    lastQuery = business;
    console.log("THUNK: GOING TO FIND RESTAURANT WITH " + JSON.stringify(business));
    const restaurant =  await service.findSiteRestaurant(business);
    console.log("RESTAURANT LOOKS LIKE:" + JSON.stringify(restaurant));
    if (JSON.stringify(restaurant) == '[]') {
      console.log("RESTAURANT WAS EMPTY");
      dispatch(createRestaurantThunk(dispatch));
    } else {
      dispatch(findReviewsThunk());
      return restaurant[0];
    }
  }
)

export const createRestaurantThunk = createAsyncThunk(
  'restaurants/createRestaurant', async (dispatch) => {
     console.log("CREATING A RESTAURANT");
     const business = lastQuery;
     console.log("CREATING A RESTAURANT WITH THESE PROPS: " + JSON.stringify(matchSchema({business})
     )
     );
     const newRestaurant = await service.createSiteRestaurant(matchSchema({business}));
     dispatch(findRestaurantThunk({dispatch, business}));
     return newRestaurant;
   }
)

export const updateRestaurantThunk = createAsyncThunk(
  'restaurants/updateRestaurant', async (restaurant) => {
    await service.updateSiteRestaurant(restaurant);
  }
)

export const findReviewsThunk = createAsyncThunk(
  'restaurants/reviews/findReviews', async () => {
    await service.findReviews();
  }
)

export const deleteReviewThunk = createAsyncThunk(
  'restaurants/reviews/deleteReview', async (review) => {
      await service.deleteReview(review);
    }
)

export const createReviewThunk = createAsyncThunk(
  'restaurants/reviews/createReview', async (review) => {
      await service.createReview(review);
    }
)

export const updateReviewThunk = createAsyncThunk(
  'restaurants/reviews/updateReview', async (review) => {
      await service.updateReview(review);
    }
)