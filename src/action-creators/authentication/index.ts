import { ActionMap, TypedActionCreator, AnyActionUnion } from '..';
import { ILoginSuccess } from '../../services/authentication/authentication-service/authentication-service';
import { AuthenticationErrorCode } from '../../constants/error_codes';

export enum AuthenticationActionType {
    LOGIN_START_NATIVE = 'AUTHENTICATION::LOGIN::START::NATIVE',
    LOGIN_SUCCESS_NATIVE = 'AUTHENTICATION::LOGIN::SUCCESS::NATIVE',
    LOGIN_FAILED = 'AUTHENTICATION::LOGIN::FAILED',
    LOGIN_FINISHED = 'AUTHENTICATION::LOGIN::FINISHED',
    LOGOUT = 'AUTHENTICATION::LOGOUT',
}

interface ILoginActionPayload {
    username: string;
    password: string;
}

interface AuthenticationActionPayload {
    [AuthenticationActionType.LOGIN_START_NATIVE]: ILoginActionPayload;
    [AuthenticationActionType.LOGIN_FAILED]: { code: AuthenticationErrorCode };
    [AuthenticationActionType.LOGIN_SUCCESS_NATIVE]: ILoginSuccess;
    [AuthenticationActionType.LOGIN_FINISHED]: void;
    [AuthenticationActionType.LOGOUT]: void;
}

export type AuthenticationAction = ActionMap<AuthenticationActionType, AuthenticationActionPayload>;
export type AuthenticationActionCreator<T extends AuthenticationActionType> = TypedActionCreator<T, AuthenticationActionPayload[T]>;
export type AnyAuthenticationAction = AnyActionUnion<AuthenticationAction>;

export const nativeLoginStart: AuthenticationActionCreator<AuthenticationActionType.LOGIN_START_NATIVE> = (payload) => ({
    type: AuthenticationActionType.LOGIN_START_NATIVE,
    payload,
});

export const nativeLoginSuccess: AuthenticationActionCreator<AuthenticationActionType.LOGIN_SUCCESS_NATIVE> = (payload) => ({
    type: AuthenticationActionType.LOGIN_SUCCESS_NATIVE,
    payload,
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
