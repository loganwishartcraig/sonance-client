import { ActionMap, AnyActionUnion, TypedActionCreator } from '..';
import { IUser } from '../../models/user';

export enum UserActionType {
    SET_USER = 'USER::SET',
    CLEAR_USER = 'USER::CLEAR',
}

interface SetUserActionPayload {
    user: IUser;
}

export interface UserActionPayload {
    [UserActionType.SET_USER]: SetUserActionPayload;
    [UserActionType.CLEAR_USER]: void;
}

export type UserActionCreator<T extends UserActionType> = TypedActionCreator<T, UserActionPayload[T]>;
export type UserAction = ActionMap<UserActionType, UserActionPayload>;
export type AnyUserAction = AnyActionUnion<UserAction>;

export const setUser: UserActionCreator<UserActionType.SET_USER> = (payload) => ({
    type: UserActionType.SET_USER,
    payload,
});

export const clearUser: UserActionCreator<UserActionType.CLEAR_USER> = () => ({
    type: UserActionType.CLEAR_USER,
});
