import {
    controllerManager,
    methodManager,
    RequestMethod,
    Context,
} from '../../routers/routerManager';
import { requestLogger } from '../../middlewares/requestLogger';

@controllerManager({ prefix: '/api/v1/user'})
export class User {
    @methodManager({path: '/', method: RequestMethod.GET, middlewares: [requestLogger]})
    public async getUser (ctx: Context) {
        console.log('GET api/v1/user', ctx);
        return 'helloWord';
    }
}
