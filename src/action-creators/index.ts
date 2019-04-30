import { Action, ActionType } from '../actions';

export type TypedActionCreator<T extends ActionType, P = void> =
    P extends void ? () => Action<T> : (payload: P) => Action<T, P>;
