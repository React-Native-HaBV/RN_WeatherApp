import ApiClient from '../services/ApiClient';
import {GG_PLACES_API_KEY} from '../config';

const searchCity = async (city) => {

    const URL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GG_PLACES_API_KEY}&input=${city}`;
    try {
        const res = await ApiClient.post(URL, {
            city: city,
        })
        return res.data
    } catch (error) {
        throw error.response
    }
}


export default {
    searchCity,
}