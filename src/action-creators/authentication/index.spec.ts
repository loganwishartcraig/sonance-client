import * as AuthActionCreators from '.';
import { IUser } from '../../models/user';
import { SessionId } from '../../services/authentication/authentication-service';
import { INativeRegistrationRequest } from '../../services/authentication/native-authentication';
import { AuthenticationActionType, AuthenticationAction } from '../../actions/authentication';

// TODO: Add tests for new action creators

describe('ActionCreator - Authentication', () => {

    it('Should produce the right LOGIN_START_NATIVE action', () => {

        const email = 'test@test.com';
        const password = 'test_password';

        const expected: AuthenticationAction[AuthenticationActionType.LOGIN_START_NATIVE] = {
            type: AuthenticationActionType.LOGIN_START_NATIVE,
            payload: { email, password, },
        };

        const action = AuthActionCreators.nativeLoginStart({ email, password });

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

        const action = AuthActionCreators.loginFailed({ ...errPayload });

        expect(action).toEqual(expected);

    });

    it('Should produce the right LOGIN_SUCCESS_NATIVE action', () => {

        const expected: AuthenticationAction[AuthenticationActionType.LOGIN_SUCCESS_NATIVE] = {
            type: AuthenticationActionType.LOGIN_SUCCESS_NATIVE,
        };

        const action = AuthActionCreators.nativeLoginSuccess();

        expect(action).toEqual(expected);

    });

    it('Should produce the right LOGIN_FINISHED action', () => {

        const expected: AuthenticationAction[AuthenticationActionType.LOGIN_FINISHED] = {
            type: AuthenticationActionType.LOGIN_FINISHED,
        };

        const action = AuthActionCreators.loginFinished();

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

        const action = AuthActionCreators.registrationStart({ ...regPayload });

        expect(action).toEqual(expected);

    });

    it('Should produce the right REGISTRATION_SUCCESS action', () => {

        // TODO: Figure out how to remove this dep.
        const testUser: IUser = Object.freeze({
            email: 'test@test.com',
            firstName: 'test',
            lastName: 'test',
        });

        const expected: AuthenticationAction[AuthenticationActionType.REGISTRATION_SUCCESS] = {
            type: AuthenticationActionType.REGISTRATION_SUCCESS,
            payload: { user: { ...testUser } },
        };

        const action = AuthActionCreators.registrationSuccess({ user: { ...testUser } });

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

        const action = AuthActionCreators.registrationFailed({ ...errPayload });

        expect(action).toEqual(expected);

    });

    it('Should produce the right REGISTRATION_FINISHED action', () => {

        const expected: AuthenticationAction[AuthenticationActionType.REGISTRATION_FINISHED] = {
            type: AuthenticationActionType.REGISTRATION_FINISHED,
        };

        const action = AuthActionCreators.registrationFinished();

        expect(action).toEqual(expected);

    });

    it('Should produce the right LOGOUT action', () => {

        const expected: AuthenticationAction[AuthenticationActionType.LOGOUT] = {
            type: AuthenticationActionType.LOGOUT,
        };

        const action = AuthActionCreators.logout();

        expect(action).toEqual(expected);

    });

    it('Should produce the right SET_SESSION action', () => {

        const testSessionId: SessionId = 'test-session-id';

        const expected: AuthenticationAction[AuthenticationActionType.SET_SESSION] = {
            type: AuthenticationActionType.SET_SESSION,
            payload: { session: testSessionId },
        };

        const action = AuthActionCreators.setSession({ session: testSessionId });

        expect(action).toEqual(expected);

    });

    it('Should produce the right CLEAR_SESSION action', () => {

        const expected: AuthenticationAction[AuthenticationActionType.CLEAR_SESSION] = {
            type: AuthenticationActionType.CLEAR_SESSION,
        };

        const action = AuthActionCreators.clearSession();

        expect(action).toEqual(expected);

    });

    it('Should produce the right CACHED_AUTH_RESOLVED action', () => {

        const expected: AuthenticationAction[AuthenticationActionType.CACHED_AUTH_RESOLVED] = {
            type: AuthenticationActionType.CACHED_AUTH_RESOLVED,
            payload: Object.freeze({ isAuthenticated: true }),
        };

        const action = AuthActionCreators.cachedAuthResolved({ isAuthenticated: true });

        expect(action).toEqual(expected);

    });

});
