const loaders = require('./loaders');

// 应用点火
async function ignite(loader, siteGlobal) {
    let result = false;
    let exception = null;
    let tick = Date.now();
    try {
        result = await loader.exec(siteGlobal);
    } catch (e) {
        exception = e;
    } finally {
        tick = Date.now() - tick;
    }
    console.log(`[ignite] ${tick}ms ${loader.name} ${result ? 'success' : 'fail'}${result ? '' : exception.toString()}`);

    return {
        result,
        exception,
        tick,
    };
}

module.exports = {
    async exec(igniteStatus, siteGlobal) {
        igniteStatus.loaders = {};
        let successCount = 0;
        for (let i = 0; i < loaders.length; i++) {
            const loader = loaders[i];
            const loaderResult = await ignite(loader, siteGlobal);
            igniteStatus.loaders[loader.name] = loaderResult;
            loaderResult.result && (successCount++);
        }

        switch (true) {
        case successCount === loaders.length:
            igniteStatus.result = 'success';
            break;
        case successCount === 0:
            igniteStatus.result = 'fail';
            break;
        default:
            igniteStatus.result = 'partial';
        }
    },
};
