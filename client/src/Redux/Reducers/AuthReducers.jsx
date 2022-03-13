 const initState = {
    login: false,
};

const AuthReducers = (state = initState, action) => {
    switch (action.type) {
        case 'EMAIL_LOGIN':
            return {
                ...state,
                login: action.payload
            }
        default:
            return state;
    }
}
export default AuthReducers;