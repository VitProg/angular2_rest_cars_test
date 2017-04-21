"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Pager = (function () {
    function Pager(values) {
        if (values === void 0) { values = {}; }
        Object.assign(this, values);
    }
    Object.defineProperty(Pager.prototype, "offset", {
        get: function () {
            return Math.max(0, this.currentPage * this.perPage - this.perPage);
        },
        enumerable: true,
        configurable: true
    });
    return Pager;
}());
exports.Pager = Pager;
