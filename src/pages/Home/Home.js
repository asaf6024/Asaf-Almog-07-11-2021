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

    useEffect(() => {
        // if (lat != '') {
        setCityKey(711822)
        setCityName('Tel Aviv, Israel')
        // }

        // if (lat != '' && lng != '')
    }, [])


    // useEffect(() => {
    //     // console.log('lat', lat)
    //     // console.log('lon', lon)
    // }, [lat, lon])
    return (
        <div className='container-fluid'>
            <MDBContainer>
                <h1 className='text-center font-weight-bold'> Weather Forecast</h1>
                <Geolocation
                    setLat={setLat}
                    setLon={setLon}
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