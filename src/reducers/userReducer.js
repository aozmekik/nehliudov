import { LOGIN, RESTORE_USER, LOGOUT } from './actions';

const initialState = {
    isLoading: true,
    isSignout: false,
    user: null
};

// const initialState = {
//     email: null,
//     name: null,
//     role: null,
//     image: null,
//      token: null
// };


const userReducer = (prevState = initialState, action) => {
    switch (action.type) {
        case RESTORE_USER:
            return {
                ...prevState,
                isLoading: false,
                user: action.user
            }
        case LOGIN:
            return {
                ...prevState,
                isSignout: false,
                user: action.user,
            };

        case LOGOUT: {
            return {
                ...prevState,
                isSignout: true,
                user: null
            }
        }
        default: return prevState;
    }

}

export default userReducer;