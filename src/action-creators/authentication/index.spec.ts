import {
    AuthenticationAction,
    AuthenticationActionType,
    clearSession,
    loginFailed,
    loginFinished,
    logout,
    nativeLoginStart,
    nativeLoginSuccess,
    setSession,
    registrationFinished,
    registrationSuccess,
    registrationFailed,
    cachedAuthResolved
} from '.';
import { SessionId } from '../../services/authentication/authentication-service/authentication-service';
import { User, IUser } from '../../models/user';
import { INativeRegistrationRequest } from '../../services/authentication/native-authentication/native-authentication';

// TODO: Add tests for new action creators

describe('ActionCreator - Authentication', () => {

    it('Should export the right constants', () => {
        expect(Object.values(AuthenticationActionType).length).toBe(12);

        expect(AuthenticationActionType.LOGIN_START_NATIVE).toBe('AUTHENTICATION::LOGIN::START::NATIVE');
        expect(AuthenticationActionType.LOGIN_SUCCESS_NATIVE).toBe('AUTHENTICATION::LOGIN::SUCCESS::NATIVE');
        expect(AuthenticationActionType.LOGIN_FAILED).toBe('AUTHENTICATION::LOGIN::FAILED');
        expect(AuthenticationActionType.LOGIN_FINISHED).toBe('AUTHENTICATION::LOGIN::FINISHED');

        expect(AuthenticationActionType.REGISTRATION_START).toBe('AUTHENTICATION::REGISTRATION::START');
        expect(AuthenticationActionType.REGISTRATION_SUCCESS).toBe('AUTHENTICATION::REGISTRATION::SUCCESS');
        expect(AuthenticationActionType.REGISTRATION_FAILED).toBe('AUTHENTICATION::REGISTRATION::FAILED');
        expect(AuthenticationActionType.REGISTRATION_FINISHED).toBe('AUTHENTICATION::REGISTRATION::FINISHED');

        expect(AuthenticationActionType.LOGOUT).toBe('AUTHENTICATION::LOGOUT');

        expect(AuthenticationActionType.SET_SESSION).toBe('AUTHENTICATION::SESSION::SET');
        expect(AuthenticationActionType.CLEAR_SESSION).toBe('AUTHENTICATION::SESSION::CLEAR');

        expect(AuthenticationActionType.CACHED_AUTH_RESOLVED).toBe('AUTHENTICATION::CACHE::RESOLVED');
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

    it('Should produce the right REGISTRATION_START action', () => {

        const regPayload: INativeRegistrationRequest = {
            email: 'test@test.com',
            password: 'test_password',
            nameFirst: 'Test',
            nameLast: 'User',
        };

        const expected: AuthenticationAction[AuthenticationActionType.REGISTRATION_START] = {
            type: AuthenticationActionType.REGISTRATION_START,
            payload: { ...regPayload },
        };

        const action = nativeLoginStart({ ...regPayload });

        expect(action).toEqual(expected);

    });

    it('Should produce the right REGISTRATION_SUCCESS action', () => {

        // TODO: Figure out how to remove this dep.
        const testUser: IUser = {
            email: 'test@test.com',
            name: Object.freeze({
                first: 'test',
                last: 'test',
            }),
        };

        const expected: AuthenticationAction[AuthenticationActionType.REGISTRATION_SUCCESS] = {
            type: AuthenticationActionType.REGISTRATION_SUCCESS,
            payload: { user: { ...testUser } },
        };

        const action = registrationSuccess({ user: { ...testUser } });

        expect(action).toEqual(expected);

    });

    it('Should produce the right REGISTRATION_FAILED action', () => {

        const errPayload = {
            code: 'TEST_CODE' as any,
            message: 'Test message',
        };

        const expected: AuthenticationAction[AuthenticationActionType.REGISTRATION_FAILED] = {
            type: AuthenticationActionType.REGISTRATION_FAILED,
            payload: { ...errPayload },
        };

        const action = registrationFailed({ ...errPayload });

        expect(action).toEqual(expected);

    });

    it('Should produce the right REGISTRATION_FINISHED action', () => {

        const expected: AuthenticationAction[AuthenticationActionType.REGISTRATION_FINISHED] = {
            type: AuthenticationActionType.REGISTRATION_FINISHED,
        };

        const action = registrationFinished();

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

    it('Should produce the right CACHED_AUTH_RESOLVED action', () => {

        const expected: AuthenticationAction[AuthenticationActionType.CACHED_AUTH_RESOLVED] = {
            type: AuthenticationActionType.CACHED_AUTH_RESOLVED,
            payload: Object.freeze({ isAuthenticated: true }),
        };

        const action = cachedAuthResolved({ isAuthenticated: true });

        expect(action).toEqual(expected);

    });

});
