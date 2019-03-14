interface GxError {
    httpCode: number;
    errorCode: number;
    desc: string;
}
interface GxErrors {
    [message: string]: GxError
}

export const ERRORS: GxErrors = {
    RATE_LIMIT_ERROR: {
        httpCode: 403,
        errorCode: 20001,
        desc: 'Reach Rate Limit',
    },
};

export const INTERNAL_SERVER_ERROR: GxError = {
    httpCode: 500,
    errorCode: 20000,
    desc: 'Internal Server Error',
};
