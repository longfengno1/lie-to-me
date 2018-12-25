const KoaRouter = require('koa-router');

const isProd = process.env.NODE_ENV === 'production';

const CommonStatus = {
    404: 'method not support',
    500: 'Something broke',
};


function errorHandle(ctx) {
    if (ctx.status === 404) {

        // TODO:无404模板
        ctx.body = `<h1>哦豁</h1>`;
    }
}

module.exports = (koaApp, vd = '/') => {
    const router = new KoaRouter();

    // historyApiFallback and ssr
    router.get('*', (ctx, next) => {
        const { _SERVICE_NODEJS_SITE_: { renderer } } = ctx.state.global;

        if (!renderer) {
            ctx.body = 'waiting for compilation.. refresh in a moment.';
            return;
        }
        const context = { title: 'Lie To Me', url: ctx.url };

        return new Promise(((resolve, reject) => {
            renderer.renderToString(
                context,
                (err, html) => {
                    if (err) {
                        if (err.url) {
                            ctx.redirect(err.url);
                        } else if (err.code === 404) {
                            ctx.status = 404;
                            errorHandle(ctx);
                        } else {
                            ctx.status = 500;
                            errorHandle(ctx);
                            !isProd && console.error(`error during render : ${ctx.url}`)
                            !isProd && console.error(err.stack)
                        }
                    } else {
                        ctx.type = 'text/html';
                        ctx.body = html;
                    }

                    resolve();
                });
        }));
    });

    koaApp.use(router.routes());
    koaApp.use(router.allowedMethods());
};
