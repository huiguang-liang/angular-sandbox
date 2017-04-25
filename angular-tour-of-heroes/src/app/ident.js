"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ident = (function () {
    function Ident() {
    }
    Ident.getInstance = function () {
        this.Id = this.Id || new Ident();
        this.Id.id = this.Id.id || 0;
        return this.Id;
    };
    Ident.prototype.getNextId = function () {
        return this.id++;
    };
    return Ident;
}());
exports.Ident = Ident;
//# sourceMappingURL=ident.js.map