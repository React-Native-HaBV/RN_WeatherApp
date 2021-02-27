import {GET_WEATHER, GET_WEATHER_SUCCESS, GET_WEATHER_ERROR, ADD_CITY, SELECTED_CITY} from "../actions/types";

const initialState = {
    weatherData: [],
    cityName: '',
};

function weather(state = initialState, action) {
    switch (action.type) {
        case GET_WEATHER:
            return {...state, isFetching: true};
        case GET_WEATHER_SUCCESS:
            const data = {
                name: action.payload.name,
                weather: [
                    {
                        description: action.payload.weather.description
                    }
                ],
                main: {
                    temp: action.payload.main.temp,
                    pressure: action.payload.main.pressure,
                    humidity: action.payload.main.humidity,
                    temp_min: action.payload.main.temp_min,
                    temp_max: action.payload.main.temp_max,
                },
                sys: {
                    sunrise: action.payload.sys.sunrise,
                    sunset: action.payload.sys.sunset
                },
                visibility: action.payload.visibility,
                dt: action.payload.dt,
                wind: action.payload.wind,
                clouds: {all: action.payload.clouds.all},
            }
            return {
                ...state,
                isFetching: false,
                weatherData: state.weatherData.concat({
                    key: Math.random(),
                    name: action.payload.name,
                    data: data,
                })
            };
        case GET_WEATHER_ERROR:
            console.log(action.payload);
            return {...state, isFetching: false};
        case SELECTED_CITY:
            // PAYLOAD: OBJECT;
            console.log('selected city log in reducer =>', action.payload);
            return {
                ...state,
                cityName: action.payload,
            };
        default:
            return state;
    }
};
export default weather;
