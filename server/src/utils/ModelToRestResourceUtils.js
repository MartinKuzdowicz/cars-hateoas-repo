var cfg = require('../config');

var ModelToRestResourceUtils = (() => {

    const createHAL = (model, host) => {
        let links = {
            self: `http://${host}${cfg.appMainRoute}/cars/${model._id}`,
            filterByType: `http://${host}${cfg.appMainRoute}/cars/?type=${encodeURIComponent(model.type)}`
        };
        return Object.assign({}, model.toJSON(), {links: links})
    }

    return {
        createHAL: createHAL
    }
})();

module.exports = ModelToRestResourceUtils;