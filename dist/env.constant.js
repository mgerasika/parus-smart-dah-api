"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
require("dotenv").config();
exports.ENV = {
    VIBER_WEB_HOOK: process.env.VIBER_WEB_HOOK,
    PROXY_WEB_HOOK: process.env.PROXY_WEB_HOOK,
    VIBER_PROXY_TOKEN: process.env.VIBER_PROXY_TOKEN,
};
//# sourceMappingURL=env.constant.js.map