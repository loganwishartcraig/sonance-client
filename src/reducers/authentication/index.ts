import produce from 'immer';
import { Reducer } from 'react';
import { AnyAppAction } from '../../action-creators';
import { AuthenticationAction, AuthenticationActionType } from '../../action-creators/authentication';
import { AuthenticationErrorCode } from '../../constants/error_codes';
import { SessionId } from '../../services/authentication/authentication-service/authentication-service';

export interface IAuthenticationState {
    readonly session: SessionId | void;
    readonly loading: boolean;
    readonly error: {
        readonly code: string | void;
        readonly message: string | void;
    };
    readonly auth: {
        readonly authorized: boolean;
    };
}

const defaultState: IAuthenticationState = {
    loading: false,
    session: undefined,
    error: {
        code: undefined,
        message: undefined,
    },
    auth: {
        authorized: false,
    },
};

const getInitialState = (): IAuthenticationState => ({
    ...defaultState,
    auth: { ...defaultState.auth },
    error: { ...defaultState.error },
});

const clearAuth = (
    state: IAuthenticationState
): IAuthenticationState =>
    produce<IAuthenticationState>(
        state,
        draft => { draft.auth = { ...defaultState.auth }; }
    );

const clearLoadingFlag = (
    state: IAuthenticationState
): IAuthenticationState =>
    produce<IAuthenticationState>(
        state,
        draft => { draft.loading = false; }
    );

const setAuth = (
    state: IAuthenticationState
): IAuthenticationState =>
    produce<IAuthenticationState>(
        state,
        draft => { draft.auth.authorized = true; }
    );

const setAuthError = (
    state: IAuthenticationState,
    { payload: { code, message }, }:
        AuthenticationAction[AuthenticationActionType.LOGIN_FAILED | AuthenticationActionType.REGISTRATION_FAILED]
): IAuthenticationState =>
    produce<IAuthenticationState>(
        state,
        draft => { draft.error = { code, message }; }
    );

const setSession = (
    state: IAuthenticationState,
    { payload: { session } }: AuthenticationAction[AuthenticationActionType.SET_SESSION]
): IAuthenticationState =>
    produce<IAuthenticationState>(
        state,
        draft => { draft.session = session; }
    );

const clearSession = (
    state: IAuthenticationState
): IAuthenticationState =>
    produce<IAuthenticationState>(
        state,
        draft => { draft.session = undefined; }
    );

const setLoadingFlagAndClearError = (
    state: IAuthenticationState
): IAuthenticationState =>
    produce<IAuthenticationState>(
        state,
        draft => {
            draft.loading = true;
            draft.error = { code: undefined, message: undefined };
        }
    );

const authenticationReducer: Reducer<
    IAuthenticationState,
    AnyAppAction
> = (state: IAuthenticationState = getInitialState(), action): IAuthenticationState => {

    switch (action.type) {

        case AuthenticationActionType.LOGIN_START_NATIVE:
            return setLoadingFlagAndClearError(state);
        case AuthenticationActionType.LOGIN_FAILED:
            return setAuthError(state, action);
        case AuthenticationActionType.LOGIN_SUCCESS_NATIVE:
            return setAuth(state);
        case AuthenticationActionType.LOGIN_FINISHED:
            return clearLoadingFlag(state);

        case AuthenticationActionType.REGISTRATION_START:
            return setLoadingFlagAndClearError(state);
        case AuthenticationActionType.REGISTRATION_SUCCESS:
            return setAuth(state);
        case AuthenticationActionType.REGISTRATION_FAILED:
            return setAuthError(state, action);
        case AuthenticationActionType.REGISTRATION_FINISHED:
            return clearLoadingFlag(state);

        case AuthenticationActionType.LOGOUT:
            return clearAuth(state);

        case AuthenticationActionType.SET_SESSION:
            return setSession(state, action);
        case AuthenticationActionType.CLEAR_SESSION:
            return clearSession(state);

        case AuthenticationActionType.SET_AUTH_STATE:
            return (action.payload.isAuthenticated) ? setAuth(state) : clearAuth(state);

        default:
            return state;
    }

};

export default authenticationReducer;
