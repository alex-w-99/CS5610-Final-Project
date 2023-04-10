import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE;
const YELP_API = `${API_BASE}/yelp`


export const getBusinesses = async (query) => {
    const response = await axios.get(YELP_API);
        const businesses = response.data;
            console.log('got businesses,' + businesses);
        return businesses;
}