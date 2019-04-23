
export enum LogLevel {
    DEBUG,
    INFO,
    LOG,
    WARN,
    ERROR,
    CRITICAL_ERROR,
    NONE,
}

export interface ILogger {
    logLevel?: LogLevel;
}

export interface ILogMessage {
    message?: string;
    meta?: any;
}

export default class Logger {

    private _logLevel: LogLevel = LogLevel.NONE;

    constructor(config: ILogger = {}) {
        if (typeof config.logLevel !== 'undefined') {
            this._logLevel = config.logLevel;
        }
    }

    private _shouldWrite(severity: LogLevel): boolean {
        return severity < this._logLevel;
    }

    private _write(severity: LogLevel, { message, meta }: ILogMessage) {

        switch (severity) {
            case LogLevel.DEBUG:
                return void console.debug(`[DEBUG]: ${message}`, meta);
            case LogLevel.INFO:
                return void console.info(`[INFO]: ${message}`, meta);
            case LogLevel.LOG:
                return void console.log(`[LOG]: ${message}`, meta);
            case LogLevel.WARN:
                return void console.warn(`[WARN]: ${message}`, meta);
            case LogLevel.ERROR:
                return void console.error(`[ERROR]: ${message}`, meta);
            case LogLevel.CRITICAL_ERROR:
                return void console.error(`[CRITICAL_ERROR]: ${message}`, meta);
            case LogLevel.NONE:
                return;
            default:
                return void console.log(message, meta);
        }

    }

    private _outputMessage(severity: LogLevel, config: ILogMessage) {

        if (this._shouldWrite(severity)) { this._write(severity, config); }

    }

    public debug(logMessage: ILogMessage) {
        this._outputMessage(LogLevel.DEBUG, logMessage);
    }

    public info(logMessage: ILogMessage) {
        this._outputMessage(LogLevel.INFO, logMessage);
    }

    public log(logMessage: ILogMessage) {
        this._outputMessage(LogLevel.LOG, logMessage);
    }

    public warn(logMessage: ILogMessage) {
        this._outputMessage(LogLevel.WARN, logMessage);
    }

    public error(logMessage: ILogMessage) {
        this._outputMessage(LogLevel.ERROR, logMessage);
    }

    public criticalError(logMessage: ILogMessage) {
        this._outputMessage(LogLevel.CRITICAL_ERROR, logMessage);
    }

}

export const appLogger: Logger = new Logger();
