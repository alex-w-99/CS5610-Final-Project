/* Takes a yelp business object and formats it to match ChewsWisely's
   restaurant schema */

import React from 'react';

const YelpToSite = (
 {
    business = {
      "id": "123",
      "name": "Starbies",
      "image_url": "aUrl.com",
      "location": {},
    }
  }
) => {
    console.log("GOING TO CONVERT THIS BUSINESS: " + JSON.stringify(business));
    const restaurant = {
      "image_url": business.image_url,
      "name": business.name,
      "city": business.location.city,
      "state": business.location.state,
      "country": business.location.country,
      "address": business.location.address1,
      "yelpId": business.id
    }
    return restaurant;
};
export default YelpToSite;
