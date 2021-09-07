import Day from './Day/Day';
import { MDBCard, MDBCol, MDBContainer, MDBRow } from 'mdbreact'
import React, { useEffect, useState } from 'react'

import { useLocation } from "react-router-dom";

import currentOj from '../../../dist/obj/currentObj';
import { toCelsius, toFahrenheit } from 'celsius'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { getForecast } from '../../../redux/weather/weather-actions';
import { addToFavorites, deleteFavoriteById } from '../../../redux/favorites/favorites-actions';

const Forecast = (props) => {
    const dispatch = useDispatch()
    const [current, setCurrent] = useState(null)
    const [heartIcon, setHeartIcon] = useState('far fa-heart')
    const [favoriteText, setFavoriteText] = useState('Add to Favorites')
    let favoritesState = useSelector((state) => state.favoritesReducer.favorites)
    let currentWeatherOfCity = useSelector((state) => state.weatherReducer.currentWeather)
    let degreeState = useSelector((state) => state.degreesReducer.degree)

    const location = useLocation();

    //*****set current weather from api - first useEffect******
    useEffect(() => {
        // console.log('cityKey', props.cityKey)

        //להפעיל את זה במקום  הסט שמתחת
        // if (location.state != undefined && location.state != null)
        //     apiCall(location.state.cityFromFavorites.cityKey)
        // else
        //     apiCall(props.cityKey)

        //set to api obj
        // dispatch(getForecast(props.cityKey)).then(() => {
        //     setCurrent(props.currentWeather)
        //     console.log('props.currentWeather', props.currentWeather)
        // })

        initialIcons();

    }, [props.cityKey])

    // const apiCall = (city) => {
    //     dispatch(getForecast(city)).then(() => {
    //         setCurrent(props.currentWeather)
    //         console.log('props.currentWeather', props.currentWeather)
    //     })
    // }

    // ////*****set current weather from api - second useEffect******
    // useEffect(() => {
    //     setCurrent(currentWeatherOfCity)
    // })

    //*****set current weather from object ******
    useEffect(() => {
        console.log('cityKey', props.cityKey)

        if (location.state != undefined && location.state != null)
            setCurrent([location.state.cityFromFavorites])
        else
            setCurrent(currentOj)
        initialIcons()

        if (props.cityName == '')
            props.setCityName('Tel Aviv')

    }, [props.cityKey, props.cityName])



    //set Favorited item
    useEffect(() => {
        // console.log('favoritest is ', favoritesState)
        favoritesState.map(f => {
            if (f.Name == props.cityName) {
                setHeartIcon('fas fa-heart')
                setFavoriteText('Remove from Favorites')
            }
        })
        localStorage.setItem('favoritesStorage', JSON.stringify(favoritesState));
    }, [favoritesState, props.cityName])

    const initialIcons = () => {
        setFavoriteText('Add to Favorites')
        setHeartIcon('far fa-heart')
    }

    const addOrDeleteFavorite = () => {
        if (favoriteText.includes('Add'))
            addFavorite()
        else
            deleteFavorite()
    }

    const deleteFavorite = () => {
        dispatch(deleteFavoriteById(props.cityKey)).then(() => {
            setHeartIcon('far fa-heart')
            setFavoriteText('Add to Favorites')
        })
    }

    const addFavorite = () => {
        let favorite = {
            CountryId: props.countryId,
            ID: props.cityKey,
            Name: props.cityName,
            Current: document.getElementById('currentWeather').innerText
        }
        dispatch(addToFavorites(favorite)).then(() => {
            // alert('add to favorites')
            setHeartIcon('fas fa-heart')
            setFavoriteText('Remove from Favorites')
        })
    }
    return (
        <div className='container-fluid'>
            <MDBContainer>

                <MDBCard className='CardOfWeather col-sm-12'>

                    {/* {console.log('current', current)} */}
                    {
                        current != null &&
                        current.map((c, index) => {
                            console.log('props.countryId', c.CountryId)
                            return <>
                                <MDBRow key={index}>
                                    <MDBCol sm='12' lg='4' className='text-center'>

                                        <h2 className='font-weight-bold' style={{ fontSize: 'xxx-large' }}>
                                            {c.cityName != undefined ? c.cityName : props.cityName}</h2>
                                        {/* <img src={`https://www.countryflags.io/${c.CountryId != undefined ? c.CountryId : props.countryId}/flat/64.png`}>
                                                        </img> */}

                                        <p style={{ fontSize: 'x-large' }}>
                                            {
                                                degreeState == 'Celsius' ?
                                                    <span> {c.Temperature.Metric.Value} <sup>°</sup></span>
                                                    : <span>  {toFahrenheit(c.Temperature.Metric.Value)}<sup>℉</sup></span>
                                            }
                                        </p>


                                    </MDBCol>

                                    <MDBCol sm='12' lg='4' className='text-center'>
                                        {
                                            c.WeatherText.includes('Sunny') ?
                                                <i className="fas fa-sun fa-4x"></i>
                                                : c.WeatherText.includes('cloud') ?
                                                    c.WeatherText.includes('shower') ?
                                                        <i className="fas fa-cloud-moon-rain fa-4x"></i>
                                                        : <i className="fas fa-cloud-sun fa-4x"></i>
                                                    : c.WeatherText.includes('Clowdy') ?
                                                        <i className=" fas fa-cloud-sun fa-4x"></i>
                                                        : ''

                                        }
                                        <h3 id='currentWeather'>{c.WeatherText}</h3>
                                    </MDBCol>

                                    <MDBCol sm='12' lg='4' className='text-center'>

                                        <p style={{ cursor: 'pointer' }}
                                            onClick={() => addOrDeleteFavorite()}
                                        ><i className={`${heartIcon} fa-2x`}></i>
                                            <br />{favoriteText}</p>
                                    </MDBCol>

                                </MDBRow>
                            </>
                        })

                    }
                    <hr />
                    <MDBRow>
                        <Day cityKey={props.cityKey} />
                    </MDBRow>
                </MDBCard>

            </MDBContainer>
        </div>
    )
}
// const mapStateToProps = (state) => {
//     return {
//         currentWeather: state.weatherReducer.currentWeather,
//         favorites: state.favoritesReducer.favorites
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators(
//         {
//             getForecast,
//             addToFavorites
//         },
//         dispatch
//     );
// };
// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Weather))
export default Forecast
