
module.exports = {
    create: name => async (ctx, next) => {
        try {
            const func = require(`./${name}`);
            await func(ctx, next);
        } catch (e) {
            const errorTags = {
                middleware: name,
                url: ctx.href,
            };
            Object.assign(errorTags, ctx.header);
        }
    },
};
