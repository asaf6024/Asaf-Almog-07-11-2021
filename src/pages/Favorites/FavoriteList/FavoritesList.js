import { MDBCard, MDBCol, MDBRow } from "mdbreact";
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import { getFavorites, deleteFavoriteById } from '../../../redux/favorites/favorites-actions';

const FavoriteList = (props) => {

    const [favoritesItems, setFavoritesItems] = useState([])
    let favoritesState = useSelector((state) => state.favoritesReducer.favorites)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(getFavorites()).then(() => {
            setFavoritesItems(favoritesState)
        })
        localStorage.removeItem('favoritesStorage')
        localStorage.setItem('favoritesStorage', JSON.stringify(favoritesState));
    }, [favoritesState])



    const deleteFavorite = (id) => {
        dispatch(deleteFavoriteById(id)).then(() => {
            setFavoritesItems(favoritesState)
        })
    }
    return (
        <MDBCol sm='12' lg='12' className='marginAuto'>
            <MDBRow>
                {
                    favoritesItems.length > 0 ?
                        favoritesItems.map(f => {
                            console.log('f', f)
                            return <MDBCol sm='4' className='text-center marginAuto' >
                                <MDBCard key={f.ID} style={{ margin: '15px' }} className='cursorPointer' onClick={() => {
                                    history.push({
                                        pathname: '/',
                                        state: {
                                            cityFromFavorites: {
                                                cityKey: f.ID,
                                                cityName: f.Name,
                                                Temperature: {
                                                    Metric: {
                                                        Value: 26
                                                    }
                                                },
                                                CountryId: f.CountryId,
                                                WeatherText: f.Current
                                            }
                                        }
                                    })
                                }}>
                                    <h2 className='font-weight-bolder'>{f.Name}</h2>
                                    <p className='font-italic'>{f.Current}</p>
                                    {
                                        f.Current.includes('Sunny') ?
                                            <i className="fas fa-sun fa-2x"></i>
                                            : f.Current.includes('cloud') ?
                                                f.Current.includes('shower') ?
                                                    <i className="fas fa-cloud-moon-rain fa-2x"></i>
                                                    : <i className="fas fa-cloud-sun fa-2x"></i>
                                                : ''
                                    }
                                    <br />
                                    <a className='bg-danger' onClick={() => deleteFavorite(f.ID)}>
                                        <i className="fas fa-trash"></i>
                                    </a>
                                    <a className='bg-primary'>Read More</a>
                                </MDBCard>
                            </MDBCol>

                        })
                        :

                        <MDBCol sm='12'>
                            <MDBCard className='text-center'>
                                <h2>Favorite list is Empty</h2>
                                <Link to='/'>
                                    <i className="far fa-plus-square fa-5x cursorPointer"></i>
                                </Link>
                            </MDBCard>
                        </MDBCol>
                }
            </MDBRow>
        </MDBCol >
    )
}




export default FavoriteList
