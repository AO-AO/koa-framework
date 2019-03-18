import {
    Context,
    Next
} from '../routers/routerManager';

import {
    initLogger,
    LogType,
} from '../../drivers/logger';

const logger = initLogger('requestLogger', LogType.WEBAPPS);

function genRequestID () {
    let template = '####-####';
    while (template.includes('#')) {
        template = template.replace('#', Math.floor((Math.random() * 10)).toString());
    }
    return template;
}

// tslint:disable-next-line:no-any
export async function requestLogger (ctx: Context, next: Next) {

    const uuidLog = logger.child({ requestID: genRequestID() });
    ctx.requestLogger = uuidLog;
    await next();
}
