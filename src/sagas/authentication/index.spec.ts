import { nativeLoginSaga } from '.';
import NativeAuthentication from '../../services/authentication/native-authentication/native-authentication';
import Logger, { LogLevel } from '../../services/Logger';
import { take, call, put } from 'redux-saga/effects';
import { AuthenticationAction, AuthenticationActionType, AuthenticationActionPayload } from '../../action-creators/authentication';
import { ILoginSuccess } from '../../services/authentication/authentication-service/authentication-service';
import { UserAction, UserActionType, setUser } from '../../action-creators/user';
import { GenericError } from '../../generics/GenericError';

jest.mock('../../services/authentication/native-authentication/native-authentication');

// TODO: Modify tests to use runSaga
// TODO: Add tests for remaining sagas
describe('Sagas - Authentication', () => {

    it('Should produce the correct nativeLogin happy path sequence', () => {

        const service = new NativeAuthentication({ logger: new Logger({ logLevel: LogLevel.NONE }) });
        const gen = nativeLoginSaga(service);

        let curs = gen.next();

        expect(curs.value).toEqual(take('AUTHENTICATION::LOGIN::START::NATIVE'));

        const testPayload: AuthenticationActionPayload[AuthenticationActionType.LOGIN_START_NATIVE] = {
            email: 'test@test.com',
            password: 'test_password',
        };

        const action: AuthenticationAction[AuthenticationActionType.LOGIN_START_NATIVE] = {
            type: AuthenticationActionType.LOGIN_START_NATIVE,
            payload: { ...testPayload },
        };

        curs = gen.next(action);

        expect(curs.value).toEqual(call(service.login, testPayload));

        const loginResult: ILoginSuccess = {
            auth: {
                expires: new Date(),
                issued: new Date(),
                token: 'xxx-xxx-xxx-test-token',
            },
            user: {
                email: 'test@test.com',
                firstName: 'test',
                lastName: 'user',
                username: 'test_user',
            },
        };

        curs = gen.next(loginResult);

        const setUserAction: UserAction[UserActionType.SET_USER] = {
            type: UserActionType.SET_USER,
            payload: {
                user: { ...loginResult.user },
            },
        };

        expect(curs.value).toEqual(put(setUserAction));

        curs = gen.next();

        const loginSuccessAction: AuthenticationAction[AuthenticationActionType.LOGIN_SUCCESS_NATIVE] = {
            type: AuthenticationActionType.LOGIN_SUCCESS_NATIVE,
            payload: {
                auth: { ...loginResult.auth },
            },
        };

        expect(curs.value).toEqual(put(loginSuccessAction));

        curs = gen.next();

        const loginFinishedAction: AuthenticationAction[AuthenticationActionType.LOGIN_FINISHED] = {
            type: AuthenticationActionType.LOGIN_FINISHED,
        };

        expect(curs.value).toEqual(put(loginFinishedAction));

        curs = gen.next();

        expect(curs.value).toEqual(take('AUTHENTICATION::LOGIN::START::NATIVE'));

    });

    it('Should produce the correct nativeLogin fail path sequence', () => {

        const service = new NativeAuthentication({ logger: new Logger({ logLevel: LogLevel.NONE }) });
        const gen = nativeLoginSaga(service);

        let curs = gen.next();

        expect(curs.value).toEqual(take('AUTHENTICATION::LOGIN::START::NATIVE'));

        const testPayload: AuthenticationActionPayload[AuthenticationActionType.LOGIN_START_NATIVE] = {
            email: 'test@test.com',
            password: 'test_password',
        };

        const action: AuthenticationAction[AuthenticationActionType.LOGIN_START_NATIVE] = {
            type: AuthenticationActionType.LOGIN_START_NATIVE,
            payload: { ...testPayload },
        };

        curs = gen.next(action);

        expect(curs.value).toEqual(call(service.login, testPayload));

        const loginResult: ILoginSuccess = {
            auth: {
                expires: new Date(),
                issued: new Date(),
                token: 'xxx-xxx-xxx-test-token',
            },
            user: {
                email: 'test@test.com',
                firstName: 'test',
                lastName: 'user',
                username: 'test_user',
            },
        };

        const errorCode: any = 'TEST_CODE';
        const errorMessage = 'test message';

        curs = (gen as any).throw(new GenericError({ code: errorCode, message: errorMessage }));

        const loginFailedAction: AuthenticationAction[AuthenticationActionType.LOGIN_FAILED] = {
            type: AuthenticationActionType.LOGIN_FAILED,
            payload: { code: errorCode, message: errorMessage },
        };

        expect(curs.value).toEqual(put(loginFailedAction));

        curs = gen.next();

        const loginFinishedAction: AuthenticationAction[AuthenticationActionType.LOGIN_FINISHED] = {
            type: AuthenticationActionType.LOGIN_FINISHED,
        };

        expect(curs.value).toEqual(put(loginFinishedAction));

        curs = gen.next();

        expect(curs.value).toEqual(take('AUTHENTICATION::LOGIN::START::NATIVE'));

    });

});
