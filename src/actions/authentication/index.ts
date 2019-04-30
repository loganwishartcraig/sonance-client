import { ActionMap, AnyActionUnion } from '..';
import { INativeLoginRequest, INativeRegistrationRequest } from '../../services/authentication/native-authentication';
import { IUser } from '../../models/user';
import { INetworkRequestFailure } from '../../configuration/interfaces';
import { SessionId } from '../../services/authentication/authentication-service';

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

export type AnyAuthenticationAction = AnyActionUnion<AuthenticationAction>;
