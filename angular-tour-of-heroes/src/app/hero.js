"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ident_1 = require("./ident");
var Hero = (function () {
    function Hero(n) {
        this.idInstance = ident_1.Ident.getInstance();
        this.id = this.idInstance.getNextId();
        this.name = n;
    }
    Hero.prototype.isEqual = function (h) {
        return h.id === this.id && h.name === this.name;
    };
    Hero.prototype.listHeroesExcluding = function (h) {
        var r = this;
        var heroes = h.filter(function (x) {
            return !x.isEqual(r);
        });
        var heroNames = Array.from(heroes, function (x) { return x.name; });
        return heroNames.splice(0, heroNames.length - 2).concat(heroNames.splice(-2).join(" & ")).join(", ");
    };
    Hero.prototype.valueOf = function () {
        return JSON.stringify({
            id: this.id,
            name: this.name
        });
    };
    return Hero;
}());
exports.Hero = Hero;
//# sourceMappingURL=hero.js.map