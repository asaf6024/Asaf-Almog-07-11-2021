import React, { useEffect, useState } from "react";
import { MDBCard, MDBCol, MDBRow } from "mdbreact";
import { useHistory } from 'react-router-dom';
import { toFahrenheit } from 'celsius'
import _ from "lodash";
import { MDBTooltip } from 'mdbreact'

//object
import imagesOfWeather from "../../../dist/obj/imagesOfWeather";

//css
import './favoriteList.css'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import { getFavorites, deleteFavoriteById } from '../../../redux/favorites/favorites-actions';

const FavoriteList = () => {

    const [favoritesItems, setFavoritesItems] = useState([])
    const dispatch = useDispatch()
    const history = useHistory()

    //redux STATES
    let favoritesState = useSelector((state) => state.favoritesReducer.favorites)
    let degreeState = useSelector((state) => state.degreesReducer.degree)

    //get FAVORITES when page renderd
    useEffect(() => {

        dispatch(getFavorites()).then(() => {
            setFavoritesItems(favoritesState)
        })

        //delete current local storage
        localStorage.removeItem('favoritesStorage')

        //add a new local storage
        localStorage.setItem('favoritesStorage', JSON.stringify(favoritesState));

    }, [favoritesState])


    const deleteFavorite = (id) => {
        document.getElementById(`favoritecard${id}`).classList.add('fadeOut')
        debounceDeleteFavorite(id)
    }

    //delete favorite selected after 0.5 second 
    const debounceDeleteFavorite = _.debounce((id) => {

        dispatch(deleteFavoriteById(id)).then(() => {
            // 
            setFavoritesItems(favoritesState)
        })
    }, 500);

    return (
        <MDBRow>
            {
                favoritesItems.length > 0 ?
                    favoritesItems.map(f => {
                        return <MDBCol sm='12' lg='4' className='text-center marginAuto animated fadeIn animated fadeIn' key={f.ID}>

                            <MDBCard id={`favoritecard${f.ID}`} style={{ margin: '15px' }}
                                className='customCard cursorPointer animated'
                                onClick={(e) => {

                                    if (e.target.className != 'card__overlay'
                                        && e.target.className != 'card__description bg-danger'
                                        && e.target.tagName != 'A'
                                        && e.target.tagName != 'I') {

                                        history.push({
                                            pathname: '/',
                                            state: {
                                                cityFromFavorites: {
                                                    cityKey: f.ID,
                                                    cityName: f.Name,
                                                    Temperature: {
                                                        Metric: {
                                                            Value: f.Degrees
                                                        }
                                                    },
                                                    CountryId: f.CountryId,
                                                    WeatherText: f.Current
                                                }
                                            }
                                        })
                                    }

                                }}>

                                {
                                    f.Name.split(',').map((n, index) => {

                                        return index == 0 ?

                                            <h2 key={`customHeadline${index}`}
                                                className='customHeadline' style={{ marginTop: '50px' }}> {n}
                                            </h2>

                                            : <div key={`wrapper${index}`} className="wrapper">
                                                <div className="ribbon-wrapper-red">

                                                    <div className="ribbon-country">
                                                        <span className='fontVarianteSmallCaps'
                                                            style={n.length > 8 ? { fontSize: 'x-small' } : {}}
                                                        >{n}
                                                        </span>
                                                    </div>

                                                </div>

                                                {/* <div className="ribbon-wrapper-green">

                                                    <div className="ribbon-green">
                                                        <img className=''
                                                            src={`https://www.countryflags.io/${f.CountryId != undefined ? f.CountryId : ''}/shiny/64.png`}>
                                                        </img>
                                                    </div>

                                                </div> */}
                                            </div>

                                    })
                                }

                                <p className='font-italic'>{f.Current}</p>

                                {
                                    imagesOfWeather.map(image => {
                                        if (f.Current.includes(`${image.type}`)) {
                                            return <img key={image.id}
                                                className='imageOfWeather'
                                                src={image.src}
                                                alt={image.alt} height="50"
                                            />
                                        }
                                    })
                                }

                                <p style={{ fontSize: 'x-large' }}>
                                    {
                                        degreeState == 'Celsius' ?
                                            <span id='degrees'> {f.Degrees}° <sup></sup></span>
                                            : <span id='degrees'> {toFahrenheit(f.Degrees)}<sup>℉</sup></span>
                                    }
                                </p>

                                <div className="card__overlay">

                                    <div className='card__description bg-danger'>
                                        <a className='trashLink'>

                                            <MDBTooltip
                                                domElement
                                                tag="span"
                                                placement="top"
                                            >
                                                <i className="fas fa-trash animated fadeIn text-white"
                                                    onClick={() => deleteFavorite(f.ID)}>
                                                </i>
                                                <span>Delete</span>
                                            </MDBTooltip>

                                        </a>
                                    </div>
                                </div>

                            </MDBCard>
                        </MDBCol>
                    })
                    :
                    <MDBCol sm='12'>
                        <MDBCard className='text-center customCard animated fadeIn'>
                            <h2>Favorite list is Empty</h2>
                            <Link to='/' className='linkOfIcon'>
                                <i className="far fa-plus-square fa-5x cursorPointer"></i>
                            </Link>
                        </MDBCard>
                    </MDBCol>
            }
        </MDBRow >
    )
}
export default FavoriteList
