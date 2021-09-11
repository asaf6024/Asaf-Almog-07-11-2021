import { MDBCol, MDBRow, MDBIcon } from 'mdbreact'
import React, { useState, useEffect } from 'react'
import _ from "lodash";
import { useHistory } from 'react-router-dom';
import MyModal from '../../../components/Modal/MyModal'
import './search.css'

//fakeApi
// import cityObj from '../../../dist/obj/cityObj';
import { cityObj } from '../../../dist/obj/fakeApi';

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { getLocationsByName } from '../../../redux/location/location-actions'
import Spinner from '../../../components/Spinner/Spinner'

const Search = (props) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    const [locations, setLocations] = useState([])
    const [displayFounded, setDisplayFounded] = useState('none')
    const [modalShow, setModalShow] = useState(false)

    let locationState = useSelector((state) => state.locationReducer.location)

    //set location returned from api
    useEffect(() => {
        // console.log('locationState', locationState)

        //**api**
        setLocations(locationState)

    }, [locationState])

    //serach after 0.5 second of type
    const debounceFindCity = _.debounce((e) => {

        props.setLat('')
        props.setLon('')
        // setSearch(e.target.value)
        setDisplayFounded('block')

        //initial favorites state when searching
        history.push({
            state: undefined
        })

        // //**fake api**
        // setLocations(cityObj)

        //**api**
        dispatch(getLocationsByName(e.target.value)).then((res) => {
            setLoading(false)
            // console.log('locationState print', props.locationState)
            setLocations(locationState)

        })
    }, 500);

    const validateEnglishLetters = (e) => {
        const regex = /^[a-zA-Z0-9 ]/;
        const chars = e.target.value.split('');
        const char = chars.pop();
        if (!regex.test(char)) {
            e.target.value = chars.join('');
            // return alert(`${char} is not a valid character.`);
            setModalShow(true)
        }
        else
            return debounceFindCity(e)
    }
    return (
        <>
            <MDBRow>
                <MDBCol sm='12' lg='8' className='marginAuto text-center'>
                    <form className="form-inline mb-4">
                        <MDBIcon icon="search" />
                        <input className="form-control w-100"
                            type="text" placeholder="Search" aria-label="Search"
                            // value={search}
                            onChange={(e) =>
                                validateEnglishLetters(e)
                            }
                            onFocus={(e) => locations.length > 0 ?
                                validateEnglishLetters(e)
                                : setDisplayFounded('none')
                            }



                        />
                    </form>
                </MDBCol>
            </MDBRow>

            <MDBRow>
                <MDBCol sm='12'>
                    {
                        locations != null && locations.length > 0 &&
                        <div className='locationsFounded text-center animated fadeIn'
                            style={{ display: displayFounded }}>
                            <i className="fas fa-window-close fa-2x cursorPointer"
                                style={{ position: 'absolute', right: '0', top: '0' }}
                                onClick={() => setDisplayFounded('none')}
                            ></i>
                            {locations.slice(0, 10).map((l, index) => {
                                return <p key={index} onClick={() => {
                                    props.setCityKey(l.Key)
                                    props.setCityName(`${l.LocalizedName}, ${l.Country.LocalizedName}`)
                                    props.setCountryId(l.Country.ID)
                                    setDisplayFounded('none')

                                }}>
                                    <span className='font-weight-bolder'>{l.LocalizedName}</span>,&nbsp;
                                    <span className='fontVarianteSmallCaps font-weight-bolder'> {l.Country.LocalizedName}</span>
                                </p>
                            })
                            }
                        </div>
                    }
                </MDBCol>
            </MDBRow>

            <MyModal />
            <MyModal
                headlineText=''
                headlineBody='Only English is allowed'
                show={modalShow}
                onHide={() => setModalShow(false)}
                ButtonCloseText='Close'
            />
        </>
    )
}

export default Search
