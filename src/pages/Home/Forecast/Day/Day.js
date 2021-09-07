import React, { useEffect, useState } from 'react'
import { MDBCard, MDBCol, MDBContainer, MDBRow } from 'mdbreact'
import moment from "moment";
import { toCelsius, toFahrenheit } from 'celsius'
import './day.css'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { getForecast } from '../../../../redux/weather/weather-actions'

//object replacing api
import fiveDays from '../../../../dist/obj/fiveDaysObj'

const Day = (props) => {

    const [city, setCity] = useState('')
    const [weakWeather, setWeakWeather] = useState([])
    const dispatch = useDispatch()
    let forecastWeather = useSelector((state) => state.weatherReducer.forecast)
    let degreeState = useSelector((state) => state.degreesReducer.degree)

    //*****set weather from api - first useEffect******
    // useEffect(() => {
    //     console.log('Day city', props.cityKey)
    //     // dispatch(getForecast(props.cityKey)).then(() => {
    //     //     // setWeakWeather(forecastWeather)
    //     //     console.log('forecastWeather', forecastWeather)
    //     // })

    // }, [props.cityKey])

    //*****set weather from api - second useEffect******
    // useEffect(() => {
    //     setWeakWeather(forecastWeather.DailyForecasts)

    // }, [forecastWeather])


    //*****set weather from Object ******
    useEffect(() => {
        setWeakWeather(fiveDays.DailyForecasts)

    }, [fiveDays])

    return (
        <>
            {
                weakWeather != null && weakWeather.length > 0 &&
                weakWeather.map((w, index) => {
                    return <MDBCol sm='6' lg='2' className='marginAuto'>
                        <MDBCard className='dayCard'>
                            <div className='marginAuto text-center' key={index}>
                                <h3 className='font-weight-bolder'>{moment(w.Date).format('dddd')}</h3>
                                {
                                    w.Day.IconPhrase.includes('Sunny') ?
                                        <i className="fas fa-sun fa-2x"></i>
                                        : w.Day.IconPhrase.includes('cloud') ?
                                            w.Night.IconPhrase.includes('shower') ?
                                                <i className="fas fa-cloud-moon-rain fa-2x"></i>
                                                : <i className="fas fa-cloud-sun fa-2x"></i>
                                            : w.Day.IconPhrase.includes("Showers") ?
                                                <i className="fas fa-cloud-moon-rain fa-2x"></i>
                                                : ''

                                }
                                <p className='font-italic'>
                                    {
                                        degreeState == 'Celsius' ?
                                            // toCelsius(w.Temperature.Maximum.Value) + "°" + -toCelsius(w.Temperature.Minimum.Value) + "°"
                                            <p>  {toCelsius(w.Temperature.Maximum.Value)} <sup>°</sup> -  {toCelsius(w.Temperature.Minimum.Value)}<sup>°</sup> </p>
                                            :
                                            <p> {toFahrenheit(w.Temperature.Maximum.Value)}<sup>℉</sup>-{toFahrenheit(w.Temperature.Minimum.Value)} <sup>℉</sup> </p>
                                        // toFahrenheit(w.Temperature.Metric.Value) + "℉"
                                    }


                                </p>

                                <a href={w.Link} target='_blank' title={w.Link}>Read More&nbsp;<i className="fas fa-angle-double-right"></i></a>
                            </div>
                        </MDBCard>
                    </MDBCol>
                })

            }

        </>
    )
}
// const mapStateToProps = (state) => {
//     return {
//         weakWeather: state.weatherReducer.weakWeather
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators(
//         {
//             getForecast
//         },
//         dispatch
//     );
// };
export default Day
