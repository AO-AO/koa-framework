import {
    controllerManager,
    methodManager,
    RequestMethod
} from '../../routers/routerManager';

@controllerManager({ prefix: '/api/v2/user'})
export class User {
    @methodManager({path: '/info', method: RequestMethod.GET})
    public async getUser () {
        console.log('GET api/v2/user');
        throw (new Error('RATE_LIMIT_ERROR'));
    }
}
