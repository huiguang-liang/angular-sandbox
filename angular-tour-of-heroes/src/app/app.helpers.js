"use strict";
var Helper = (function () {
    function Helper() {
    }
    Helper.prototype.rand = function (min, max) {
        return Math.floor(Math.random() * max) + min;
    };
    return Helper;
}());
exports.Helper = Helper;
//# sourceMappingURL=app.helpers.js.map