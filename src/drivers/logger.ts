import {
    loggers,
    format,
    transports,
    LoggerOptions,
} from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

let logLevel = 'debug';
switch (process.env.NODE_ENV) {
    case 'production':
        logLevel = 'info';
        break;
}

export enum LogType {
    WEBAPPS = 'webapps',
    BOSS = 'boss',
    TEST = 'test',
}

export function initLogger (label: string, type: LogType) {
    if (loggers.has(label)) {
        return loggers.get(label);
    }
    const rotateLogFileDir = `${__dirname}/../../logs/${type}/`;
    const rotateLogFileName = `${label}-%DATE%.log`;
    const rotateFileTransportOptions: DailyRotateFile.DailyRotateFileTransportOptions = {
        dirname: rotateLogFileDir,
        filename: rotateLogFileName,
        datePattern: 'YYYY-MM-DD-HH',
        maxFiles: '1d',
    };
    const logOptions: LoggerOptions = {
        level: logLevel,
        format: format.combine(
            format.timestamp(),
            format.label({ label }),
            format.prettyPrint(),
            format.metadata({ fillExcept: ['requestID', 'timestamp', 'label', 'level'] }),
            format.json(),
        ),
        transports: [
            new transports.Console(),
            new DailyRotateFile(rotateFileTransportOptions),
        ],
    };
    loggers.add(label, logOptions);
    return loggers.get(label);
}
