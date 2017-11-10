export async function defaultResponseBody (ctx, next) {
    ctx.response.body = { data: {} };
    await next();
}