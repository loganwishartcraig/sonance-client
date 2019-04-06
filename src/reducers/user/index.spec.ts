import { IUser } from '../../configuration/interfaces';
import { UserAction, UserActionType } from '../../action-creators/user';
import { IUserState, userReducer } from '.';

export const testUser: IUser = {
    email: 'test@test.com',
    firstName: 'test',
    lastName: 'user',
    username: 'test_user_1',
};

const testPopulatedState: IUserState = {
    email: testUser.email,
    firstName: testUser.firstName,
    lastName: testUser.lastName,
    username: testUser.username,
};

const generateStateClone = (base: IUserState): IUserState => {

    if (typeof base === undefined || base === null) {
        return null;
    } else {
        return { ...base };
    }
};

// TODO: Add tests for the rest of the user reducers

describe('Reducer - User', () => {

    it('Should not process a non-user action', () => {

        const prevState = generateStateClone(testPopulatedState);

        const nextState = userReducer(prevState, {
            type: 'DUMMY_ACTION',
        } as any);

        expect(prevState).toBe(nextState);
    });

    it('Should produce the correct CLEAR_USER state', () => {

        const base = generateStateClone(testPopulatedState);

        const action: UserAction[UserActionType.CLEAR_USER] = {
            type: UserActionType.CLEAR_USER,
        };

        const state = userReducer(base, action);

        expect(state).toBeNull();

    });

    it('Should produce the correct SET_USER state', () => {

        const base = generateStateClone(null);
        const expected = generateStateClone(testPopulatedState);
        const user: IUser = { ...testUser };

        const action: UserAction[UserActionType.SET_USER] = {
            type: UserActionType.SET_USER,
            payload: { user },
        };

        const state = userReducer(base, action);

        expect(state).toEqual(expected);
        expect(state).not.toBe(base);

    });

});
