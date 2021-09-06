import Day from './Day'
import { MDBCard, MDBCol, MDBContainer, MDBRow } from 'mdbreact'
import React, { useEffect, useState } from 'react'

import { withRouter } from 'react-router';

// Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from 'react-redux'
import { getWeatherByKey } from '../redux/weather/weather-actions';

const Weather = (props) => {
    const dispatch = useDispatch()
    const [current, setCurrent] = useState(null)

    useEffect(() => {

        console.log('cityKey', props.cityKey)
        // dispatch(getWeatherByKey(props.cityKey)).then(() => {
        //     setCurrent(props.currentWeather)
        //     console.log('props.currentWeather', props.currentWeather)
        // })
    }, [props.cityKey])


    return (
        <div className='container-fluid'>
            <MDBContainer>
                <MDBRow>
                    <MDBCol sm='12'>
                        <MDBCard className='CardOfWeather'>

                            {/* {console.log('current', current)} */}
                            {
                                current != null &&
                                current.map(c => {
                                    return <>
                                        <MDBRow>
                                            <MDBCol sm='12' lg='6' className='text-left'>
                                                <h2>{props.cityName}</h2>
                                                <p>{c.Temperature.Metric.Value} </p>
                                            </MDBCol>


                                            <MDBCol sm='12' lg='6' className='text-right'>
                                                <i className="fas fa-heart fa-2x"></i>
                                                <button>Add to Favorites</button>
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow>

                                            <MDBCol sm='12' className='text-center'>
                                                <h3>{c.WeatherText}</h3>
                                            </MDBCol>
                                        </MDBRow>
                                    </>
                                })

                            }
                            <MDBRow>
                                <Day cityKey={props.cityKey} />
                            </MDBRow>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        currentWeather: state.weatherReducer.currentWeather
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            getWeatherByKey
        },
        dispatch
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Weather))

