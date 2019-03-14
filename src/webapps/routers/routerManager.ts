// tslint:disable:no-console
import { Context } from 'koa';
import * as Router from 'koa-router';
import { Middleware } from 'koa-compose';
import { listFileNames } from '../../drivers/fs';
import {
    ERRORS,
    INTERNAL_SERVER_ERROR,
} from '../errors';

const CONTROLLERSDIR = `${__dirname}/../controllers`;

export { Context } from 'koa';

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
        globalRouter.use(prefix, target.prototype.router.routes(), target.prototype.router.allowedMethods());
        console.log(globalRouter.stack.map((i) => i.path));
    };
}

export function methodManager (params: MethodParams): MethodDecorator {
    const {
        path = '/',
        middlewares = [],
        method,
    } = params;
    // tslint:disable-next-line:no-any
    return (target: any, propertyKey: string | symbol, description: PropertyDescriptor) => {
        if (target.constructor.prototype.router === undefined) {
            target.constructor.prototype.router = new Router();
        }
        target.constructor.prototype.router[method](
            path,
            responseMethod(description.value),
            ...middlewares,
        );
    };
}

// tslint:disable-next-line:no-any
function responseMethod (controllerMethod: (context: Context) => Promise<any>) {
    // tslint:disable-next-line:no-any
    return async (context: Context, next: () => Promise<any>) => {
        try {
            const resultData = await controllerMethod(context);
            const result = {
                data: resultData,
                meta: {
                    server_time: Date.now(),
                    code: 200
                },
            };
            context.response.body = result;
        } catch (err) {
            errorHandler(context, err);
        }
        next();
    };
}

function errorHandler (ctx: Context, err: Error) {
    console.log(err);
    let gxError = INTERNAL_SERVER_ERROR;
    if (ERRORS[err.message] !== undefined) {
        gxError = ERRORS[err.message];
    }
    ctx.status = gxError.httpCode;
    ctx.body = gxError;
}

// 显示require所有的controller
const allControllerFiles = listFileNames(CONTROLLERSDIR);
allControllerFiles.forEach((absolutePath) => {
    require(absolutePath);
});
