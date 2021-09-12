import Api from "../../utilis/Api";

export const getLocationsByName = (search) => async dispatch => {
    try {

        const res = await Api.get(`locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_API_KEY}&q=${search}`)

        dispatch({
            type: 'GET_LOCATIONS_BY_NAME',
            payload: res.data
        })


        return Promise.resolve();

    }
    catch (e) {
        console.log(e);
    }
}

export const getLocationByGeoposition = (lat, lon) => async dispatch => {
    try {

        const res = await Api.get(`locations/v1/cities/geoposition/search?apikey=${process.env.REACT_APP_API_KEY}&q=${lat},${lon}`)

        dispatch({
            type: 'GET_LOCATION_BY_GEOPOSITION',
            payload: res.data
        })

        return Promise.resolve();

    }
    catch (e) {
        console.log(e);
    }
}