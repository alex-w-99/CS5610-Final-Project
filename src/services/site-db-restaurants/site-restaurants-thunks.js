import { createAsyncThunk }
  from "@reduxjs/toolkit";
import * as service
  from "./site-restaurants-service"
import matchSchema from './helpers/yelp-to-site';
import { findBusinessThunk } from "../yelp/business-thunks.js";

export const findRestaurantThunk = createAsyncThunk(
  'restaurants/findRestaurants', async ({dispatch, businessId}) => {
    console.log("Find restaurant thunk was called with " + businessId);
    const restaurant =  await service.findSiteRestaurant(businessId);
    if (JSON.stringify(restaurant) == '[]') {
      const create = true;
      dispatch(findBusinessThunk({ dispatch, businessId, create }));
    } else {
      return restaurant[0];
    }
  }
)

export const createRestaurantThunk = createAsyncThunk(
  'restaurants/createRestaurant', async ({ dispatch, business}) => {
     const newRestaurant = await service.createSiteRestaurant(matchSchema({business}));
     const businessId = business.id;
     dispatch(findRestaurantThunk({dispatch, businessId}));
     return newRestaurant;
   }
)

export const updateRestaurantThunk = createAsyncThunk(
  'restaurants/updateRestaurant', async (restaurant) => {
    await service.updateSiteRestaurant(restaurant);
  }
)

export const findReviewsThunk = createAsyncThunk(
  'restaurants/reviews/findReviews', async (restaurant) => {
    const reviews = await service.findReviews(restaurant);
    return reviews;
  }
)

export const deleteReviewThunk = createAsyncThunk(
  'restaurants/reviews/deleteReview', async (id) => {
      await service.deleteReview(id);
    }
)

export const createReviewThunk = createAsyncThunk(
  'restaurants/reviews/createReview', async (review) => {
      const newReview = await service.createReview(review);
      return newReview;
    }
)

export const updateReviewThunk = createAsyncThunk(
  'restaurants/reviews/updateReview', async (review) => {
      await service.updateReview(review);
    }
)

export const createRatingThunk = createAsyncThunk(
  'restaurants/reviews/createRating', async (rating) => {
      const newRating = await service.createRating(rating);
      return newRating;
    }
)

export const findRatingThunk = createAsyncThunk(
  'restaurants/reviews/findRating', async ({restaurantId, userId}) => {
      console.log("THUNK UID: " + userId);
      const rating = await service.findRating(restaurantId, userId);
      return rating;
    }
)

export const updateRatingThunk = createAsyncThunk(
  'restaurants/reviews/updateRating', async (rating) => {
      await service.updateRating(rating);
    }
)

export const findAllRestaurantsThunk = createAsyncThunk(
  'restaurants/findAll', async () => {
      await service.findAllRestaurants();
  }
)
