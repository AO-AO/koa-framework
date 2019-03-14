import * as Koa from 'koa';
import { globalRouter } from './routers/routerManager';

const app = new Koa();

// look ma, error propagation!
app.use(globalRouter.routes());

app.listen(3000);
