import { UserActionType } from '.';

describe('Actions - User', () => {

    it('Should produce the right action types', () => {
        expect(Object.values(UserActionType).length).toBe(2);
        expect(UserActionType.SET_USER).toBe('USER::SET');
        expect(UserActionType.CLEAR_USER).toBe('USER::CLEAR');
    });

});
