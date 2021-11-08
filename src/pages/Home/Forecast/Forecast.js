import React, { useCallback, useEffect, useState } from 'react'

import { MDBCard, MDBCol, MDBRow } from 'mdbreact'
import { toFahrenheit } from 'celsius'
import { useLocation } from "react-router-dom";
import _ from "lodash";

//components
import Spinner from '../../../components/Spinner/Spinner'
import Day from './Day/Day';

//css
import './forecast.css'

//object
import imagesOfWeather from '../../../dist/obj/imagesOfWeather';

//fakeApi
// import { currentOj, onlineLocationObj } from '../../../dist/obj/fakeApi';

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { getCurrentWeather } from '../../../redux/weather/weather-actions';
import { addToFavorites, deleteFavoriteById } from '../../../redux/favorites/favorites-actions';
import { getLocationByGeoposition } from '../../../redux/location/location-actions';

const Forecast = (props) => {
    const [current, setCurrent] = useState(null)
    const [heartIcon, setHeartIcon] = useState('far fa-heart')
    const [favoriteText, setFavoriteText] = useState('Add to Favorites')
    const [favoritedChanged, setFavoritedChanged] = useState(false)
    const location = useLocation();
    const dispatch = useDispatch()

    //redux states
    let favoritesState = useSelector((state) => state.favoritesReducer.favorites)
    let currentWeatherState = useSelector((state) => state.weatherReducer.currentWeather)
    let degreeState = useSelector((state) => state.degreesReducer.degree)
    let geoPositionState = useSelector((state) => state.locationReducer.geoPosition)

    //set current state when result returns from api
    useEffect(() => {

        if (currentWeatherState != undefined)
            setCurrent(currentWeatherState)

    }, [currentWeatherState])

    const apiCall = (city) => {

        if (city != null && city != undefined)
            debounceApi(city)
    }

    //api call after 0.5 seconds
    const debounceApi = _.debounce((city) => {

        dispatch(getCurrentWeather(city)).then(() => {

            if (currentWeatherState != undefined)
                setCurrent(currentWeatherState)
        })

    }, 500);

    //initial api call for SEARCHED location 
    useEffect(() => {

        if (location.state == undefined) {


            //**fake api**
            // setCurrent(currentOj)

            //initial Location to Tel Aviv 
            if (props.cityName == '' && props.lat == '' & props.lon == '') {

                // ** api **
                apiCall(props.cityKey != null ? props.cityKey : '215854')
                props.setCityName('Tel Aviv Port, Israel')
                props.setCountryId('IL')
            }

            //initial Location to city from geolocation / searched
            else if (props.cityKey != undefined) {
                // ** api **
                apiCall(props.cityKey)
            }

            initialIcons()
        }

    }, [props.cityKey, props.cityName])


    //initial api call for FAVORITE location (when navigate from favorite page)
    useEffect(() => {

        if (location.state != undefined) {

            //**fake api** set state from FAVORITES page (only when fake api)
            // setCurrent(location.state)

            props.setCityKey(location.state.cityFromFavorites.cityKey)
            props.setCityName(location.state.cityFromFavorites.cityName)

            //**api**
            apiCall(location.state.cityFromFavorites.cityKey)

        }

    }, [location.state])

    //set STATE if city includes in Favorites
    useEffect(() => {
        if (props.cityName != '') {

            let keyOfCity;

            //set key from favorite & state from api
            if (location.state != undefined) {
                keyOfCity = location.state.cityFromFavorites.cityKey
                props.setCountryId(location.state.cityFromFavorites.CountryId)
            }

            //set key from searched
            else
                keyOfCity = props.cityKey

            //update icons 
            favoritesState.map(f => {
                if (f.ID == keyOfCity && !favoritedChanged) {
                    setHeartIcon('fas fa-heart')
                    setFavoriteText('Remove from Favorites')
                }

            })

            //update local storage
            localStorage.setItem('favoritesStorage', JSON.stringify(favoritesState));

        }

    }, [favoritesState, props.cityName])


    //initial api call for GEOLOCATION bt lat & lon
    useEffect(() => {

        if (location.state == undefined && props.lat != '' & props.lon != '' && geoPositionState != undefined) {

            //**fake api**
            // props.setCityKey(onlineLocationObj.Key)
            // props.setCityName(`${onlineLocationObj.LocalizedName}, ${onlineLocationObj.Country.LocalizedName}`)
            // props.setCountryId(onlineLocationObj.Country.ID)

            //**api**
            dispatch(getLocationByGeoposition(props.lat, props.lon))

        }

    }, [props.lat, props.lon])

    //set STATE from GEOLOCATION
    useEffect(() => {
        if (location.state == undefined && props.lat != '' & props.lon != '') {

            //**api**
            props.setCityKey(geoPositionState.Key)
            props.setCityName(`${geoPositionState.LocalizedName}, ${geoPositionState.Country.EnglishName}`)
            props.setCountryId(geoPositionState.Country.ID)

        }
    }, [geoPositionState])


    const initialIcons = () => {
        setFavoriteText('Add to Favorites')
        setHeartIcon('far fa-heart')
    }

    const addOrDeleteFavorite = () => {
        setFavoritedChanged(true)
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
            Current: document.getElementById('currentWeather').innerText,
            Degrees: document.getElementById('degrees').innerText
        }

        dispatch(addToFavorites(favorite)).then(() => {
            setHeartIcon('fas fa-heart')
            setFavoriteText('Remove from Favorites')
        })

    }
    return (
        <>

            {
                current != undefined ?
                    current.map((c, index) => {
                        let nameOfCity = ''
                        c.cityName != undefined ? nameOfCity = c.cityName : nameOfCity = props.cityName

                        return <React.Fragment key={index}>
                            <MDBCard className='CardOfWeather col-sm-12 customCard' style={{ padding: '0' }}>

                                <MDBRow>

                                    <MDBCol sm='12'>
                                        <h3 className='customHeadline text-center marginAuto'> Current Weather</h3>
                                    </MDBCol>

                                    <MDBCol sm='12' lg='4' className='text-center marginAuto'>

                                        {
                                            nameOfCity.split(',').map((n, i) => {
                                                return i == 0 ?
                                                    <h2 key={`city${i}`}
                                                        style={n.length > 8 ? { fontSize: '30px' } : {}}
                                                        className='cityHeadline'> {n}</h2>
                                                    : <h3 key={`country${i}`}
                                                        className='fontVarianteSmallCaps customHeadline countryHeadline'>
                                                        {n}
                                                    </h3>
                                            })
                                        }

                                        {/* <img className='m0'
                                            alt={c.CountryId != undefined ? c.CountryId : props.countryId}
                                            src={`https://www.countryflags.io/${c.CountryId != undefined ? c.CountryId : props.countryId}/shiny/64.png`}>
                                        </img> */}

                                    </MDBCol>

                                    <MDBCol sm='12' lg='4' className='text-center marginAuto'>
                                        {
                                            imagesOfWeather.map((image, indexOfImg) => {
                                                if (c.WeatherText.includes(`${image.type}`))
                                                // if (c.WeatherText == image.type)
                                                {
                                                    return <img
                                                        className='imageOfWeather'
                                                        key={indexOfImg}
                                                        src={image.src}
                                                        alt={image.alt} height="150"
                                                        style={{ maxWidth: '100%' }
                                                        } />
                                                }
                                            })
                                        }

                                        <p id='currentWeather' className='font-wight-bolder'>{c.WeatherText}</p>

                                        <p style={{ fontSize: 'x-large' }}>
                                            {
                                                degreeState == 'Celsius' ?
                                                    <span><span id='degrees'
                                                        className='degressOfToday'>{c.Temperature.Metric.Value}
                                                    </span>
                                                        <sup className='degressOfTodaySup'> °</sup>
                                                    </span>
                                                    : <span> <span id='degrees'
                                                        className='degressOfToday'>{toFahrenheit(c.Temperature.Metric.Value)}
                                                    </span>
                                                        <sup className='degressOfTodaySup'> ℉</sup>
                                                    </span>
                                            }
                                        </p>
                                    </MDBCol>

                                    <MDBCol sm='12' lg='4' className='text-center marginAuto'>
                                        <p style={{ cursor: 'pointer' }}
                                            onClick={() => addOrDeleteFavorite()}>
                                            <i className={`${heartIcon} fa-2x`}></i>
                                            <br />{favoriteText}
                                        </p>
                                    </MDBCol>

                                </MDBRow>
                            </MDBCard>

                            <MDBRow>
                                <Day cityKey={props.cityKey} />
                            </MDBRow>

                        </React.Fragment>
                    })

                    : <>
                        <MDBRow>
                            <MDBCol sm='12' className='text-center'>
                                <Spinner />
                            </MDBCol>
                        </MDBRow>
                    </>
            }
        </>
    )
}
export default Forecast
