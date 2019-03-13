import { Context } from 'koa';
import * as Router from 'koa-router';
import { Middleware } from 'koa-compose';
import { listFileNames } from '../drivers/fs';

export const globalRouter = new Router();

export enum RequestMethod {
    GET = 'get',
    POST = 'post',
    DELETE = 'delete',
}

export interface ControllerParams {
    prefix?: string;
    middlewares?: Array<Middleware<Context>>;
}
export interface MethodParams {
    path?: string;
    middlewares?: Array<Middleware<Context>>;
    method: RequestMethod;
}

export function controllerManager (params: ControllerParams) {
    const {
        prefix = '/',
        middlewares,
    } = params;
    // tslint:disable-next-line:no-any
    return (target: any) => {
        if (target.prototype.router === undefined) {
            target.prototype.router = new Router();
        }
        if (middlewares) {
            target.prototype.router.use(...middlewares);
        }
        globalRouter.use(prefix, target.prototype.router.routes());
        globalRouter.use(target.prototype.router.allowedMethods());
    };
}

export function methodManager (params: MethodParams): MethodDecorator {
    const {
        path = '/',
        middlewares,
        method,
    } = params;
    return (target: object, propertyKey: string | symbol, description: PropertyDescriptor) => {
        if (target.constructor.prototype.router === undefined) {
            target.constructor.prototype.router = new Router();
        }
        if (middlewares) {
            target.constructor.prototype.router.use(...middlewares);
        }
        target.constructor.prototype.router[method](path, target.constructor.prototype.router.routes());
        target.constructor.prototype.router.use(target.constructor.prototype.router.allowedMethods());
    };
}

// 显示require所有的controller

const allControllerFiles = listFileNames(`${__dirname}/controllers`);
allControllerFiles.forEach((absolutePath) => {
    require(absolutePath);
});
