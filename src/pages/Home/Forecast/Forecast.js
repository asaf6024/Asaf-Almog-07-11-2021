import React, { useEffect, useState } from 'react'

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
        setCurrent(currentWeatherState)
    }, [getCurrentWeather])

    const apiCall = (city) => {
        // console.log('in apiCall', city)
        if (city != null && city != undefined)
            debounceApi(city)

    }

    //api call after 0.5 seconds
    const debounceApi = _.debounce((city) => {

        dispatch(getCurrentWeather(city)).then(() => {
            // console.log('current', current)

            // if (currentWeatherState != undefined)
            //     setCurrent(currentWeatherState)
        })
    }, 500);

    // show location from input SEARCH
    useEffect(() => {

        if (location.state == undefined) {

            // console.log('inside Searched location')

            //**fake api**
            // setCurrent(currentOj)

            //initial Tel Aviv Location
            if (props.cityName == '' && props.lat == '' & props.lon == '') {

                // ** api **
                apiCall(props.cityKey != null ? props.cityKey : '215854')

                props.setCityName('Tel Aviv, Israel')
                props.setCountryId('IL')
            }
            else
                apiCall(props.cityKey)

            initialIcons()
        }

    }, [props.cityKey, props.cityName])

    // //*****set STATE from input SEARCHED result******
    // useEffect(() => {
    //     if (location.state == undefined) {
    //         console.log('in searched result useffect state', currentWeatherState)

    //         //**fake api**
    //         // setCurrent(currentOj)

    //         // if (currentWeatherState != undefined)
    //         //     // ** api **
    //         //     setCurrent(currentWeatherState)


    //     }

    // }, [currentWeatherState])


    //show location from FAVORITE
    useEffect(() => {
        if (location.state != undefined) {
            // console.log('inside Favorite location', location.state)

            //**fake api** set state from FAVORITES page (only when fake api)

            props.setCityKey(location.state.cityFromFavorites.cityKey)
            props.setCityName(location.state.cityFromFavorites.cityName)

            //**api**
            apiCall(location.state.cityFromFavorites.cityKey)

        }

    }, [location.state])

    //set STATE from Favorited result
    useEffect(() => {
        if (props.cityName != '') {

            // console.log('insite favorite STATE', props.cityName)

            let keyOfCity;

            //set key from favorite & state from api
            if (location.state != undefined) {
                keyOfCity = location.state.cityFromFavorites.cityKey
                props.setCountryId(location.state.cityFromFavorites.CountryId)
            }
            //set key from searched
            else
                keyOfCity = props.cityKey

            favoritesState.map(f => {
                if (f.ID == keyOfCity && !favoritedChanged) {
                    setHeartIcon('fas fa-heart')
                    setFavoriteText('Remove from Favorites')
                }

            })

            localStorage.setItem('favoritesStorage', JSON.stringify(favoritesState));

        }

    }, [favoritesState, props.cityName])


    //show location from GEOLOCATION
    useEffect(() => {

        if (location.state == undefined && props.lat != '' & props.lon != '') {

            // console.log('inside Online location')

            //**fake api**
            // props.setCityKey(onlineLocationObj.Key)
            // props.setCityName(`${onlineLocationObj.LocalizedName}, ${onlineLocationObj.Country.LocalizedName}`)
            // props.setCountryId(onlineLocationObj.Country.ID)

            //**api**
            dispatch(getLocationByGeoposition(props.lat, props.lon))

        }

    }, [props.lat, props.lon])

    //*****set STATE from GEOLOCATION******
    useEffect(() => {
        if (location.state == undefined && props.lat != '' & props.lon != '') {
            // console.log('in Geolocation useffect state', geoPositionState)

            //**api**
            props.setCityKey(geoPositionState.Key)
            props.setCityName(geoPositionState.LocalizedName)
            apiCall(geoPositionState.Key)
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
            // console.log('in delete')
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
            // alert('add to favorites')
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

                                        <img className='m0'
                                            alt={c.CountryId != undefined ? c.CountryId : props.countryId}
                                            src={`https://www.countryflags.io/${c.CountryId != undefined ? c.CountryId : props.countryId}/shiny/64.png`}>
                                        </img>

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
