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

    const createHALForAll = (cars, page, size, host, carsCollectionSize) => {
        return {
            content: cars,
            links: [
                {
                    'rel': 'next',
                    'href': `http://${host}${cfg.appMainRoute}/cars/?page=${page+1}&size=${size}`
                },
                {
                    'rel': 'prev',
                    'href': `http://${host}${cfg.appMainRoute}/cars/?page=${page-1}&size=${size}`
                },
                {
                    'rel': 'first',
                    'href': `http://${host}${cfg.appMainRoute}/cars/?page=${1}&size=${size}`
                },
                {
                    'rel': 'last',
                    'href': `http://${host}${cfg.appMainRoute}/cars/?page=${carsCollectionSize-size}&size=${size}`
                },
                {
                    'rel': 'self',
                    'href': `http://${host}${cfg.appMainRoute}/cars/?page=${page}&size=${size}`
                }
            ]
        }
    }

    return {
        createHALForOne: createHALForOne,
        createHALForAll: createHALForAll
    }
})();

module.exports = ModelToRestResourceUtils;