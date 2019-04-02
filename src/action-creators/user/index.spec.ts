import { IUser } from '../../configuration/interfaces';
import { UserActionType, UserAction, setUser, clearUser } from '.';

export const TEST_USER: IUser = {
    email: 'test@test.com',
    firstName: 'f_name',
    lastName: 'l_name',
    username: 'test_user',
};

describe('ActionCreators - User', () => {

    it('Should produce the right action types', () => {
        expect(UserActionType.SET_USER).toBe('USER::SET');
        expect(UserActionType.CLEAR_USER).toBe('USER::CLEAR');
    });

    it('Should produce the right SET_USER action', () => {

        const expected: UserAction[UserActionType.SET_USER] = {
            type: UserActionType.SET_USER,
            payload: { user: { ...TEST_USER } },
        };

        const action = setUser({ user: { ...TEST_USER } });

        expect(action).toEqual(expected);

    });

    it('Should produce the right CLEAR_USER action', () => {

        const expected: UserAction[UserActionType.CLEAR_USER] = {
            type: UserActionType.CLEAR_USER,
        };

        const action = clearUser();

        expect(action).toEqual(expected);

    });
});
