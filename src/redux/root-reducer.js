import { combineReducers } from "redux";
import locationReducer from "./location/location-reducer";
import weatherReducer from "./weather/weather-reducer";

const rootReducer = combineReducers({
    locationReducer,
    weatherReducer
});

export default rootReducer;
