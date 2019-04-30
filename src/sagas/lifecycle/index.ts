import { all, call, put, spawn, take } from 'redux-saga/effects';
import * as CreateAuthAction from '../../action-creators/authentication';
import * as CreateUserAction from '../../action-creators/user';
import { LifecycleActionType } from '../../actions/lifecycle';
import { GenericError } from '../../common/GenericError';
import { DatabaseServiceErrorCode } from '../../constants/error_codes';
import { ActiveUserKey, User } from '../../models/user';
import Authenticator from '../../services/authentication/authentication-service';
import { databaseService, DatabaseService } from '../../services/database';
import { appLogger } from '../../services/Logger';
import { Utilities } from '../../utilities';

const bootstrapUser = function* (authIsCached: () => boolean, dbService: DatabaseService) {

    yield take(LifecycleActionType.INITIALIZED);

    if (authIsCached()) {

        try {

            // FIXME: Figure out a way to remove the 'any' cast here
            const user: User = yield call([dbService.users, dbService.users.get as any], ActiveUserKey);
            appLogger.log({ message: 'got cached user', meta: { userConfig: user } });
            if (!user) {
                throw new GenericError({
                    message: 'No cached user found',
                    code: DatabaseServiceErrorCode.RECORD_NOT_FOUND,
                });
            }

            yield put(CreateUserAction.setUser({ user, noCache: true }));
            yield put(CreateAuthAction.cachedAuthResolved({ isAuthenticated: true }));

        } catch (e) {
            appLogger.error({ message: 'Error getting cached user', meta: { e } });

            // TODO: Reload user from server instead of just clearing auth?
            yield put(CreateAuthAction.cachedAuthResolved({ isAuthenticated: false }));
        }

    } else {
        appLogger.log({ message: 'Auth state is not cached' });

        yield put(CreateUserAction.clearUser());
        yield put(CreateAuthAction.cachedAuthResolved({ isAuthenticated: false }));

    }

};

export const rootLifecycleSaga = function* () {
    yield all([
        spawn(
            bootstrapUser,
            Utilities.cookieIsSet.bind(Utilities, Authenticator.AuthCookieKey),
            databaseService
        ),
    ]);
};
