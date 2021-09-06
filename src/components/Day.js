import React, { useEffect, useState } from 'react'
import { MDBCard, MDBCol, MDBContainer, MDBRow } from 'mdbreact'
import moment from "moment";

import { withRouter } from 'react-router';

// Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from 'react-redux'
import { getWeatherOfNextFiveDays } from '../redux/weather/weather-actions';

import fiveDays from '../dist/fiveDays';
const Day = (props) => {

    const [city, setCity] = useState('')
    const [weakWeather, setWeakWeather] = useState([])
    const dispatch = useDispatch()
    let day = new Date()
    useEffect(() => {
        console.log('Day city', props.cityKey)
        dispatch(getWeatherOfNextFiveDays(props.cityKey)).then(() => {
            setWeakWeather(fiveDays.DailyForecasts)
            console.log('weakWeather', weakWeather)
        })

    }, [props.cityKey])


    return (
        <>
            {
                weakWeather.length > 0 &&
                weakWeather.map(w => {
                    return <MDBCol sm='6' lg='2'>
                        <MDBCard>
                            <div className='marginAuto'>
                                <h4>{moment(w.Date).format('dddd')}</h4>

                                <p>{w.Temperature.Maximum.Value}-{w.Temperature.Minimum.Value} F</p>
                            </div>
                        </MDBCard>
                    </MDBCol>
                })


            }
            {/* <MDBCol sm='6' lg='2'>
                <MDBCard>
                    <h4>Sun</h4>
                    <p>38^</p>
                </MDBCard>
            </MDBCol>
            <MDBCol sm='6' lg='2'>
                <MDBCard>
                    <h4>Sun</h4>
                    <p>38^</p>
                </MDBCard>
            </MDBCol>
            <MDBCol sm='6' lg='2'>
                <MDBCard>
                    <h4>Sun</h4>
                    <p>38^</p>
                </MDBCard>
            </MDBCol>
            <MDBCol sm='6' lg='2'>
                <MDBCard>
                    <h4>Sun</h4>
                    <p>38^</p>
                </MDBCard>
            </MDBCol> */}
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        weakWeather: state.weatherReducer.weakWeather
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            getWeatherOfNextFiveDays
        },
        dispatch
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Day))
