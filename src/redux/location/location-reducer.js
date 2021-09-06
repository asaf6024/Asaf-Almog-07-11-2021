const initialState = {
    location: []
};

export default function (state = initialState, action) {
    // console.log('action', action)
    switch (action.type) {
        case "GET_LOCATION_BY_NAME":
            return { ...state, location: action.payload };
        default:
            return state;
    }
}
