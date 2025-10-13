"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
function handler(req, res) {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'Action+ API'
    });
}
