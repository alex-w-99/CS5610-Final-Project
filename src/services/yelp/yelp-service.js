import axios from 'axios';
import {useSelector} from "react-redux";
const API_BASE = process.env.REACT_APP_API_BASE;
const YELP_API = `${API_BASE}/yelp`


/* Get restaurants by city / state name */
export const getByLocation = async (query, location) => {
    const response = await axios.get(`${YELP_API}/term=${query}&location=${location}`);
    console.log("This is the request: " + `${YELP_API}/${query}`);
    const businesses = response.data;
    console.log('got businesses,' + businesses);
    return businesses;
}

/* Get restaurants by longitude and latitude */
export const getByCoordinates = async (query, longitude, latitude) => {
    console.log("SERVICE: LONGITUDE IS " + longitude);
    const response = await axios.get
        (`${YELP_API}/term=${query}&longitude=${longitude}&latitude=${latitude}`);
    const businesses = response.data;
    console.log('got businesses,' + businesses);
    return businesses;
}

/* Only gets one business */
export const getById = async (id) => {
    const response = await axios.get
          (`${YELP_API}/one/${id}`);
    const business = response.data;
    return business;
}