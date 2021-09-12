export const getDegrees = () => {

    return (dispatch) => {
        dispatch({
            type: "GET_DEGREES"
        });
        return Promise.resolve();
    }

};

export const updateDegrees = (degree) => {

    return (dispatch) => {
        dispatch({
            type: "UPDATE_DEGREES",
            payload: degree
        });
        return Promise.resolve();
    }

};


