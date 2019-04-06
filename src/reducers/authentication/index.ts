import { Reducer } from 'react';
import { AnyAppAction } from '../../action-creators';
import { AuthenticationActionType, AuthenticationAction } from '../../action-creators/authentication';
import Authenticator, { SessionId, TokenId } from '../../services/authentication/authentication-service/authentication-service';
import produce from 'immer';
import { AuthenticationErrorCode } from '../../constants/error_codes';

export interface IAuthenticationState {
    readonly session: SessionId | void;
    readonly loading: boolean;
    readonly error: {
        readonly code: AuthenticationErrorCode | void;
        readonly message: string | void;
    };
    readonly auth: {
        readonly token: TokenId | void;
        readonly issued: Date | void;
        readonly expires: Date | void;
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
        expires: undefined,
        issued: undefined,
        token: undefined,
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

const setLoadingFlag = (
    state: IAuthenticationState,
    loading: boolean
): IAuthenticationState =>
    produce<IAuthenticationState>(
        state,
        draft => { draft.loading = loading; }
    );

const setAuth = (
    state: IAuthenticationState,
    { payload: { auth } }: AuthenticationAction[AuthenticationActionType.LOGIN_SUCCESS_NATIVE]
): IAuthenticationState =>
    produce<IAuthenticationState>(
        state,
        draft => { draft.auth = { ...auth }; }
    );

const setAuthError = (
    state: IAuthenticationState,
    { payload: { code, message } }: AuthenticationAction[AuthenticationActionType.LOGIN_FAILED]
): IAuthenticationState =>
    produce<IAuthenticationState>(
        state,
        draft => { draft.error = { code, message }; }        // TODO: Set a clearer message based on `code` or server response
    );

const authenticationReducer: Reducer<IAuthenticationState, AnyAppAction> = (state: IAuthenticationState = getInitialState(), action): IAuthenticationState => {

    switch (action.type) {
        case AuthenticationActionType.LOGIN_START_NATIVE:
            return setLoadingFlag(state, true);
        case AuthenticationActionType.LOGIN_FAILED:
            return setAuthError(state, action);
        case AuthenticationActionType.LOGIN_SUCCESS_NATIVE:
            return setAuth(state, action);
        case AuthenticationActionType.LOGIN_FINISHED:
            return setLoadingFlag(state, false);
        case AuthenticationActionType.LOGOUT:
            return clearAuth(state);
        default:
            return state;
    }

};

export default authenticationReducer;
