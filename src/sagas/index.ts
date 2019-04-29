import { all, spawn } from 'redux-saga/effects';
import { rootAuthSaga } from './authentication';
import { rootLifecycleSaga } from './lifecycle';
import { rootUserSaga } from './user';

export const rootSaga = function* () {

    yield all([
        spawn(rootLifecycleSaga),
        spawn(rootAuthSaga),
        spawn(rootUserSaga),
    ]);

};
