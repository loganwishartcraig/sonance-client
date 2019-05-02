import { AuthenticationActionType } from '.';

describe('Actions - Authentication', () => {

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

});
