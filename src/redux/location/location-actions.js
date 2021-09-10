import Api from "../../utilis/Api";

// https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=vNjf3P6ACCNg5zBrUO7BFM0h9f0Dbv3h&q=London

// export const getLocationsByName = (search) => {
//     return (dispatch) => {
//         // alert('in')
//         return Api
//             .get(`locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_API_KEY}&q=${search}`)
//             .then((res) => {
//                 if (res.data) {
//                     console.log('res', res)
//                     dispatch({
//                         type: "GET_LOCATIONS_BY_NAME",
//                         payload: res.data,
//                     });
//                     return Promise.resolve();
//                 }
//             })
//             .catch((e) => {
//                 console.log(e);
//                 // alert('failed')
//             });
//     };
// };

export const getLocationsByName = (search) => async dispatch => {
    try {

        const res = await Api.get(`locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_API_KEY}&q=${search}`)
        dispatch({
            type: 'GET_LOCATIONS_BY_NAME',
            payload: res.data
        })

        // console.log('res', res)

        return Promise.resolve();
    }
    catch (e) {
        console.log(e);
    }
}

// https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=vNjf3P6ACCNg5zBrUO7BFM0h9f0Dbv3h&q=32.38632,34.98642

export const getLocationByGeoposition = (lat, lon) => async dispatch => {
    try {
        // **api**
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