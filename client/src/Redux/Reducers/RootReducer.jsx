import { combineReducers } from 'redux';
import AuthReducers from './AuthReducers';

/**
 * RootReducer
 */
const RootReducer = combineReducers({
    auth: AuthReducers,
});

export default RootReducer;