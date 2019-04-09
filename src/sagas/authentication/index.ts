import { all, take, put, call, spawn } from 'redux-saga/effects';
import { AuthenticationActionType, AuthenticationAction, nativeLoginStart, loginFailed, nativeLoginSuccess, loginFinished } from '../../action-creators/authentication';
import NativeAuthentication from '../../services/authentication/native-authentication/native-authentication';
import Logger from '../../services/Logger';
import Authenticator, { ILoginSuccess, generateSessionId } from '../../services/authentication/authentication-service/authentication-service';
import { setUser } from '../../action-creators/user';
import { LifecycleActionType } from '../../action-creators/lifecycle';

const nativeAuthenticationService: NativeAuthentication = new NativeAuthentication({
    logger: new Logger(),
});

export const nativeLoginSaga = function* ({ login }: Authenticator) {

    let action: AuthenticationAction[AuthenticationActionType.LOGIN_START_NATIVE];

    while (action = yield take(AuthenticationActionType.LOGIN_START_NATIVE)) {

        const { payload } = action;

        try {

            const { user, auth }: ILoginSuccess = yield call(login, payload);

            yield put(setUser({ user }));
            yield put(nativeLoginSuccess({ auth }));

        } catch (e) {
            yield put(loginFailed({ code: e.code, message: e.message }));
        } finally {
            yield put(loginFinished());
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

export const rootAuthSaga = function* () {
    yield all([
        spawn(setSession, generateSessionId),
        spawn(nativeLoginSaga, nativeAuthenticationService),
    ]);
};
