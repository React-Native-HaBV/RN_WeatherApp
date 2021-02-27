import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";
import weather from "./reducers/weatherReducer";

const rootReducers = combineReducers({
    weather
});

export const store = createStore(
    rootReducers, applyMiddleware(thunk)
);