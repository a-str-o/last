
const userEstimationReducer = (state = {userEstimations: []}, action) => {
    switch (action.type) {
        case 'SET_USER_ESTIMATION': {
            state = {...state, userEstimations: action.data};
            return state;
        }
        case "GET_USER_ESTIMATIONS":
            return state
        default:
            return state;
    }
};

export default userEstimationReducer;