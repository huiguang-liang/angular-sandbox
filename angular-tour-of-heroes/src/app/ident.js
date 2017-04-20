"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ident = (function () {
    function Ident() {
        this.id = 0;
    }
    Ident.getInstance = function () {
        if (!this.Id) {
            this.Id = new Ident();
        }
        return this.Id;
    };
    Ident.prototype.getNextId = function () {
        return this.id++;
    };
    return Ident;
}());
exports.Ident = Ident;
//# sourceMappingURL=ident.js.map