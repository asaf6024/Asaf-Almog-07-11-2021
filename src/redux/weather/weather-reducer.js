const initialState = {
    currentWeather: [],
    forecast: []
};

export default function (state = initialState, action) {
    // console.log('action', action.payload)
    switch (action.type) {
        case "GET_CURRENT_WEATHER":
            return { ...state, currentWeather: action.payload };
        case "GET_FORECAST":
            return { ...state, forecast: action.payload };

        default:
            return state;
    }
}
