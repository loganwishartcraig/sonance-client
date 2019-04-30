import { AnyAuthenticationAction } from './authentication';
import { AnyUserAction } from './user';
import { AnyLifecycleAction } from './lifecycle';

export type ActionType = string;

export type Action<T extends ActionType, P = void> =
    P extends void ? { type: T } : { type: T, payload: P };

export type ActionMap<A extends string, P extends any> = {
    [action in A]: Action<action, P[action]>;
};

export type AnyActionUnion<A extends ActionMap<any, any>> = A[keyof A];

export type AnyAppAction =
    AnyAuthenticationAction
    | AnyUserAction
    | AnyLifecycleAction;
