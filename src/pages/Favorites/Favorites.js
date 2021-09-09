import { MDBContainer, MDBRow, MDBCol } from 'mdbreact'
import React from 'react'
import DeleteAlFavorites from '../../components/DeleteAlFavorites/DeleteAlFavorites'
import FavoriteList from './FavoriteList/FavoritesList'

const Favorites = () => {
    return (
        <div className='container-fluid'>
            <MDBContainer>
                <h1 className='text-center font-weight-bold'>Favorites</h1>

                <MDBRow>
                    <MDBCol sm='12' lg='12' className='marginAuto'>
                        <FavoriteList />
                    </MDBCol >
                </MDBRow>

                <MDBRow>
                    <MDBCol sm='12' className='text-center'>
                        <DeleteAlFavorites />
                    </MDBCol>
                </MDBRow>

            </MDBContainer>
        </div>
    )
}
export default Favorites