import { IAuthenticationState } from '../reducers/authentication';
import { IUserState } from '../reducers/user';
import { createStore } from 'redux';
import { AnyAppAction } from '../action-creators';
import rootReducer from '../reducers';

export interface IAppState {

    readonly authentication: IAuthenticationState;
    readonly user: IUserState;

}

export const store = createStore<IAppState, AnyAppAction, {}, {}>(rootReducer);
