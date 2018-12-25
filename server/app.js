const fs = require('fs');
const Koa = require('koa');
const chalk = require('chalk');
const helmet = require('koa-helmet');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const LRU = require('lru-cache');
const staticServer = require('koa-static-plus');
const { createBundleRenderer } = require('vue-server-renderer');

const Ignitor = require('./ignite');
const middleware = require('./middleware');
const globalState = require('./middleware/global');
const router = require('./router');

const resolve = file => path.resolve(__dirname, file);

const isProd = process.env.NODE_ENV === 'production';

// 引入对Date.prototype的扩展，以方便在代码中操作日期
require('./utils/Date.js');

const _SERVICE_IGNITE_STATUS_ = {};
const _SERVICE_NODEJS_SITE_ = {}; // 暂时没用

function createRenderer(bundle, options = {}) {
    return createBundleRenderer(bundle, Object.assign(options, {
        cache: LRU({
            max: 1000,
            maxAge: 1000 * 60 * 15,
        }),
        basedir: resolve('../dist'),
        // recommended for performance
        runInNewContext: false
    }));
}

Ignitor.exec(_SERVICE_IGNITE_STATUS_, _SERVICE_NODEJS_SITE_).then(() => {
    const state = Object.create(null);

    Object.assign(state, {
        _SERVICE_IGNITE_STATUS_,
        _SERVICE_NODEJS_SITE_,
    });

    const vd = '/';
    const port = process.env.PORT || 9001;

    const app = new Koa();

    // 挂载开发or生产环境下的渲染模式与模板
    if (isProd) {
        const template = fs.readFileSync(_SERVICE_NODEJS_SITE_.templatePath, 'utf-8');
        const bundle = require('../dist/vue-ssr-server-bundle.json');
        const clientManifest = require('../dist/vue-ssr-client-manifest.json');

        try {
            _SERVICE_NODEJS_SITE_.renderer = createRenderer(bundle, {
                template,
                clientManifest
            });
        } catch (err) {
            console.log(err);
        }

    } else {
        require('../build/setup-dev-server')(app, {
            templatePath: _SERVICE_NODEJS_SITE_.templatePath,
            updated: (bundle, options) => {
                _SERVICE_NODEJS_SITE_.renderer = createRenderer(bundle, options);
            },
        });
    }

    const staticPath = resolve('../dist'); // 静态资源路径
    const staticOutputPath = '/dist'; // 静态资源输出路径

    // 加载静态资源
    app.use(staticServer(staticPath, { pathPrefix: staticOutputPath }));

    // 绑定全局变量
    app.use(globalState(state));
    // 请求时间记录
    app.use(middleware.create('performance'));
    // 将请求体转换为 JSON 的中间件
    app.use(bodyParser());
    // 配置Koa下的一些安全策略，参考：https://github.com/venables/koa-helmet#readme
    app.use(helmet());
    app.use(middleware.create('uuid'));

    router(app, vd);

    app.listen(port, () => {
        if(!isProd){
            console.log('')
            console.log(chalk.green('application started prot: ')+ chalk.yellowBright(port));
            console.log('')
        }
    });
});

