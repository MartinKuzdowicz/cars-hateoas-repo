var cfg = require('../config');

var ModelToRestResourceUtils = (() => {

    const createHALForOne = (model, host) => {
        let links = [
            {
                rel: 'self',
                href: `http://${host}${cfg.appMainRoute}/cars/${model._id}`
            },
            {
                rel: 'filterByType',
                href: `http://${host}${cfg.appMainRoute}/cars/?type=${encodeURIComponent(model.type)}`
            }
        ]
        return Object.assign({}, model.toJSON(), {links: links})
    }

    return {
        createHALForOne: createHALForOne
    }
})();

module.exports = ModelToRestResourceUtils;