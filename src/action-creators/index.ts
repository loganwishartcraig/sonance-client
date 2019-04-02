import { AnyAuthenticationAction } from './authentication';
import { AnyUserAction } from './user';

export type ActionType = string;

export type Action<T extends ActionType, P = void> =
    P extends void ? { type: T } : { type: T, payload: P };

export type TypedActionCreator<T extends ActionType, P = void> =
    P extends void ? () => Action<T> : (payload: P) => Action<T, P>;

export type ActionMap<A extends string, P extends any> = {
    [action in A]: Action<action, P[action]>;
};

export type AnyActionUnion<A extends ActionMap<any, any>> = A[keyof A];

export type AnyAppAction =
    AnyAuthenticationAction
    | AnyUserAction;
