interface IGenericError {
    readonly code: string;
    readonly message: string;
}

export class GenericError extends Error {

    public readonly code: string;
    public readonly message: string;
    public readonly stack: string;

    constructor(config: IGenericError) {
        super(config.code);
        this.code = config.code;
        this.message = config.message;
        this.stack = this._resolveStack();
    }

    private _resolveStack: () => string = () => {

        const stackContainer: { stack: string } = { stack: '' };

        if (Error.captureStackTrace) {
            Error.captureStackTrace(stackContainer);
        } else {
            stackContainer.stack = this._getStackViaThrow();
        }

        return stackContainer.stack;

    }

    private _getStackViaThrow: () => string = () => {
        try {
            throw new Error();
        } catch (e) {
            return e && e.stack;
        }
    }

}
