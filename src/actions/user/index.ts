import { ActionMap, AnyActionUnion } from '..';
import { IUser } from '../../models/user';

export enum UserActionType {
    SET_USER = 'USER::SET',
    CLEAR_USER = 'USER::CLEAR',
}

interface SetUserActionPayload {
    user: IUser;
    noCache?: boolean;
}

export interface UserActionPayload {
    [UserActionType.SET_USER]: SetUserActionPayload;
    [UserActionType.CLEAR_USER]: void;
}

export type UserAction = ActionMap<UserActionType, UserActionPayload>;
export type AnyUserAction = AnyActionUnion<UserAction>;
