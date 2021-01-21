import { AUTH, LOGOUT } from '../constants/actionTypes';

// eslint-disable-next-line
const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            //Save token in localstorage
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return { ...state, authData: action?.data };
        case LOGOUT:
            //Clear localstorage
            localStorage.clear();
            return { ...state, authData: null }
        default:
            return state;
    }
};

export default authReducer;