import { all, call, put, spawn, take, takeLatest } from 'redux-saga/effects';
import { DatabaseService, databaseService } from '../../services/database';
import { UserActionType, UserAction } from '../../action-creators/user';
import { appLogger } from '../../services/Logger';
import { AuthenticationActionType } from '../../action-creators/authentication';

export const cacheUser = function* (dbService: DatabaseService) {

    let action: UserAction[UserActionType.SET_USER];

    while (action = yield take(UserActionType.SET_USER)) {

        if (action.payload.noCache) {
            continue;
        }

        try {
            yield call([dbService.users, dbService.users.put], action.payload.user);
        } catch (e) {
            appLogger.error({ message: 'Error caching user...', meta: { e } });
        }

    }
};

export const removeCachedUser = function* (dbService: DatabaseService) {

    try {
        yield call([dbService.users, dbService.users.clear]);
    } catch (e) {
        appLogger.error({ message: 'Error clearing cached user...', meta: { e } });
    }

};

export const rootUserSaga = function* () {
    yield all([
        spawn(cacheUser, databaseService),
        takeLatest([
            UserActionType.CLEAR_USER,
            AuthenticationActionType.LOGOUT,
        ], removeCachedUser, databaseService),
    ]);
};
