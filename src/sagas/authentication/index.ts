import { all, call, put, spawn, take } from 'redux-saga/effects';
import * as AuthActionCreators from '../../action-creators/authentication';
import { setUser } from '../../action-creators/user';
import { AuthenticationAction, AuthenticationActionType } from '../../actions/authentication';
import { LifecycleActionType } from '../../actions/lifecycle';
import { User } from '../../models/user';
import Authenticator, {
    generateSessionId,
    ILoginSuccess,
    IRegistrationSuccess
} from '../../services/authentication/authentication-service';
import NativeAuthentication from '../../services/authentication/native-authentication';
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

            yield put(setUser({ user }));
            yield put(AuthActionCreators.nativeLoginSuccess());

        } catch (e) {
            yield put(AuthActionCreators.loginFailed({ code: e.code, message: e.message }));
        } finally {
            yield put(AuthActionCreators.loginFinished());
        }
    }

};

export const registrationSaga = function* (authenticator: Authenticator) {

    let action: AuthenticationAction[AuthenticationActionType.REGISTRATION_START];

    while (action = yield take(AuthenticationActionType.REGISTRATION_START)) {

        const { payload } = action;

        try {

            const { user }: IRegistrationSuccess = yield call(
                [authenticator, authenticator.register],
                payload
            );

            yield put(setUser({ user }));
            yield put(AuthActionCreators.registrationSuccess({ user }));

        } catch (e) {
            yield put(AuthActionCreators.registrationFailed({ code: e.code, message: e.message }));
        } finally {
            yield put(AuthActionCreators.registrationFinished());
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
