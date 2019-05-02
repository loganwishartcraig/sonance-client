import * as LifecycleActionCreators from '.';
import { LifecycleActionType, LifecycleAction } from '../../actions/lifecycle';

describe('ActionCreator - Lifecycle', () => {

    it('Should produce the right LIFECYCLE_INITIATED action', () => {

        const expected: LifecycleAction[LifecycleActionType.INITIALIZED] = {
            type: 'LIFECYCLE::INITIALIZED' as any,
        };

        const action = LifecycleActionCreators.initialized();

        expect(action).toEqual(expected);

    });
});
