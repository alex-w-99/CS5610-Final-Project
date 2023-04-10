import React from 'react';

const makeQuery = (query) => {
  query = query.replaceAll(" ","-");
   console.log("returning" + query);
  return (query);
}

export default makeQuery;