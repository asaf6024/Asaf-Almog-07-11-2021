const initialState = {
    location: [],
    geoPosition: []
};

export default function (state = initialState, action) {

    switch (action.type) {

        case "GET_LOCATIONS_BY_NAME":
            return { location: action.payload };

        case "GET_LOCATION_BY_GEOPOSITION":
            return { geoPosition: action.payload };

        default:
            return state;
    }
}
