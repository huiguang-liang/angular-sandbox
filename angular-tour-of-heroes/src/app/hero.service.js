"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var init_heroes_1 = require("./init-heroes");
var helpers_1 = require("./helpers");
var HeroService = (function () {
    function HeroService(helper) {
        this.helper = helper;
    }
    HeroService.prototype.getHeroes = function () {
        return Promise.resolve(init_heroes_1.HEROES);
    };
    HeroService.prototype.getHeroesSlowly = function () {
        var _this = this;
        return new Promise(function (resolve) {
            setTimeout(function () { return resolve(_this.getHeroes()); }, 2000);
        });
    };
    HeroService.prototype.getHeroesCached = function () {
        this.cachedPromise = this.cachedPromise || this.getHeroesSlowly();
        return this.cachedPromise;
    };
    HeroService.prototype.getRandomHero = function () {
        var _this = this;
        this.cachedRandomHero = this.cachedRandomHero || this.getHeroesCached().then(function (heroes) { return Promise.resolve(heroes[_this.helper.rand(0, heroes.length)]); });
        return this.cachedRandomHero;
    };
    return HeroService;
}());
HeroService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [helpers_1.Helper])
], HeroService);
exports.HeroService = HeroService;
//# sourceMappingURL=hero.service.js.map