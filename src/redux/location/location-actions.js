import Api from "../../utilis/Api";
const API_KEY = 'vNjf3P6ACCNg5zBrUO7BFM0h9f0Dbv3h';
// const API_HOST = 'http://dataservice.accuweather.com/';
// const API_VERSION = 'v1';

// https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=vNjf3P6ACCNg5zBrUO7BFM0h9f0Dbv3h&q=London

export const getLocationByName = (city) => {
    return (dispatch) => {
        // alert('in')
        return Api
            .get(`locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${city}`)
            .then((res) => {
                if (res.data) {
                    console.log('res', res)
                    dispatch({
                        type: "GET_LOCATION_BY_NAME",
                        payload: res.data,
                    });
                }
            })
            .catch((e) => {
                console.log(e);
                // alert('failed')
            });
    };
};