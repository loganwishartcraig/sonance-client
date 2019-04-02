import { AuthenticationActionType, AuthenticationAction, nativeLoginStart, logout, nativeLoginSuccess, loginFinished } from '.';
import { TEST_USER } from '../user/index.spec';

describe('ActionCreator - Authentication', () => {

    it('Should export the right constants', () => {
        expect(AuthenticationActionType.LOGIN_START_NATIVE).toEqual('AUTHENTICATION::LOGIN::START::NATIVE');
        expect(AuthenticationActionType.LOGIN_SUCCESS_NATIVE).toEqual('AUTHENTICATION::LOGIN::SUCCESS::NATIVE');
        expect(AuthenticationActionType.LOGIN_FAILED).toEqual('AUTHENTICATION::LOGIN::FAILED');
        expect(AuthenticationActionType.LOGIN_FINISHED).toEqual('AUTHENTICATION::LOGIN::FINISHED');
        expect(AuthenticationActionType.LOGOUT).toEqual('AUTHENTICATION::LOGOUT');
    });

    it('Should produce the right LOGIN_START_NATIVE action', () => {

        const username = 'test_username';
        const password = 'test_password';

        const expected: AuthenticationAction[AuthenticationActionType.LOGIN_START_NATIVE] = {
            type: AuthenticationActionType.LOGIN_START_NATIVE,
            payload: { username, password, },
        };

        const action = nativeLoginStart({ username, password });

        expect(action).toEqual(expected);

    });

    it('Should produce the right LOGIN_SUCCESS_NATIVE action', () => {

        const payload = {
            token: 'xxx-xxx-xxx-xxx',
            user: { ...TEST_USER },
        };

        const expected: AuthenticationAction[AuthenticationActionType.LOGIN_SUCCESS_NATIVE] = {
            type: AuthenticationActionType.LOGIN_SUCCESS_NATIVE,
            payload: { ...payload },
        };

        const action = nativeLoginSuccess(payload);

        expect(action).toEqual(expected);

    });

    it('Should produce the right LOGIN_FINISHED action', () => {

        const expected: AuthenticationAction[AuthenticationActionType.LOGIN_FINISHED] = {
            type: AuthenticationActionType.LOGIN_FINISHED,
        };

        const action = loginFinished();

        expect(action).toEqual(expected);

    });

    it('Should produce the right LOGOUT action', () => {

        const expected: AuthenticationAction[AuthenticationActionType.LOGOUT] = {
            type: AuthenticationActionType.LOGOUT,
        };

        const action = logout();

        expect(action).toEqual(expected);

    });

});
