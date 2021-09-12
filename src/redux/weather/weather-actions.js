import Api from "../../utilis/Api";

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

export const getForecast = (search) => async dispatch => {
    try {

        const res = await Api.get(`forecasts/v1/daily/5day/${search}?apikey=${process.env.REACT_APP_API_KEY}`)

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
