import { ActionMap, TypedActionCreator, AnyActionUnion } from '..';

export enum LifecycleActionType {
    INITIALIZED = 'LIFECYCLE::INITIALIZED',
}

export interface LifecycleActionPayload {
    [LifecycleActionType.INITIALIZED]: void;
}

export type LifecycleAction = ActionMap<LifecycleActionType, LifecycleActionPayload>;
export type LifecycleActionCreator<T extends LifecycleActionType> = TypedActionCreator<T, LifecycleActionPayload[T]>;
export type AnyLifecycleAction = AnyActionUnion<LifecycleAction>;

export const initialized: LifecycleActionCreator<LifecycleActionType.INITIALIZED> = () => ({
    type: LifecycleActionType.INITIALIZED,
});
