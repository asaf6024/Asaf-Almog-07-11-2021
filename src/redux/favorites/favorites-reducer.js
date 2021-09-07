
let favoritesFromStorage = JSON.parse(localStorage.getItem('favoritesStorage'))

const initialState = {
    favorites: favoritesFromStorage != null ? favoritesFromStorage : [],
    favorite: {}
};


export default function (state = initialState, action) {
    // console.log('action is', action)
    switch (action.type) {
        case "GET_FAVORITES":
            return { ...state };
        case "GET_FAVORITE_BY_ID":

            return {
                // Again copy the entire state object
                ...state,
                // This time, we need to make a copy of the old todos array
                favorite: state.favorites.map(f => {
                    // If this isn't the todo item we're looking for, leave it alone
                    if (f.id !== action.payload) {
                        return f
                    }

                    // We've found the todo that has to change. Return a copy:
                    return {
                        ...f,
                    }
                })
            };

        case "ADD_TO_FAVORITES":
            return {
                ...state,
                favorites: state.favorites.concat(action.payload)
            };
        case "UPDATE_FAVORITE_BY_ID":
            let myArray = [...state.favorites]
            //Find index of specific object using findIndex method.    
            let objIndex = state.favorites.findIndex((obj => obj.id == action.payload.id));
            myArray[objIndex] = action.payload;
            return {
                ...state,
                favorites: myArray
                // chart: state.chart.map(item => item.id == action.payload.id ? item = action.payload : item)
            };

        case "DELETE_FAVORITE_BY_ID":
            return { ...state, favorites: state.favorites.filter(c => c.ID != action.payload) };
        case "DELETE_FAVORITES":
            return { ...state, favorites: [] };
        default:
            return state;
    }
}
