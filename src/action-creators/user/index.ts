import { TypedActionCreator } from '..';
import { UserActionType, UserActionPayload } from '../../actions/user';

export type UserActionCreator<T extends UserActionType> = TypedActionCreator<T, UserActionPayload[T]>;

export const setUser: UserActionCreator<UserActionType.SET_USER> = (payload) => ({
    type: UserActionType.SET_USER,
    payload,
});

export const clearUser: UserActionCreator<UserActionType.CLEAR_USER> = () => ({
    type: UserActionType.CLEAR_USER,
});
