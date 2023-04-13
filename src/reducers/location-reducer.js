import {createSlice} from "@reduxjs/toolkit";

var long, lat;
if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition((position) => {
     long = position.coords.longitude;
     lat = position.coords.latitude;
     console.log("REDUCER: longitude is " + long);
 })
} else {
    long = 42.360;
    lat = -71.0589;
}

const coordinates = {
    "longitude": long,
    "latitude": lat,
};
//while (long == undefined) {
//    /* wait */
//}
console.log("initial state looks like this: " + JSON.stringify(coordinates));

const locationSlice = createSlice({
    name: 'location',
    initialState: coordinates
});

export default locationSlice.reducer;
