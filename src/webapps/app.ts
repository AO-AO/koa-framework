import * as Koa from 'koa';
import { globalRouter } from './routers/routerManager';
import { requestLogger } from './middlewares/requestLogger';
import { initLogger, LogType } from '../drivers/logger';

const appLogger = initLogger('APP', LogType.WEBAPPS);

/**
 * 格式化NODE_ENV
 */
switch (process.env.NODE_ENV) {
  case 'local':
    break;
  case 'development':
    break;
  case 'production':
    break;
  default:
    appLogger.error('[app] NODE_ENV Error', { NODE_ENV: process.env.NODE_ENV });
    throw (new Error('NODE_ENV_ERROR'));
}

const app = new Koa();

// 挂载accessLogger

// 挂载requestLogger
app.use(requestLogger);

// look ma, error propagation!
app.use(globalRouter.routes());

app.listen(3000);
