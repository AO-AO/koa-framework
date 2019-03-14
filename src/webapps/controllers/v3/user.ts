import {
    controllerManager,
    methodManager,
    RequestMethod
} from '../../routers/routerManager';

@controllerManager({ prefix: '/api/v3/user'})
export class User {
    @methodManager({path: '/info', method: RequestMethod.GET})
    public async getUser () {
        console.log('GET api/v3/user');
        throw (new Error('hhhhhhhhhh'));
    }
}
