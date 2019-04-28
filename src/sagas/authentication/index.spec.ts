import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { nativeLoginSaga } from '.';
import { AuthenticationAction, AuthenticationActionType } from '../../action-creators/authentication';
import { UserAction, UserActionType } from '../../action-creators/user';
import Authenticator, {
    ILoginSuccess, IRegistrationSuccess
} from '../../services/authentication/authentication-service/authentication-service';
import NativeAuthentication, {
    INativeLoginRequest, INativeRegistrationRequest
} from '../../services/authentication/native-authentication/native-authentication';
import Logger, { LogLevel } from '../../services/Logger';
import { GenericError } from '../../common/GenericError';
import { take } from 'redux-saga/effects';
import { IUser } from '../../models/user';

jest.mock('../../services/authentication/native-authentication/native-authentication');

// TODO: Modify tests to use runSaga
// TODO: Add tests for remaining sagas
describe('Sagas - Authentication', () => {

    let dummyUser: IUser;

    let service: Authenticator;
    let dummyLoginPayload: INativeLoginRequest;
    let dummyRegPayload: INativeRegistrationRequest;

    let dummySetUserAction: UserAction['USER::SET'];

    let dummyNativeLoginAction: AuthenticationAction['AUTHENTICATION::LOGIN::START::NATIVE'];
    let dummyLoginFinishedAction: AuthenticationAction['AUTHENTICATION::LOGIN::FINISHED'];

    beforeEach(() => {

        // Reinitialize variables for consistency.

        dummyUser = {
            email: 'test@test.com',
            firstName: 'Test',
            lastName: 'User',
            username: 'testuser',
        };

        service = new NativeAuthentication({ logger: new Logger({ logLevel: LogLevel.NONE }) });

        dummyLoginPayload = {
            email: 'test@test.com',
            password: 'testpassword',
        };

        dummyRegPayload = {
            email: 'test@test.com',
            nameFirst: 'Test',
            nameLast: 'User',
            password: 'testpassword',
        };

        dummySetUserAction = {
            type: UserActionType.SET_USER,
            payload: {
                user: { ...dummyUser },
            },
        };

        dummyNativeLoginAction = {
            type: AuthenticationActionType.LOGIN_START_NATIVE,
            payload: { ...dummyLoginPayload },
        };

        dummyLoginFinishedAction = {
            type: AuthenticationActionType.LOGIN_FINISHED,
        };

    });

    it('Should produce the correct nativeLogin happy path sequence', () => {

        const dummyServiceLoginSuccessPayload: ILoginSuccess = {
            user: { ...dummyUser },
        };

        const dummyLoginSuccessAction: AuthenticationAction['AUTHENTICATION::LOGIN::SUCCESS::NATIVE'] = {
            type: AuthenticationActionType.LOGIN_SUCCESS_NATIVE,
        };

        return expectSaga(nativeLoginSaga, service)
            .provide([
                [matchers.call.fn(service.login), dummyServiceLoginSuccessPayload],
            ])
            .call([service, service.login], dummyLoginPayload)
            .put(dummySetUserAction)
            .put(dummyLoginSuccessAction)
            .put(dummyLoginFinishedAction)
            .dispatch(dummyNativeLoginAction)
            .run();

    });

    it('Should produce the correct nativeLogin sad path sequence', () => {

        const dummyNetworkError: GenericError = new GenericError({
            code: 'TEST_ERROR_CODE',
            message: 'This is a test message',
        });

        const dummyLoginFailedAction: AuthenticationAction['AUTHENTICATION::LOGIN::FAILED'] = {
            type: AuthenticationActionType.LOGIN_FAILED,
            payload: {
                code: dummyNetworkError.code,
                message: dummyNetworkError.message,
            },
        };

        return expectSaga(nativeLoginSaga, service)
            .provide([
                [matchers.call.fn(service.login), throwError(dummyNetworkError)],
            ])
            .call([service, service.login], dummyLoginPayload)
            .put(dummyLoginFailedAction)
            .put(dummyLoginFinishedAction)
            .dispatch(dummyNativeLoginAction)
            .run();

    });

    it('Should produce the correct registration happy path sequence', () => {

        const dummyServiceRegSuccessPayload: IRegistrationSuccess = {
            user: { ...dummyUser },
        };

        const dummyRegSuccessAction: AuthenticationAction['AUTHENTICATION::REGISTRATION::SUCCESS'] = {
            type: AuthenticationActionType.REGISTRATION_SUCCESS,
            payload: { user: { ...dummyUser } },
        };

    });

});
