import React from "react";
import { MDBTooltip } from 'mdbreact'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { deleteFavorites } from '../../../redux/favorites/favorites-actions'

const DeleteAllFavorites = () => {
    const dispatch = useDispatch()
    let favoritesState = useSelector((state) => state.favoritesReducer.favorites)
    return (
        <>
            {
                favoritesState.length > 0 &&
                <MDBTooltip
                    domElement
                    tag="span"
                    placement="top"
                >
                    <i
                        onClick={() => dispatch(deleteFavorites()).then(() => {
                            localStorage.removeItem('favoritesStorage')
                        })}
                        className="fas fa-trash fa-3x cursorPointer text-white">

                    </i>
                    <span>Delete all Favorites</span>
                </MDBTooltip>

            }
        </>

    )
}
export default DeleteAllFavorites