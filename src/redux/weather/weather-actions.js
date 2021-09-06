import Api from "../../utilis/Api";
const API_KEY = 'vNjf3P6ACCNg5zBrUO7BFM0h9f0Dbv3h';
// const API_HOST = 'http://dataservice.accuweather.com/';
// const API_VERSION = 'v1';

// https://dataservice.accuweather.com/currentconditions/v1//711822?apikey=vNjf3P6ACCNg5zBrUO7BFM0h9f0Dbv3h

export const getWeatherByKey = (city) => {
    return (dispatch) => {
        // alert('in')
        return Api
            .get(`/currentconditions/v1/${city}?apikey=${API_KEY}`)
            .then((res) => {
                if (res.data) {
                    console.log('Weather Res', res)
                    dispatch({
                        type: "GET_WEATER_BY_KEY",
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

// https://dataservice.accuweather.com/forecasts/v1/daily/5day/711822?apikey=vNjf3P6ACCNg5zBrUO7BFM0h9f0Dbv3h
export const getWeatherOfNextFiveDays = (city) => {
    console.log('city', city)
    return (dispatch) => {
        // alert('in')
        return Api
            .get(`/forecasts/v1/daily/5day/${city}?apikey=${API_KEY}`)
            .then((res) => {
                if (res.data) {
                    console.log('Weather Next 5 days', res)
                    dispatch({
                        type: "GET_WEATER_OF_NEXT_FIVE_DAYS",
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
