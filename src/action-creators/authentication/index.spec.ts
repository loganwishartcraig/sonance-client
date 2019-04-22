import {
    AuthenticationAction,
    AuthenticationActionType,
    clearSession,
    loginFailed,
    loginFinished,
    logout,
    nativeLoginStart,
    nativeLoginSuccess,
    setSession
} from '.';
import { SessionId } from '../../services/authentication/authentication-service/authentication-service';

// TODO: Add tests for new action creators

describe('ActionCreator - Authentication', () => {

    it('Should export the right constants', () => {
        expect(Object.values(AuthenticationActionType).length).toBe(7);
        expect(AuthenticationActionType.LOGIN_START_NATIVE).toEqual('AUTHENTICATION::LOGIN::START::NATIVE');
        expect(AuthenticationActionType.LOGIN_SUCCESS_NATIVE).toEqual('AUTHENTICATION::LOGIN::SUCCESS::NATIVE');
        expect(AuthenticationActionType.LOGIN_FAILED).toEqual('AUTHENTICATION::LOGIN::FAILED');
        expect(AuthenticationActionType.LOGIN_FINISHED).toEqual('AUTHENTICATION::LOGIN::FINISHED');
        expect(AuthenticationActionType.LOGOUT).toEqual('AUTHENTICATION::LOGOUT');
        expect(AuthenticationActionType.SET_SESSION).toEqual('AUTHENTICATION::SESSION::SET');
        expect(AuthenticationActionType.CLEAR_SESSION).toEqual('AUTHENTICATION::SESSION::CLEAR');
    });

    it('Should produce the right LOGIN_START_NATIVE action', () => {

        const email = 'test@test.com';
        const password = 'test_password';

        const expected: AuthenticationAction[AuthenticationActionType.LOGIN_START_NATIVE] = {
            type: AuthenticationActionType.LOGIN_START_NATIVE,
            payload: { email, password, },
        };

        const action = nativeLoginStart({ email, password });

        expect(action).toEqual(expected);

    });

    it('Should produce the right LOGOUT_FAILED action', () => {

        const errPayload = {
            code: 'TEST_CODE' as any,
            message: 'Test message',
        };

        const expected: AuthenticationAction[AuthenticationActionType.LOGIN_FAILED] = {
            type: AuthenticationActionType.LOGIN_FAILED,
            payload: { ...errPayload },
        };

        const action = loginFailed({ ...errPayload });

        expect(action).toEqual(expected);

    });

    it('Should produce the right LOGIN_SUCCESS_NATIVE action', () => {

        const expected: AuthenticationAction[AuthenticationActionType.LOGIN_SUCCESS_NATIVE] = {
            type: AuthenticationActionType.LOGIN_SUCCESS_NATIVE,
        };

        const action = nativeLoginSuccess();

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

    it('Should produce the right SET_SESSION action', () => {

        const testSessionId: SessionId = 'test-session-id';

        const expected: AuthenticationAction[AuthenticationActionType.SET_SESSION] = {
            type: AuthenticationActionType.SET_SESSION,
            payload: { session: testSessionId },
        };

        const action = setSession({ session: testSessionId });

        expect(action).toEqual(expected);

    });

    it('Should produce the right CLEAR_SESSION action', () => {

        const expected: AuthenticationAction[AuthenticationActionType.CLEAR_SESSION] = {
            type: AuthenticationActionType.CLEAR_SESSION,
        };

        const action = clearSession();

        expect(action).toEqual(expected);

    });

});
