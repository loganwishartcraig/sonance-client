import produce from 'immer';
import { Reducer } from 'react';
import { AnyAppAction } from '../../action-creators';
import { AuthenticationAction, AuthenticationActionType } from '../../action-creators/authentication';
import { AuthenticationErrorCode } from '../../constants/error_codes';
import { SessionId, TokenId } from '../../services/authentication/authentication-service/authentication-service';

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

const clearLoadingFlag = (
    state: IAuthenticationState
): IAuthenticationState =>
    produce<IAuthenticationState>(
        state,
        draft => { draft.loading = false; }
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

const authenticationReducer: Reducer<IAuthenticationState, AnyAppAction> = (state: IAuthenticationState = getInitialState(), action): IAuthenticationState => {

    switch (action.type) {
        case AuthenticationActionType.LOGIN_START_NATIVE:
            return setLoadingFlagAndClearError(state);
        case AuthenticationActionType.LOGIN_FAILED:
            return setAuthError(state, action);
        case AuthenticationActionType.LOGIN_SUCCESS_NATIVE:
            return setAuth(state, action);
        case AuthenticationActionType.LOGIN_FINISHED:
            return clearLoadingFlag(state);
        case AuthenticationActionType.LOGOUT:
            return clearAuth(state);
        case AuthenticationActionType.SET_SESSION:
            return setSession(state, action);
        case AuthenticationActionType.CLEAR_SESSION:
            return clearSession(state);
        default:
            return state;
    }

};

export default authenticationReducer;
