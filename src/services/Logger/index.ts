
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
    private static _MessageSeverityPrefix: {
        [level in LogLevel]: string;
    } = {
            [LogLevel.DEBUG]: '[DEBUG]',
            [LogLevel.INFO]: '[INFO]',
            [LogLevel.LOG]: '[LOG]',
            [LogLevel.WARN]: '[WARN]',
            [LogLevel.ERROR]: '[ERROR]',
            [LogLevel.CRITICAL_ERROR]: '[CRITICAL_ERROR]',
            [LogLevel.NONE]: '[NONE]',
        };

    private _logLevel: LogLevel = LogLevel.NONE;

    constructor(config: ILogger = {}) {
        if (typeof config.logLevel !== 'undefined') {
            this._logLevel = config.logLevel;
        }
    }

    private _shouldWrite(severity: LogLevel): boolean {
        return severity < this._logLevel;
    }

    private _write(severity: LogLevel, config: ILogMessage) {

        const args = this._getConsoleArgs(severity, config);

        switch (severity) {
            case LogLevel.DEBUG:
                return void console.debug.apply(console, args);
            case LogLevel.INFO:
                return void console.info.apply(console, args);
            case LogLevel.LOG:
                return void console.log.apply(console, args);
            case LogLevel.WARN:
                return void console.warn.apply(console, args);
            case LogLevel.ERROR:
                return void console.error.apply(console, args);
            case LogLevel.CRITICAL_ERROR:
                return void console.error.apply(console, args);
            case LogLevel.NONE:
                return;
            default:
                return void console.log(config);
        }

    }

    private _getConsoleArgs(severity: LogLevel, { message, meta }: ILogMessage): [string] | [string, any] {

        const prefix = Logger._MessageSeverityPrefix[severity];
        const formattedMessage = `[LOGGER] ${prefix}: ${message}`;

        return (meta) ? [formattedMessage, meta] : [formattedMessage];
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
