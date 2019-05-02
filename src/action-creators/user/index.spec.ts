import * as UserActionCreator from '.';
import { IUser } from '../../models/user';
import { UserActionType, UserAction } from '../../actions/user';

describe('ActionCreators - User', () => {

    let dummyUser: IUser;

    beforeEach(() => {

        dummyUser = {
            email: 'test@test.com',
            name: {
                first: 'Test',
                last: 'User',
            },
        };

    });

    it('Should produce the right SET_USER action', () => {

        const expected: UserAction[UserActionType.SET_USER] = {
            type: UserActionType.SET_USER,
            payload: { user: { ...dummyUser } },
        };

        const action = UserActionCreator.setUser({ user: { ...dummyUser } });

        expect(action).toEqual(expected);

    });

    it('Should produce the right CLEAR_USER action', () => {

        const expected: UserAction[UserActionType.CLEAR_USER] = {
            type: UserActionType.CLEAR_USER,
        };

        const action = UserActionCreator.clearUser();

        expect(action).toEqual(expected);

    });
});
