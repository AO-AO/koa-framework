import {
    controllerManager,
    methodManager,
    RequestMethod
} from '../../routerManager';

@controllerManager({ prefix: 'api/v1/user'})
export class User {
    @methodManager({method: RequestMethod.GET})
    public async getUser () {
        console.log('GET api/v1/user');
    }
}
