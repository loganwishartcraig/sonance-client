import { GenericError } from './GenericError';

describe('Class - GenericError', () => {

    it('Should extend the native `Error` class', () => {

        const error = new GenericError({
            code: 'TEST_CODE',
            message: 'TEST_MESSAGE',
        });

        expect(error).toBeInstanceOf(Error);

    });

    it('Should assign the correct properties', () => {

        const code = 'TEST_CODE';
        const message = 'TEST_MESSAGE';
        const meta = { test: 'string', test2: ['a'] };

        const error = new GenericError({ code, message, meta });

        expect(error.code).toBe(code);
        expect(error.message).toBe(message);
        expect(error.meta).toEqual(meta);

    });

    it('Should produce the correct `meta` default', () => {

        const error = new GenericError({
            code: 'TEST_CODE',
            message: 'TEST_MESSAGE',
        });

        expect(error.meta).toBeUndefined();

    });

    it('Should produce a stack trace', () => {

        const error = new GenericError({
            code: 'TEST_CODE',
            message: 'TEST_MESSAGE',
        });

        expect(typeof error.stack).toBe('string');
        expect(error.stack).toBeTruthy();

    });

});
