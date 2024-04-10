"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api_response = void 0;
const api_response = (data, status, message = null) => {
    return {
        data: data,
        message: message,
        status: status,
    };
};
exports.api_response = api_response;
//# sourceMappingURL=response.js.map