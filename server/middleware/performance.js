module.exports = async (ctx, next) => {
    const start = Date.now();

    await next();

    const cost = `${Date.now() - start}ms`;

    ctx.set('X-ResponseTime', cost);
};
