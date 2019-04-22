import { ActionMap, AnyActionUnion, TypedActionCreator } from '..';
import { AuthenticationErrorCode } from '../../constants/error_codes';
import { SessionId } from '../../services/authentication/authentication-service/authentication-service';

export enum AuthenticationActionType {
    LOGIN_START_NATIVE = 'AUTHENTICATION::LOGIN::START::NATIVE',
    LOGIN_SUCCESS_NATIVE = 'AUTHENTICATION::LOGIN::SUCCESS::NATIVE',
    LOGIN_FAILED = 'AUTHENTICATION::LOGIN::FAILED',
    LOGIN_FINISHED = 'AUTHENTICATION::LOGIN::FINISHED',
    LOGOUT = 'AUTHENTICATION::LOGOUT',
    SET_SESSION = 'AUTHENTICATION::SESSION::SET',
    CLEAR_SESSION = 'AUTHENTICATION::SESSION::CLEAR',
}

interface ILoginActionPayload {
    readonly email: string;
    readonly password: string;
}

export interface AuthenticationActionPayload {
    [AuthenticationActionType.LOGIN_START_NATIVE]: ILoginActionPayload;
    [AuthenticationActionType.LOGIN_FAILED]: { code: AuthenticationErrorCode, message: string };
    [AuthenticationActionType.LOGIN_SUCCESS_NATIVE]: void;
    [AuthenticationActionType.LOGIN_FINISHED]: void;
    [AuthenticationActionType.LOGOUT]: void;
    [AuthenticationActionType.SET_SESSION]: { session: SessionId };
    [AuthenticationActionType.CLEAR_SESSION]: void;
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
