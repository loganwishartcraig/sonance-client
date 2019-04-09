import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { AnyAppAction } from '../action-creators';
import rootReducer from '../reducers';
import { IAuthenticationState } from '../reducers/authentication';
import { IUserState } from '../reducers/user';
import { rootSaga } from '../sagas';
import { initialized } from '../action-creators/lifecycle';

export type IConnectedComponent<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}> =
    TStateProps & TDispatchProps & TOwnProps;

export interface IAppState {

    readonly authentication: IAuthenticationState;
    readonly user: IUserState;

}

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger();

const middleware = [sagaMiddleware, loggerMiddleware];

export const store = createStore<IAppState, AnyAppAction, {}, {}>(
    rootReducer,
    applyMiddleware(...middleware)

);

sagaMiddleware.run(rootSaga);

// Must be called after sagaMiddleware.run to allow
// sagas to be initialized
store.dispatch(initialized());

