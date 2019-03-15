import {
    loggers,
    format,
    transports,
    LoggerOptions,
} from 'winston';

let logLevel = 'debug';
switch (process.env.NODE_ENV) {
    case 'production':
        logLevel = 'info';
        break;
}

export enum LogType {
    'webapps',
    'boss',
    'test',
}

export function initLogger (label: string, type: LogType) {
    if (loggers.has(label)) {
        return loggers.get(label);
    }
    const logFilePath = `${__dirname}/../../logs/${type}/${label}.log`;
    const fileTransportsOptions: transports.FileTransportOptions = {
        filename: logFilePath,
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
            new transports.File(fileTransportsOptions),
        ],
    };
    loggers.add(label, logOptions);
    return loggers.get(label);
}
