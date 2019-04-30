import { ActionMap, AnyActionUnion } from '..';

export enum LifecycleActionType {
    INITIALIZED = 'LIFECYCLE::INITIALIZED',
}

export interface LifecycleActionPayload {
    [LifecycleActionType.INITIALIZED]: void;
}

export type LifecycleAction = ActionMap<LifecycleActionType, LifecycleActionPayload>;

export type AnyLifecycleAction = AnyActionUnion<LifecycleAction>;
