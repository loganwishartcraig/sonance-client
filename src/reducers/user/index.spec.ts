// import { UserAction, UserActionType } from '../../action-creators/user';
import { IUserState, userReducer } from '.';
import { IUser } from '../../models/user';
import { Utilities } from '../../utilities';
import { UserAction, UserActionType } from '../../actions/user';

// export const testUser: IUser = {
//     email: 'test@test.com',
//     firstName: 'test',
//     lastName: 'user',
//     username: 'test_user_1',
// };

// const testPopulatedState: IUserState = {
//     email: testUser.email,
//     firstName: testUser.firstName,
//     lastName: testUser.lastName,
//     username: testUser.username,
// };

// const generateStateClone = (base: IUserState): IUserState => {

//     if (typeof base === undefined || base === null) {
//         return null;
//     } else {
//         return { ...base };
//     }
// };

describe('Reducer - User', () => {

    let testUser: IUser;
    let testPopulatedState: IUserState;

    beforeEach(() => {

        testUser = {
            email: 'test@test.com',
            firstName: 'test',
            lastName: 'user',
        };

        testPopulatedState = {
            ...testUser,
        };

    });

    it('Should not process a non-user action', () => {

        // const prevState = generateStateClone(testPopulatedState);
        const frozen = Utilities.deepClone(testPopulatedState as IUser);

        const nextState = userReducer(testPopulatedState, {
            type: 'DUMMY_ACTION',
        } as any);

        expect(nextState).toBe(testPopulatedState);
        expect(nextState).toEqual(frozen);

    });

    it('Should produce the correct CLEAR_USER state', () => {

        const action: UserAction[UserActionType.CLEAR_USER] = {
            type: UserActionType.CLEAR_USER,
        };

        const state = userReducer(testPopulatedState, action);

        expect(state).toBeNull();

    });

    it('Should produce the correct SET_USER state', () => {

        // const base = generateStateClone(null);
        const expected = Utilities.deepClone(testPopulatedState as IUser);

        const user: IUser = Utilities.deepClone(testUser);

        const action: UserAction[UserActionType.SET_USER] = {
            type: UserActionType.SET_USER,
            payload: { user },
        };

        const state = userReducer(null, action);

        expect(state).toEqual(expected);

    });

});
