import { combineReducers, AnyAction, Reducer } from 'redux';
import authenticationReducer, { IAuthenticationState } from './authentication';
import { userReducer } from './user';

const rootReducer = combineReducers({

    user: userReducer,

    // Dirty cast because reducer typing has a bug in it
    authentication: authenticationReducer as Reducer<IAuthenticationState, AnyAction>,

});

export default rootReducer;
