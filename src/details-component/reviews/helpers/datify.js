import React from 'react';

const Datify = ({
   review = {
     "createdAt": "a time",
     "updatedAt": "also a time"
   }
}) => {
  let dateStr = new Date(review.createdAt);
  dateStr = dateStr.toLocaleString();
  return dateStr;
}
export default Datify;