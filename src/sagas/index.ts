import { all, spawn } from 'redux-saga/effects';
import { rootAuthSaga } from './authentication';

export const rootSaga = function* () {

    yield all([
        spawn(rootAuthSaga),
    ]);

};
