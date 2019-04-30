import { all, call, put, spawn, take } from 'redux-saga/effects';
import { AuthenticationAction, AuthenticationActionType, loginFailed, loginFinished, nativeLoginSuccess, registrationFailed, registrationFinished, registrationSuccess } from '../../action-creators/authentication';
import { LifecycleActionType } from '../../action-creators/lifecycle';
import { setUser } from '../../action-creators/user';
import { User } from '../../models/user';
import Authenticator, { generateSessionId, ILoginSuccess, IRegistrationSuccess } from '../../services/authentication/authentication-service/authentication-service';
import NativeAuthentication from '../../services/authentication/native-authentication/native-authentication';
import Logger, { appLogger } from '../../services/Logger';
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

            yield put(setUser({ user: new User(user) }));
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

            const { user: userConfig }: IRegistrationSuccess = yield call(
                [authenticator, authenticator.register],
                payload
            );

            const user = new User(userConfig);

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

export const clearAuthCache = function* (cacheClearer: () => void) {

    while (yield take(AuthenticationActionType.LOGOUT)) {

        yield call(cacheClearer);

    }

};

export const logUserOut = function* (authenticator: Authenticator) {

    while (yield take(AuthenticationActionType.LOGOUT)) {

        try {
            yield call([authenticator, authenticator.logout]);
        } catch (e) {
            appLogger.error({ message: 'Failed to log the user out', meta: { e } });
        }

    }

};

export const rootAuthSaga = function* () {
    yield all([
        spawn(setSession, generateSessionId),
        spawn(nativeLoginSaga, nativeAuthenticationService),
        spawn(registrationSaga, nativeAuthenticationService),
        spawn(clearAuthCache, Utilities.removeCookie.bind(Utilities, Authenticator.AuthCookieKey)),
        spawn(logUserOut, nativeAuthenticationService),
    ]);
};
