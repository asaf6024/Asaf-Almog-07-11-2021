import React, { useEffect, useState } from 'react'
import { MDBCard, MDBCol, MDBAnimation } from 'mdbreact'
import moment from "moment";
import { toCelsius, toFahrenheit } from 'celsius'
import './day.css'

//fake api
import { fiveDays } from '../../../../dist/obj/fakeApi';
import imagesOfWeather from '../../../../dist/obj/imagesOfWeather';

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { getForecast } from '../../../../redux/weather/weather-actions'

const Day = (props) => {

    const [city, setCity] = useState('')
    const [weakWeather, setWeakWeather] = useState([])
    const dispatch = useDispatch()
    let forecastState = useSelector((state) => state.weatherReducer.forecast)
    let degreeState = useSelector((state) => state.degreesReducer.degree)
    let counter = 0

    //*****set weather from api - first useEffect******
    // useEffect(() => {
    //     // console.log('Day city', props.cityKey)
    //     dispatch(getForecast(props.cityKey))

    // }, [props.cityKey])

    //*****set weather from api - second useEffect******
    // useEffect(() => {
    //     setWeakWeather(forecastState.DailyForecasts)
    //     console.log('forecastState', forecastState.DailyForecasts)
    // }, [forecastState])


    //*****set weather from fake api ******
    useEffect(() => {
        // console.log('fiveDays', fiveDays)
        setWeakWeather(fiveDays)

    }, [fiveDays])

    return (
        <>
            {
                weakWeather != undefined && weakWeather.length > 0 &&
                weakWeather.map((w, index) => {
                    if (index > 0)
                        counter += 0.2
                    return <MDBCol sm='6' lg='2' className='marginAuto' key={index}>
                        <MDBAnimation type="fadeIn" delay={`${counter}s`} className="text-center" data-mdb-animation-start="onHover">

                            <MDBCard className='customCard'>
                                <div className='marginAuto text-center'>
                                    <h3 className='font-weight-bolder'>{moment(w.Date).format('dddd')}</h3>
                                    {
                                        imagesOfWeather.map((image, i) => {

                                            if (w.Day.IconPhrase.includes(`${image.type}`))
                                                return <img
                                                    className='imageOfWeather'
                                                    key={i}
                                                    src={image.src}
                                                    alt={image.alt} height="100"
                                                    style={{ maxWidth: '100%' }
                                                    } />
                                        })
                                    }
                                    <p className='font-italic'>
                                        {
                                            degreeState == 'Celsius' ?
                                                <p>{toCelsius(w.Temperature.Minimum.Value)}<sup>°</sup> -{toCelsius(w.Temperature.Maximum.Value)}<sup>°</sup> </p>
                                                : <p> {w.Temperature.Minimum.Value}<sup>℉</sup>-{w.Temperature.Maximum.Value} <sup>℉</sup> </p>
                                        }
                                    </p>

                                    <a href={w.Link} target='_blank' title={w.Link}>Read More&nbsp; <i className="fas fa-angle-double-right"></i></a>
                                </div>

                            </MDBCard>
                        </MDBAnimation>

                    </MDBCol>
                })

            }

        </>
    )
}

export default Day
