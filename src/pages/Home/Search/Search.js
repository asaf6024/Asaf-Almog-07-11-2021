import { MDBCol, MDBRow, MDBIcon } from 'mdbreact'
import React, { useState, useEffect } from 'react'
import _ from "lodash";
import { useHistory } from 'react-router-dom';

//components
import MyModal from '../../../components/Modal/MyModal'

//css
import './search.css'

//fakeApi
// import { cityObj } from '../../../dist/obj/fakeApi';

//Redux
import { useSelector, useDispatch } from 'react-redux'
import { getLocationsByName } from '../../../redux/location/location-actions'

const Search = (props) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const [locations, setLocations] = useState([])
    const [displayFounded, setDisplayFounded] = useState('none')
    const [modalShow, setModalShow] = useState(false)

    let locationState = useSelector((state) => state.locationReducer.location)

    //Set location STATE returned from api
    useEffect(() => {
        setLocations(locationState)

    }, [locationState])

    //Serach after 0.5 second of typing
    const debounceFindCity = _.debounce((e) => {

        props.setLat('')
        props.setLon('')
        setDisplayFounded('block')

        //initial favorites STATE when searching
        history.push({
            state: undefined
        })

        // //**fake api**
        // setLocations(cityObj)

        //**api**
        dispatch(getLocationsByName(e.target.value)).then((res) => {

        })
    }, 500);

    //validate typing only in English
    const validateEnglishLetters = (e) => {
        const regex = /^[a-zA-Z0-9 ]/;
        const chars = e.target.value.split('');
        const char = chars.pop();

        if (!regex.test(char)) {
            e.target.value = chars.join('');
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
                            onChange={(e) =>
                                validateEnglishLetters(e)
                            }
                            onFocus={(e) => locations != null && locations.length > 0 ?
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
                        <div className='locationsFounded text-center'
                            style={
                                locations.length < 2 ? { marginTop: '5px', display: displayFounded } :
                                    locations.length < 4 ? { marginTop: '35px', display: displayFounded } :
                                        locations.length < 8 ? { top: '65px', display: displayFounded } :
                                            locations.length < 15 ? { top: '180px', display: displayFounded } : ''}
                        >
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
