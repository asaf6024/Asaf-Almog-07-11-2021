const initialState = {
    currentWeather: [],
    weakWeather: []
};

export default function (state = initialState, action) {
    console.log('action', action.payload)
    switch (action.type) {
        case "GET_WEATER_BY_KEY":
            return { ...state, currentWeather: action.payload };
        case "GET_WEATER_OF_NEXT_FIVE_DAYS":
            return { ...state, weakWeather: action.payload };

        default:
            return state;
    }
}
