const PagingUtils = (() => {

    const _calcSkipVal = (page, size) => page > 0 ? ((page - 1) * size) : 0;

    const calculateSkipAndLimit = (req) => {
        const pageParam = req.query.page || 1;
        const page = pageParam ? parseInt(pageParam) : 1;
        const sizeParam = req.query.size || 3;
        const size = parseInt(sizeParam);

        const skip = _calcSkipVal(page, size);

        return {
            skip,
            limit: size,
            page,
            size
        }
    };

    return {
        calculateSkipAndLimit: calculateSkipAndLimit
    }

})();

module.exports = PagingUtils;