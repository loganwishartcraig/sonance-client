import produce from 'immer';
import { Reducer } from 'redux';
import { AnyAppAction } from '../../action-creators';
import { UserActionType } from '../../action-creators/user';
import { IUser } from '../../models/user';

export type IUserState = IUser | null;

export const userReducer: Reducer<IUserState, AnyAppAction> = (oldState = null, action): IUserState => {

    switch (action.type) {
        case UserActionType.CLEAR_USER:
            return null;
        case UserActionType.SET_USER:
            return produce<IUserState>(oldState, (draft: IUserState) => ({ ...action.payload.user }));
        default:
            return oldState;
    }
};
