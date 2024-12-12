/**
 * @param {Function} controller
 * @returns {Function}
 * @description
 * リクエスト処理のエラーハンドリングを行うミドルウェア
 */
function requestErrorHandler(controller) {
    return async function (req, res, next) {
        try {
            return await controller(req, res);
        } catch (error) {
            next(error);
        }
    };
}

export { requestErrorHandler };
