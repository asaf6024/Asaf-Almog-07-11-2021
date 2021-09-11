import React, { useEffect, useState } from 'react'
import Search from './Search/Search'
import Forecast from './Forecast/Forecast'
import Geolocation from './Geolocation/Geolocation'
import { MDBContainer } from 'mdbreact'

const Home = () => {
    const [cityKey, setCityKey] = useState(null)
    const [cityName, setCityName] = useState('')
    const [countryId, setCountryId] = useState('')
    const [lat, setLat] = useState('')
    const [lon, setLon] = useState('')

    return (
        <div className='container-fluid animated fadeIn'>
            <MDBContainer>
                <h1 className='text-center font-weight-bold'>Weather Forecast</h1>
                <Geolocation
                    setLat={setLat}
                    setLon={setLon}
                    setCityKey={setCityKey}
                    setCityName={setCityName}
                />
                {/* <Degrees /> */}
                <Search
                    setCityKey={setCityKey}
                    setCityName={setCityName}
                    setCountryId={setCountryId}
                    setLat={setLat}
                    setLon={setLon}
                />
                <Forecast
                    cityKey={cityKey}
                    cityName={cityName}
                    countryId={countryId}
                    setCountryId={setCountryId}
                    setCityName={setCityName}
                    setCityKey={setCityKey}
                    lat={lat}
                    lon={lon}
                />
            </MDBContainer>
        </div>
    )
}
export default Home