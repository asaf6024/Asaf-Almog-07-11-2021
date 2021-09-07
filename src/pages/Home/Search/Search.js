import { MDBCol, MDBContainer, MDBRow, MDBIcon } from 'mdbreact'
import React, { useState, useEffect } from 'react'
import cityObj from '../../../dist/obj/cityObj';
import { withRouter } from 'react-router';
import _ from "lodash";

// Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from 'react-redux'
import { getLocationsByName } from '../../../redux/location/location-actions'

import './search.css'
const Search = (props) => {

    const dispatch = useDispatch()

    // const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const [locations, setLocations] = useState([])
    const [displayFounded, setDisplayFounded] = useState('none')
    let suggestions = useSelector((state) => state.locationReducer.locations)

    useEffect(() => {
        // setLocations(cityObj)
        // setSearch('London')

        console.log('suggestions', suggestions)
        setLocations(suggestions)

    }, [suggestions])


    const debounceFindCity = _.debounce((e) => {
        setLocations(cityObj)
        // setSearch('London')
        // setSearch(e.target.value)
        setDisplayFounded('block')
        // dispatch(getLocationsByName(e.target.value)).then((res) => {
        //     setLoading(false)
        //     // console.log('suggestions print', props.suggestions)
        //     setLocations(suggestions)

        // })
    }, 500);

    return (
        <div className='container-fluid'>
            <MDBContainer>
                <MDBRow>
                    <MDBCol sm='12' lg='8' className='marginAuto text-center'>
                        <form className="form-inline mb-4">
                            <MDBIcon icon="search" />
                            <input className="form-control w-100"
                                type="text" placeholder="Search" aria-label="Search"
                                // value={search}
                                onChange={(e) =>
                                    debounceFindCity(e)
                                }
                                onFocus={(e) =>
                                    debounceFindCity(e)
                                }
                            />
                        </form>
                    </MDBCol>

                </MDBRow>
                <MDBRow>
                    <MDBCol sm='12'>
                        {
                            locations != null && locations.length > 0 &&
                            <div className='locationsFounded text-center' style={{ display: displayFounded }}>
                                {locations.slice(0, 10).map((l) => {
                                    return <p onClick={() => {
                                        props.setCityKey(l.Key)
                                        props.setCityName(`${l.LocalizedName}, ${l.Country.LocalizedName}`)
                                        props.setCountryId(l.Country.ID)
                                        setDisplayFounded('none')

                                    }}>
                                        {l.LocalizedName},&nbsp;
                                        {l.Country.LocalizedName}
                                    </p>
                                })
                                }
                            </div>
                        }
                    </MDBCol>
                </MDBRow>
                {/* <MDBRow>
                    <MDBCol sm='12' lg='8' className='marginAuto'>
                        {
                            locations.length > 0 &&
                            <select className='form-control' onChange={(e) => {
                                props.setCityKey(e.target.value)
                                props.setCityName(e.target.id)
                            }}>
                                <option value={0}>Choose..
                                </option>

                                {
                                    locations.map(l => {
                                        return (
                                            <option value={l.Key} id={l.LocalizedName} key={l.key}>
                                                {l.LocalizedName},&nbsp;
                                                {l.Country.LocalizedName}
                                            </option>
                                        )



                                    })}

                            </select>

                        }
                    </MDBCol>
                </MDBRow> */}
            </MDBContainer>
        </div>
    )
}

export default Search
