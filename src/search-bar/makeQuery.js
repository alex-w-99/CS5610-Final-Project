import React from 'react';

const makeQuery = (query) => {
  query = query.replaceAll(" ","+");
   console.log("returning /search/" + query);
  return ("/search/" + query);
}

export default makeQuery;