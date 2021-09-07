import { MDBCol, MDBContainer, MDBRow } from 'mdbreact'
import React, { useEffect, useState } from 'react'
import Search from './Search/Search'
import Forecast from './Forecast/Forecast'
import Degrees from './Degrees/Degrees'

const Home = () => {
    const [cityKey, setCityKey] = useState(null)
    const [cityName, setCityName] = useState('')
    const [countryId, setCountryId] = useState('')
    useEffect(() => {
        setCityKey(711822)
        setCityName('')
    }, [])

    return (
        <div className='container-fluid'>
            <MDBContainer>
                <h1 className='text-center font-weight-bold'>Forecast Weather</h1>
                <Degrees />
                <Search
                    setCityKey={setCityKey}
                    setCityName={setCityName}
                    setCountryId={setCountryId}
                />
                {/* {
                    city != null && */}
                <Forecast
                    cityKey={cityKey}
                    cityName={cityName}
                    countryId={countryId}
                    setCityName={setCityName}
                />
                {/* } */}
            </MDBContainer>
        </div>
    )
}
export default Home