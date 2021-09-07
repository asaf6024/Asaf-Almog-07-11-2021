
export const getFavorites = () => {
    return (dispatch) => {
        // console.log('in getFavorites')
        dispatch({
            type: "GET_FAVORITES"
        });
        return Promise.resolve();
    }
};
export const getFavoriteById = (id) => {
    return (dispatch) => {
        dispatch({
            type: "GET_FAVORITE_BY_ID",
            payload: id
        });
        return Promise.resolve();
    }
};
export const addToFavorites = (favorite) => {
    return (dispatch) => {
        dispatch({
            type: "ADD_TO_FAVORITES",
            payload: favorite
        });
        return Promise.resolve();
    }
};
export const updateFavoriteById = (product) => {
    // console.log('update function', product)
    // alert('Updated successfully')
    return (dispatch) => {
        dispatch({
            type: "UPDATE_FAVORITE_BY_ID",
            payload: product
        });
        return Promise.resolve();
    }
};
export const deleteFavoriteById = (id) => {
    return (dispatch) => {
        dispatch({
            type: "DELETE_FAVORITE_BY_ID",
            payload: id
        });
        return Promise.resolve();
    }
};
export const deleteFavorites = () => {
    alert('All Favorites deleted')
    return (dispatch) => {
        dispatch({
            type: "DELETE_FAVORITES",
        });
        return Promise.resolve();
    }
};




