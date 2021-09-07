import { combineReducers } from "redux";
import locationReducer from "./location/location-reducer";
import weatherReducer from "./weather/weather-reducer";
import favoritesReducer from "./favorites/favorites-reducer";
import degreesReducer from "./degrees/degrees-reducer";
const rootReducer = combineReducers({
    locationReducer,
    weatherReducer,
    favoritesReducer,
    degreesReducer
});

export default rootReducer;
