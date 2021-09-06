import { MDBCol, MDBContainer, MDBRow, MDBIcon } from 'mdbreact'
import React, { useState, useEffect } from 'react'

import { withRouter } from 'react-router';

// Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from 'react-redux'
import { getLocationByName } from '../../redux/location/location-actions'

import './search.css'
const Search = (props) => {

    // const suggestions = useSelector((state) => state.location)
    let suggestions = useSelector(state => state.location);

    const dispatch = useDispatch()

    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const [locations, setLocations] = useState([])
    const setSubmited = e => {
        e.preventDefault()
        dispatch(getLocationByName(search)).then(() => {
            setLoading(false)
            console.log('suggestions print', props.suggestions)
            setLocations(props.suggestions)
        })
    }
    return (
        <div className='container-fluid'>
            <MDBContainer>
                <MDBRow>
                    <MDBCol sm='12' lg='8' className='marginAuto'>
                        <form className="form-inline mt-4 mb-4" onSubmit={(e) => setSubmited(e)}>
                            <MDBIcon icon="search" />
                            <input className="form-control form-control-sm ml-3 w-75"
                                required
                                type="text" placeholder="Search" aria-label="Search"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button type='submit'>Serach</button>
                        </form>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
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
                                            <option value={l.Key} id={l.LocalizedName}>
                                                {l.LocalizedName},&nbsp;
                                                {l.Country.LocalizedName}
                                            </option>
                                        )



                                    })}

                            </select>

                        }
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        suggestions: state.locationReducer.location
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            getLocationByName
        },
        dispatch
    );
};
// export default connect(mapStateToProps, mapDispatchToProps)(UpdateOrderProduducts);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Search))
