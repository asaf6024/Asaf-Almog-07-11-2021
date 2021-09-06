import { MDBContainer } from 'mdbreact'
import React, { useState } from 'react'
import Search from '../components/Search/Search'
import Weather from '../components/Weather'

const Home = () => {
    const [cityKey, setCityKey] = useState(711822)
    const [cityName, setCityName] = useState('Tel Aviv')
    return (
        <div className='container-fluid'>
            <MDBContainer>
                <Search
                    setCityKey={setCityKey}
                    setCityName={setCityName}
                />
                {/* {
                    city != null && */}
                <Weather
                    cityKey={cityKey}
                    cityName={cityName}
                />
                {/* } */}
            </MDBContainer>
        </div>
    )
}
export default Home