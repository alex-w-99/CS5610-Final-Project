import React from 'react';

const makeQuery = (query, location) => {
  query = query.replaceAll(" ","+");
  if (location !=  "null") {
    location = location.replaceAll(" ", "+");
  }
  console.log("MAKE QUERY query is " + query);
  console.log("MAKE QUERY location is " + location);
   return({
        "query": query,
        "location": location,
   });
}
export default makeQuery;