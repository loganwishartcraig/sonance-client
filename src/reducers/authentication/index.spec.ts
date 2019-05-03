import authenticationReducer, { IAuthenticationState } from '.';
import { AuthenticationAction, AuthenticationActionType } from '../../actions/authentication';
import { Utilities } from '../../utilities';

describe('Reducers - Authentication', () => {

    let testInitialState: IAuthenticationState;
    let testPopulatedState: IAuthenticationState;
    let testInitialStateWithError: IAuthenticationState;

    beforeEach(() => {

        testInitialState = {
            session: undefined,
            loading: false,
            error: {
                code: undefined,
                message: undefined,
            },
            auth: {
                cacheResolved: false,
                authorized: false,
            },
        };

        testPopulatedState = {
            session: 'xxx-xxx-xxx-xxx-session-id',
            loading: false,
            error: {
                code: undefined,
                message: undefined,
            },
            auth: {
                cacheResolved: true,
                authorized: true,
            },
        };

        testInitialStateWithError = {
            session: undefined,
            loading: false,
            error: {
                code: 'TEST_CODE' as any,
                message: 'Test message',
            },
            auth: {
                cacheResolved: false,
                authorized: false,
            },
        };

    });

    it('Should not process a non-authentication action', () => {

        // TODO: Don't like relying on un-tested code here.
        const frozen = Utilities.deepClone(testPopulatedState);

        const nextState = authenticationReducer(testPopulatedState, {
            type: 'DUMMY_ACTION',
        } as any);      // Cast to `any` to allow arbitrary action shape

        expect(testPopulatedState).toBe(nextState);
        expect(testPopulatedState).toEqual(frozen);

    });

    it('Should produce the correct initial state', () => {

        const initialState: IAuthenticationState = authenticationReducer(undefined as any, {
            type: 'DUMMY_ACTION',
        } as any);

        expect(initialState).toEqual(testInitialState);

    });

    it('Should produce the correct LOGIN_START state', () => {

        // TODO: find way to remove this dep on untested code.
        const expected: IAuthenticationState = {
            ...Utilities.deepClone(testInitialState),
            loading: true,
        };

        const action: AuthenticationAction[AuthenticationActionType.LOGIN_START_NATIVE] = {
            type: AuthenticationActionType.LOGIN_START_NATIVE,
            payload: {
                email: 'test-username',
                password: 'test-password',
            },
        };

        const state = authenticationReducer(testInitialState, action);

        expect(state).toEqual(expected);
        expect(state).not.toBe(testInitialState);

    });

    it('Should clear any set auth error on LOGIN_START', () => {

        // TODO: find way to remove this dep on untested code.
        const expected: IAuthenticationState = {
            ...Utilities.deepClone(testInitialStateWithError),
            loading: true,
            error: {
                code: undefined,
                message: undefined,
            },
        };

        const action: AuthenticationAction[AuthenticationActionType.LOGIN_START_NATIVE] = {
            type: AuthenticationActionType.LOGIN_START_NATIVE,
            payload: {
                email: 'test-username',
                password: 'test-password',
            },
        };

        const state = authenticationReducer(testInitialStateWithError, action);

        expect(state).toEqual(expected);
        expect(state).not.toBe(testInitialStateWithError);

    });

    it('Should produce the correct LOGIN_FAILED state', () => {

        const expected: IAuthenticationState = Utilities.deepClone(testInitialStateWithError);

        const action: AuthenticationAction[AuthenticationActionType.LOGIN_FAILED] = {
            type: AuthenticationActionType.LOGIN_FAILED,
            payload: {
                code: testInitialStateWithError.error.code as string,
                message: testInitialStateWithError.error.message as string,
            },
        };

        const state = authenticationReducer(testInitialState, action);

        expect(state).toEqual(expected);
        expect(state).not.toBe(testInitialState);

    });

    it('Should produce the correct LOGIN_SUCCESS state', () => {

        const action: AuthenticationAction[AuthenticationActionType.LOGIN_SUCCESS_NATIVE] = {
            type: AuthenticationActionType.LOGIN_SUCCESS_NATIVE,
        };

        const expected: IAuthenticationState = {
            ...Utilities.deepClone(testInitialState),
            auth: {
                ...testInitialState.auth,
                authorized: true,
            },
        };

        const state = authenticationReducer(testInitialState, action);

        expect(state).toEqual(expected);
        expect(state).not.toBe(testInitialState);

    });

    it('Produces the correct LOGIN_FINISHED state', () => {

        const base: IAuthenticationState = {
            ...Utilities.deepClone(testPopulatedState),
            loading: true,
        };

        const action: AuthenticationAction[AuthenticationActionType.LOGIN_FINISHED] = {
            type: AuthenticationActionType.LOGIN_FINISHED,
        };

        const expected = testPopulatedState;

        const state = authenticationReducer(base, action);

        expect(state).toEqual(expected);
        expect(state).not.toBe(base);

    });

    it('Produces the correct LOGOUT state', () => {

        // const base = generateStateClone(testPopulatedState);

        const action: AuthenticationAction[AuthenticationActionType.LOGOUT] = {
            type: AuthenticationActionType.LOGOUT,
        };

        const expected: IAuthenticationState = {
            ...Utilities.deepClone(testPopulatedState),
            auth: {
                ...testPopulatedState.auth,
                authorized: false,
            },
        };

        const state = authenticationReducer(testPopulatedState, action);

        expect(state).toEqual(expected);
        expect(state).not.toBe(testPopulatedState);

    });

    it('Produces the correct SET_SESSION state', () => {

        const session = 'xxx-xxx-xxx-test-session-id';

        const action: AuthenticationAction[AuthenticationActionType.SET_SESSION] = {
            type: AuthenticationActionType.SET_SESSION,
            payload: { session },
        };

        const expected: IAuthenticationState = {
            ...Utilities.deepClone(testInitialState),
            session,
        };

        const state = authenticationReducer(testInitialState, action);

        expect(state).toEqual(expected);
        expect(state).not.toBe(testInitialState);

    });

    it('Produces the correct CLEAR_SESSION state', () => {

        // const base = generateStateClone(testPopulatedState);

        const action: AuthenticationAction[AuthenticationActionType.CLEAR_SESSION] = {
            type: AuthenticationActionType.CLEAR_SESSION,
        };

        const expected: IAuthenticationState = {
            ...Utilities.deepClone(testPopulatedState),
            session: undefined,
        };

        const state = authenticationReducer(testPopulatedState, action);

        expect(state).toEqual(expected);
        expect(state).not.toBe(testPopulatedState);

    });

});
