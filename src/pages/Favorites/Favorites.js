import React from 'react'

import { MDBContainer, MDBRow, MDBCol } from 'mdbreact'

//components
import DeleteAllFavorites from './DeleteAlFavorites/DeleteAlFavorites'
import FavoriteList from './FavoriteList/FavoritesList'

//css
import './favorites.css'

const Favorites = () => {
    return (
        <div className='container-fluid'>
            <MDBContainer>

                <h1 className='text-center font-weight-bold'>Favorites</h1>

                <MDBRow>
                    <MDBCol sm='12' className='text-center'>
                        <DeleteAllFavorites />
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol sm='12' lg='12' className='marginAuto'>
                        <FavoriteList />
                    </MDBCol >
                </MDBRow>

            </MDBContainer>
        </div>
    )
}
export default Favorites