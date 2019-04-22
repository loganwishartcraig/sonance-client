import authenticationReducer, { IAuthenticationState } from '.';
import { AuthenticationAction, AuthenticationActionType } from '../../action-creators/authentication';
import { ILoginSuccess } from '../../services/authentication/authentication-service/authentication-service';
import { testUser } from '../user/index.spec';

const testInitialState: IAuthenticationState = {
    session: undefined,
    loading: false,
    error: {
        code: undefined,
        message: undefined,
    },
    auth: {
        authorized: false,
    },
};

const testPopulatedState: IAuthenticationState = {
    session: 'xxx-xxx-xxx-xxx-session-id',
    loading: false,
    error: {
        code: undefined,
        message: undefined,
    },
    auth: {
        authorized: true,
    },
};

const generateStateClone = (base: IAuthenticationState): IAuthenticationState => ({
    ...base,
    error: { ...base.error },
    auth: { ...base.auth },
});

describe('Reducers - Authentication', () => {

    it('Should not process a non-authentication action', () => {

        const prevState = generateStateClone(testPopulatedState);

        const nextState = authenticationReducer(prevState, {
            type: 'DUMMY_ACTION',
        } as any);      // Cast to `any` to allow arbitrary action shape

        expect(prevState).toBe(nextState);

    });

    it('Should produce the correct initial state', () => {

        const expected: IAuthenticationState = generateStateClone(testInitialState);

        const initialState: IAuthenticationState = authenticationReducer(undefined as any, {
            type: 'DUMMY_ACTION',
        } as any);

        expect(initialState).toEqual(expected);

    });

    it('Should produce the correct LOGIN_START state', () => {

        const base: IAuthenticationState = generateStateClone(testInitialState);

        const expected: IAuthenticationState = {
            ...generateStateClone(testInitialState),
            loading: true,
        };

        const action: AuthenticationAction[AuthenticationActionType.LOGIN_START_NATIVE] = {
            type: AuthenticationActionType.LOGIN_START_NATIVE,
            payload: {
                email: 'test-username',
                password: 'test-password',
            },
        };

        const state = authenticationReducer(base, action);

        expect(state).toEqual(expected);
        expect(state).not.toBe(base);

    });

    it('Should clear any set auth error on LOGIN_START', () => {

        const base: IAuthenticationState = {
            ...generateStateClone(testInitialState),
            error: {
                code: 'TEST_CODE' as any,
                message: 'Test message',
            },
        };

        const expected: IAuthenticationState = {
            ...generateStateClone(testInitialState),
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

        const state = authenticationReducer(base, action);

        expect(state).toEqual(expected);
        expect(state).not.toBe(base);

    });

    it('Should produce the correct LOGIN_FAILED state', () => {

        const base: IAuthenticationState = generateStateClone(testInitialState);

        const error = {
            code: 'TEST_CODE' as any,
            message: 'Test message',
        };

        const expected: IAuthenticationState = {
            ...generateStateClone(testInitialState),
            error: { ...error },
        };

        const action: AuthenticationAction[AuthenticationActionType.LOGIN_FAILED] = {
            type: AuthenticationActionType.LOGIN_FAILED,
            payload: { ...error },
        };

        const state = authenticationReducer(base, action);

        expect(state).toEqual(expected);
        expect(state).not.toBe(base);

    });

    it('Should produce the correct LOGIN_SUCCESS state', () => {

        const base: IAuthenticationState = generateStateClone(testInitialState);

        const successPayload: ILoginSuccess = {
            user: { ...testUser },
        };

        const action: AuthenticationAction[AuthenticationActionType.LOGIN_SUCCESS_NATIVE] = {
            type: AuthenticationActionType.LOGIN_SUCCESS_NATIVE,
        };

        const expected: IAuthenticationState = {
            ...generateStateClone(testInitialState),
            auth: { authorized: true },
        };

        const state = authenticationReducer(base, action);

        expect(state).toEqual(expected);
        expect(state).not.toBe(base);

    });

    it('Produces the correct LOGIN_FINISHED state', () => {

        const base: IAuthenticationState = {
            ...generateStateClone(testPopulatedState),
            loading: true,
        };

        const action: AuthenticationAction[AuthenticationActionType.LOGIN_FINISHED] = {
            type: AuthenticationActionType.LOGIN_FINISHED,
        };

        const expected = generateStateClone(testPopulatedState);

        const state = authenticationReducer(base, action);

        expect(state).toEqual(expected);
        expect(state).not.toBe(base);

    });

    it('Produces the correct LOGOUT state', () => {

        const base = generateStateClone(testPopulatedState);

        const action: AuthenticationAction[AuthenticationActionType.LOGOUT] = {
            type: AuthenticationActionType.LOGOUT,
        };

        const expected: IAuthenticationState = {
            ...generateStateClone(testPopulatedState),
            auth: { ...generateStateClone(testInitialState).auth },
        };

        const state = authenticationReducer(base, action);

        expect(state).toEqual(expected);
        expect(state).not.toBe(base);

    });

    it('Produces the correct SET_SESSION state', () => {

        const base = generateStateClone(testInitialState);

        const session = 'xxx-xxx-xxx-test-session-id';

        const action: AuthenticationAction[AuthenticationActionType.SET_SESSION] = {
            type: AuthenticationActionType.SET_SESSION,
            payload: { session },
        };

        const expected: IAuthenticationState = {
            ...generateStateClone(testInitialState),
            session,
        };

        const state = authenticationReducer(base, action);

        expect(state).toEqual(expected);
        expect(state).not.toBe(base);

    });

    it('Produces the correct CLEAR_SESSION state', () => {

        const base = generateStateClone(testPopulatedState);

        const action: AuthenticationAction[AuthenticationActionType.CLEAR_SESSION] = {
            type: AuthenticationActionType.CLEAR_SESSION,
        };

        const expected: IAuthenticationState = {
            ...generateStateClone(testPopulatedState),
            session: undefined,
        };

        const state = authenticationReducer(base, action);

        expect(state).toEqual(expected);
        expect(state).not.toBe(base);

    });

});
