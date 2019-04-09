import { LifecycleActionType, LifecycleAction, initialized } from '.';

describe('ActionCreator - Lifecycle', () => {

    it('Should produce the right action types', () => {
        expect(Object.values(LifecycleActionType).length).toBe(1);
        expect(LifecycleActionType.INITIALIZED).toBe('LIFECYCLE::INITIALIZED');
    });

    it('Should produce the right LIFECYCLE_INITIATED action', () => {

        const expected: LifecycleAction[LifecycleActionType.INITIALIZED] = {
            type: 'LIFECYCLE::INITIALIZED' as any,
        };

        const action = initialized();

        expect(action).toEqual(expected);

    });
});
