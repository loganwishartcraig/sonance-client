import { TypedActionCreator } from '..';
import { AuthenticationActionType, AuthenticationActionPayload } from '../../actions/authentication';

export type AuthenticationActionCreator
    <T extends AuthenticationActionType> = TypedActionCreator<T, AuthenticationActionPayload[T]>;

export const nativeLoginStart: AuthenticationActionCreator<
    AuthenticationActionType.LOGIN_START_NATIVE
> = payload => ({
    payload,
    type: AuthenticationActionType.LOGIN_START_NATIVE,
});

export const nativeLoginSuccess: AuthenticationActionCreator<AuthenticationActionType.LOGIN_SUCCESS_NATIVE> = () => ({
    type: AuthenticationActionType.LOGIN_SUCCESS_NATIVE,
});

export const loginFailed: AuthenticationActionCreator<AuthenticationActionType.LOGIN_FAILED> = (payload) => ({
    payload,
    type: AuthenticationActionType.LOGIN_FAILED,
});

export const loginFinished: AuthenticationActionCreator<AuthenticationActionType.LOGIN_FINISHED> = () => ({
    type: AuthenticationActionType.LOGIN_FINISHED,
});

export const registrationStart: AuthenticationActionCreator<
    AuthenticationActionType.REGISTRATION_START
> = payload => ({
    payload,
    type: AuthenticationActionType.REGISTRATION_START,
});

export const registrationSuccess: AuthenticationActionCreator<
    AuthenticationActionType.REGISTRATION_SUCCESS
> = payload => ({
    payload,
    type: AuthenticationActionType.REGISTRATION_SUCCESS,
});

export const registrationFailed: AuthenticationActionCreator<
    AuthenticationActionType.REGISTRATION_FAILED
> = payload => ({
    payload,
    type: AuthenticationActionType.REGISTRATION_FAILED,
});

export const registrationFinished: AuthenticationActionCreator<
    AuthenticationActionType.REGISTRATION_FINISHED
> = () => ({
    type: AuthenticationActionType.REGISTRATION_FINISHED,
});

export const logout: AuthenticationActionCreator<AuthenticationActionType.LOGOUT> = () => ({
    type: AuthenticationActionType.LOGOUT,
});

export const setSession: AuthenticationActionCreator<
    AuthenticationActionType.SET_SESSION
> = payload => ({
    payload,
    type: AuthenticationActionType.SET_SESSION,
});

export const clearSession: AuthenticationActionCreator<AuthenticationActionType.CLEAR_SESSION> = () => ({
    type: AuthenticationActionType.CLEAR_SESSION,
});

export const cachedAuthResolved: AuthenticationActionCreator<
    AuthenticationActionType.CACHED_AUTH_RESOLVED
> = payload => ({
    payload,
    type: AuthenticationActionType.CACHED_AUTH_RESOLVED,
});
