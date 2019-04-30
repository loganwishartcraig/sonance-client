import { TypedActionCreator } from '..';
import { LifecycleActionType, LifecycleActionPayload } from '../../actions/lifecycle';

export type LifecycleActionCreator<T extends LifecycleActionType> = TypedActionCreator<T, LifecycleActionPayload[T]>;

export const initialized: LifecycleActionCreator<LifecycleActionType.INITIALIZED> = () => ({
    type: LifecycleActionType.INITIALIZED,
});
