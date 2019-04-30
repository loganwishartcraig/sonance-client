import { ActionMap, AnyActionUnion, TypedActionCreator } from '..';
import { INetworkRequestFailure } from '../../configuration/interfaces';
import {
    IRegistrationSuccess,
    SessionId
} from '../../services/authentication/authentication-service/authentication-service';
import {
    INativeLoginRequest,
    INativeRegistrationRequest
} from '../../services/authentication/native-authentication/native-authentication';
import { User, IUser } from '../../models/user';

export enum AuthenticationActionType {

    LOGIN_START_NATIVE = 'AUTHENTICATION::LOGIN::START::NATIVE',
    LOGIN_SUCCESS_NATIVE = 'AUTHENTICATION::LOGIN::SUCCESS::NATIVE',
    LOGIN_FAILED = 'AUTHENTICATION::LOGIN::FAILED',
    LOGIN_FINISHED = 'AUTHENTICATION::LOGIN::FINISHED',

    REGISTRATION_START = 'AUTHENTICATION::REGISTRATION::START',
    REGISTRATION_SUCCESS = 'AUTHENTICATION::REGISTRATION::SUCCESS',
    REGISTRATION_FAILED = 'AUTHENTICATION::REGISTRATION::FAILED',
    REGISTRATION_FINISHED = 'AUTHENTICATION::REGISTRATION::FINISHED',

    LOGOUT = 'AUTHENTICATION::LOGOUT',

    SET_SESSION = 'AUTHENTICATION::SESSION::SET',
    CLEAR_SESSION = 'AUTHENTICATION::SESSION::CLEAR',

    CACHED_AUTH_RESOLVED = 'AUTHENTICATION::CACHE::RESOLVED',

}

export interface AuthenticationActionPayload {

    [AuthenticationActionType.LOGIN_START_NATIVE]: INativeLoginRequest;
    [AuthenticationActionType.LOGIN_FAILED]: INetworkRequestFailure;
    [AuthenticationActionType.LOGIN_SUCCESS_NATIVE]: void;
    [AuthenticationActionType.LOGIN_FINISHED]: void;

    [AuthenticationActionType.REGISTRATION_START]: INativeRegistrationRequest;
    [AuthenticationActionType.REGISTRATION_SUCCESS]: { user: IUser };
    [AuthenticationActionType.REGISTRATION_FAILED]: INetworkRequestFailure;
    [AuthenticationActionType.REGISTRATION_FINISHED]: void;

    [AuthenticationActionType.LOGOUT]: void;

    [AuthenticationActionType.SET_SESSION]: { session: SessionId };
    [AuthenticationActionType.CLEAR_SESSION]: void;

    [AuthenticationActionType.CACHED_AUTH_RESOLVED]: { isAuthenticated: boolean };

}

export type AuthenticationAction = ActionMap<AuthenticationActionType, AuthenticationActionPayload>;

export type AuthenticationActionCreator
    <T extends AuthenticationActionType> = TypedActionCreator<T, AuthenticationActionPayload[T]>;

export type AnyAuthenticationAction = AnyActionUnion<AuthenticationAction>;

export const nativeLoginStart: AuthenticationActionCreator<
    AuthenticationActionType.LOGIN_START_NATIVE
> = (payload) => ({
    type: AuthenticationActionType.LOGIN_START_NATIVE,
    payload,
});

export const nativeLoginSuccess: AuthenticationActionCreator<AuthenticationActionType.LOGIN_SUCCESS_NATIVE> = () => ({
    type: AuthenticationActionType.LOGIN_SUCCESS_NATIVE,
});

export const loginFailed: AuthenticationActionCreator<AuthenticationActionType.LOGIN_FAILED> = (payload) => ({
    type: AuthenticationActionType.LOGIN_FAILED,
    payload,
});

export const loginFinished: AuthenticationActionCreator<AuthenticationActionType.LOGIN_FINISHED> = () => ({
    type: AuthenticationActionType.LOGIN_FINISHED,
});

export const registrationStart: AuthenticationActionCreator<
    AuthenticationActionType.REGISTRATION_START
> = (payload) => ({
    type: AuthenticationActionType.REGISTRATION_START,
    payload,
});

export const registrationSuccess: AuthenticationActionCreator<
    AuthenticationActionType.REGISTRATION_SUCCESS
> = (payload) => ({
    type: AuthenticationActionType.REGISTRATION_SUCCESS,
    payload,
});

export const registrationFailed: AuthenticationActionCreator<
    AuthenticationActionType.REGISTRATION_FAILED
> = (payload) => ({
    type: AuthenticationActionType.REGISTRATION_FAILED,
    payload,
});

export const registrationFinished: AuthenticationActionCreator<
    AuthenticationActionType.REGISTRATION_FINISHED
> = () => ({
    type: AuthenticationActionType.REGISTRATION_FINISHED,
});

export const logout: AuthenticationActionCreator<AuthenticationActionType.LOGOUT> = () => ({
    type: AuthenticationActionType.LOGOUT,
});

export const setSession: AuthenticationActionCreator<AuthenticationActionType.SET_SESSION> = (payload) => ({
    type: AuthenticationActionType.SET_SESSION,
    payload,
});

export const clearSession: AuthenticationActionCreator<AuthenticationActionType.CLEAR_SESSION> = () => ({
    type: AuthenticationActionType.CLEAR_SESSION,
});

export const cachedAuthResolved: AuthenticationActionCreator<
    AuthenticationActionType.CACHED_AUTH_RESOLVED
> = (payload) => ({
    type: AuthenticationActionType.CACHED_AUTH_RESOLVED,
    payload,
});
