import {
    controllerManager,
    methodManager,
    RequestMethod,
    ContextWithLogger,
} from '../../routers/routerManager';

@controllerManager({ prefix: '/api/v1/user'})
export class User {
    @methodManager({path: '/', method: RequestMethod.GET, middlewares: []})
    public async getUser (ctx: ContextWithLogger) {
        ctx.requestLogger.info('GET api/v1/user', {body: ctx.method});
        return 'helloWord';
    }
}
