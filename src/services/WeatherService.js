import ApiClient from '../services/ApiClient';
import {WEATHER_API_KEY} from "../config";

const getWeather = async (city) => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&units=metric&appid=${WEATHER_API_KEY}`;
    try {
        const res = await ApiClient.post(URL, {
            city: city,
        })
        return res;
    } catch (error) {
        throw error.response
    }
};

const getWeatherForecast = async (city) => {
    const URL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=en&units=metric&appid=${WEATHER_API_KEY}`;
    try {
        const res = await ApiClient.post(URL, {
            city: city,
        })
        return res;
    } catch (error) {
        throw error.response
    }
}

export default {
    getWeather,
    getWeatherForecast,
};