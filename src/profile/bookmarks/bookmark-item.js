import React from 'react';


const BookMarkItem = ({
   bookmark = {
      "id": "123",
      "image": "img",
      "name": "name"
   }
}) => {
   return(
    <>
     <img src={bookmark.image}
                 className="rounded-circle me-2"
                 width={50}
                 height={50}/>
     <span className="fw-bold"> {bookmark.name} </span>
    </>
  )

}
export default BookMarkItem;