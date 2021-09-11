import Api from "../../utilis/Api";
import { currentOj, onlineLocationObj } from '../../dist/obj/fakeApi';

// https://dataservice.accuweather.com/currentconditions/v1//711822?apikey=vNjf3P6ACCNg5zBrUO7BFM0h9f0Dbv3h

// export const getCurrentWeather = (search) => {
//     return (dispatch) => {
//         // alert('in')
//         return Api
//             .get(`currentconditions/v1/${search}?apikey=${process.env.REACT_APP_API_KEY}`)
//             .then((res) => {
//                 if (res.data) {
//                     console.log('Weather Res from api', res.data)
//                     dispatch({
//                         type: "GET_CURRENT_WEATHER",
//                         payload: res.data,
//                     });
//                 }
//             })
//             .catch((e) => {
//                 console.log(e);
//                 // alert('failed')
//             });
//     };
// };

export const getCurrentWeather = (search) => async dispatch => {
    try {
        const res = await Api.get(`currentconditions/v1/${search}?apikey=${process.env.REACT_APP_API_KEY}`)

        dispatch({
            type: 'GET_CURRENT_WEATHER',
            payload: res.data
        })
        return Promise.resolve();
    }
    catch (e) {
        console.log(e);
    }
}

// https://dataservice.accuweather.com/forecasts/v1/daily/5day/711822?apikey=vNjf3P6ACCNg5zBrUO7BFM0h9f0Dbv3h

// export const getForecast = (search) => {
//     // console.log('city', city)
//     return (dispatch) => {
//         // alert('in')
//         return Api
//             .get(`/forecasts/${process.env.REACT_APP_API_VERSION}/daily/5day/${search}?apikey=${process.env.REACT_APP_API_KEY}`)
//             .then((res) => {
//                 if (res.data) {
//                     console.log('Weather Next 5 days', res)
//                     dispatch({
//                         type: "GET_FORECAST",
//                         payload: res.data,
//                     });
//                 }
//             })
//             .catch((e) => {
//                 console.log(e);
//                 // alert('failed')
//             });
//     };
// };

export const getForecast = (search) => async dispatch => {
    try {
        const res = await Api.get(`forecasts/v1/daily/5day/${search}?apikey=${process.env.REACT_APP_API_KEY}`)

        // console.log('res of 5 is ', res)
        dispatch({
            type: 'GET_FORECAST',
            payload: res.data
        })
        return Promise.resolve();
    }
    catch (e) {
        console.log(e);
    }
}
