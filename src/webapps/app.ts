import * as Koa from 'koa';
import { globalRouter } from './routers/routerManager';
import { requestLogger } from './middlewares/requestLogger';

const app = new Koa();

// 挂载accessLogger

// 挂载requestLogger
app.use(requestLogger);

// look ma, error propagation!
app.use(globalRouter.routes());

app.listen(3000);
