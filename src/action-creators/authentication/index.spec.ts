import { AuthenticationActionType, AuthenticationAction, nativeLoginStart, logout, nativeLoginSuccess, loginFinished, AuthenticationActionPayload, loginFailed, setSession, clearSession } from '.';
import { TEST_USER } from '../user/index.spec';
import { SessionId } from '../../services/authentication/authentication-service/authentication-service';

// TODO: Add tests for new action creators

describe('ActionCreator - Authentication', () => {

    it('Should export the right constants', () => {
        expect(AuthenticationActionType.LOGIN_START_NATIVE).toEqual('AUTHENTICATION::LOGIN::START::NATIVE');
        expect(AuthenticationActionType.LOGIN_SUCCESS_NATIVE).toEqual('AUTHENTICATION::LOGIN::SUCCESS::NATIVE');
        expect(AuthenticationActionType.LOGIN_FAILED).toEqual('AUTHENTICATION::LOGIN::FAILED');
        expect(AuthenticationActionType.LOGIN_FINISHED).toEqual('AUTHENTICATION::LOGIN::FINISHED');
        expect(AuthenticationActionType.LOGOUT).toEqual('AUTHENTICATION::LOGOUT');
        expect(AuthenticationActionType.SET_SESSION).toEqual('AUTHENTICATION::SESSION::SET');
        expect(AuthenticationActionType.CLEAR_SESSION).toEqual('AUTHENTICATION::SESSION::CLEAR');
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

        const payload: AuthenticationActionPayload[AuthenticationActionType.LOGIN_SUCCESS_NATIVE] = {
            auth: {
                token: 'xxx-xxx-xxx-xxx',
                expires: new Date((new Date().getTime()) + 7 * 24 * 60 * 60),
                issued: new Date(),
            },
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
