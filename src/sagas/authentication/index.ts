import { all, call, put, spawn, take } from 'redux-saga/effects';
import {
    AuthenticationAction,
    AuthenticationActionType,
    loginFailed,
    loginFinished,
    nativeLoginSuccess,
    registrationSuccess,
    registrationFailed,
    registrationFinished
} from '../../action-creators/authentication';
import { LifecycleActionType } from '../../action-creators/lifecycle';
import { setUser } from '../../action-creators/user';
import Authenticator, {
    generateSessionId,
    ILoginSuccess,
    IRegistrationSuccess
} from '../../services/authentication/authentication-service/authentication-service';
import NativeAuthentication from '../../services/authentication/native-authentication/native-authentication';
import Logger from '../../services/Logger';
import { Utilities } from '../../utilities';

const nativeAuthenticationService: NativeAuthentication = new NativeAuthentication({
    logger: new Logger(),
});

export const nativeLoginSaga = function* (authenticator: Authenticator) {

    let action: AuthenticationAction[AuthenticationActionType.LOGIN_START_NATIVE];

    while (action = yield take(AuthenticationActionType.LOGIN_START_NATIVE)) {

        const { payload } = action;

        try {

            const { user }: ILoginSuccess = yield call([authenticator, authenticator.login], payload);

            yield put(setUser({ user }));
            yield put(nativeLoginSuccess());

        } catch (e) {
            yield put(loginFailed({ code: e.code, message: e.message }));
        } finally {
            yield put(loginFinished());
        }
    }

};

export const registrationSaga = function* (authenticator: Authenticator) {

    let action: AuthenticationAction[AuthenticationActionType.REGISTRATION_START];

    while (action = yield take(AuthenticationActionType.REGISTRATION_START)) {

        const { payload } = action;

        try {

            const { user }: IRegistrationSuccess = yield call([authenticator, authenticator.register], payload);

            yield put(setUser({ user }));
            yield put(registrationSuccess({ user }));

        } catch (e) {
            yield put(registrationFailed({ code: e.code, message: e.message }));
        } finally {
            yield put(registrationFinished());
        }

    }
};

const setSession = function* (generateSessionId: () => string) {

    yield take(LifecycleActionType.INITIALIZED);

    const session = generateSessionId();

    const action: AuthenticationAction[AuthenticationActionType.SET_SESSION] = {
        type: AuthenticationActionType.SET_SESSION,
        payload: { session },
    };

    yield put(action);

};

const authChecker: () => boolean = () => {
    return Utilities.containsCookie(document.cookie, 'connect.sid');
};

const initializeAuthState = function* (checkCachedAuthState: () => boolean) {

    yield take(LifecycleActionType.INITIALIZED);

    const hasAuth = yield call(checkCachedAuthState);

    if (hasAuth) {

        console.warn('has auth');

        // TODO: abstract this into a 'set_auth' action
        const setAuthAction: AuthenticationAction[AuthenticationActionType.LOGIN_SUCCESS_NATIVE] = {
            type: AuthenticationActionType.LOGIN_SUCCESS_NATIVE,
        };

        yield put(setAuthAction);
    }

};

export const rootAuthSaga = function* () {
    yield all([
        spawn(setSession, generateSessionId),
        spawn(initializeAuthState, authChecker),
        spawn(nativeLoginSaga, nativeAuthenticationService),
        spawn(registrationSaga, nativeAuthenticationService),
    ]);
};
