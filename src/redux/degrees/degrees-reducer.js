
let degreeFromStorage = JSON.parse(localStorage.getItem('degree'))

const initialState = {
    // degree: degreeFromStorage != null ? degreeFromStorage : 'Celsius'
    degree: 'Celsius'

};


export default function (state = initialState, action) {
    // console.log('action is', action)
    switch (action.type) {
        case "GET_DEGREES":
            return { ...state }
        case "UPDATE_DEGREES":
            return { degree: action.payload };

        default:
            return state;
    }
}
