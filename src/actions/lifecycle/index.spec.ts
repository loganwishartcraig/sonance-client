import { LifecycleActionType } from '.';

describe('Actions - Lifecycle', () => {

    it('Should produce the right action types', () => {
        expect(Object.values(LifecycleActionType).length).toBe(1);
        expect(LifecycleActionType.INITIALIZED).toBe('LIFECYCLE::INITIALIZED');
    });

})
