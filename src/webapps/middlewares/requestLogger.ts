import {
    Context,
} from 'koa';

export async function requestLogger (ctx: Context) {
    ctx.requestLogger = console;
}
