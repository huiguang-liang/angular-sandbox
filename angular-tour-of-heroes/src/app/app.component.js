"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var app_helpers_1 = require("./app.helpers");
var H = new app_helpers_1.Helper;
// Class declarations
var Id = (function () {
    function Id() {
        this.id = 0;
    }
    Id.prototype.getNextId = function () {
        return this.id++;
    };
    return Id;
}());
exports.Id = Id;
var I = new Id;
var Hero = (function () {
    function Hero(n) {
        this.id = I.getNextId();
        this.name = n;
    }
    Hero.prototype.isEqual = function (h) {
        return h.id === this.id && h.name === this.name;
    };
    Hero.listHeroesExcluding = function (h, r) {
        // listHeroesExcluding(h: Hero[], excludeH: Hero[]) {
        //var heroes = Array.from(h, x => x.valueOf());
        // var excludeHeroes = Array.from(h, x => x.valueOf());
        //
        // return heroes.concat(excludeHeroes).toString();
        // return heroes;
        var heroes = h.filter(function (x) {
            return !x.isEqual(r);
        });
        return Array.from(heroes, function (x) { return x.valueOf(); });
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
var AppComponent = (function () {
    function AppComponent() {
        this.name = 'Angular';
        this.title = 'Tour of Heroes';
        this.heroes = [
            new Hero('Windstorm'),
            new Hero('Bombasto'),
            new Hero('Mr. Nice'),
        ];
        // heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];
        this.randomHero = this.heroes[H.rand(0, this.heroes.length)];
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        template: "\n    <div class=\"row\" style=\"margin: 15px;\">\n      <div class=\"col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1\">\n        <h1>{{title}}</h1>\n        <hr>\n        <div class=\"jumbotron jumbotron-add-padding\">\n          <h1>Random hero of the day is {{ randomHero.name }}!</h1>\n          <p>The other heros are: <span *ngFor=\"let hero of heroes; let last = last; let first = first; let i = index\">{{hero.valueOf()}}</span></p>\n        </div>\n      </div>\n    </div>\n  ",
    })
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map