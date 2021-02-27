import {
    GET_WEATHER,
    GET_WEATHER_SUCCESS,
    GET_WEATHER_ERROR,
    SELECTED_CITY
} from "./types";
import WeatherService from "../../services/WeatherService";

/* Actions Weather Fetch */
export function weatherFetch() {
    console.log('Action Fetch Weather');
    return {
        type: GET_WEATHER
    };
};

export function weatherSuccess(data) {
    console.log('Action Fetch Weather success');
    return {
        type: GET_WEATHER_SUCCESS,
        payload: data
    };
};

export function weatherError(error) {
    console.log('Action Fetch Weather error');
    return {
        type: GET_WEATHER_ERROR,
        payload: error
    };
};
export function citySelected(data) {
    console.log('Action Selected city');
    return {
        type: SELECTED_CITY,
        payload: data
    };
};
export function selectedCity(text) {
    return (dispatch) => {
        dispatch(citySelected(text));
    }
};

function transformDate(date) {
    if (!date) return null;
    var newTime = new Date(date * 1000).toLocaleString("en-US", {
        timeZone: 'Asia/Ho_Chi_Minh'
    });
    newTime = new Date(newTime);
    return newTime;
};

export function fetchWeatherData(city) {
    return (dispatch, getState) => {
        let d = transformDate(getState().weather.weatherData.dt);
        if (d) {
            if ((d - new Date()) / 1000 / 60 / 60 / 24 >= -0.125) return; // Verify if the time is less than 3h to make another API call
        }

        dispatch(weatherFetch());

        return (
            WeatherService.getWeather(city)
                .then(({data}) => {
                    // console.log('get weather Data ====>>>>', data);
                    if (data.cod === 200 || data.cod === "200") {
                        dispatch(weatherSuccess(data));
                        // return WeatherService.getWeatherForecast(city);
                        dispatch(selectedCity(''));
                    } else throw new Error("Invalid Weather Fetch! " + data.message);
                })
                // .then(forecastData => {
                //     console.log('forecast Data ====>>>>', forecastData);
                //     if (forecastData.data.cod === 200 || forecastData.data.cod === "200") {
                //         dispatch(weatherSuccess(forecastData));
                //     } else
                //         throw new Error("Invalid Forecast Fetch! " + forecastData.message);
                // })
                .catch(err => dispatch(weatherError(err)))
        )
    };
};
