import produce from 'immer';
import { Reducer } from 'redux';
import { AnyAppAction } from '../../actions';
import { UserActionType } from '../../actions/user';
import { IUser, User } from '../../models/user';

export type IUserState = IUser | null;

export const setUser = (
    userConfig: IUser
): IUserState => ({ ...userConfig });

export const userReducer: Reducer<IUserState, AnyAppAction> = (oldState = null, action): IUserState => {

    switch (action.type) {
        case UserActionType.CLEAR_USER:
            return null;
        case UserActionType.SET_USER:
            return setUser(action.payload.user);
        default:
            return oldState;
    }
};
