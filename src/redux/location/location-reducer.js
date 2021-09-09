const initialState = {
    locations: []
};

export default function (state = initialState, action) {
    // console.log('action', action)
    switch (action.type) {
        case "GET_LOCATIONS_BY_NAME":
            return { ...state, locations: action.payload };
        case "GET_LOCATION_BY_GEOPOSITION":
            return { locations: action.payload };

        default:
            return state;
    }
}
