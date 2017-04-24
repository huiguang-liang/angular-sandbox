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
var helpers_1 = require("./helpers");
var hero_service_1 = require("./hero.service");
// Class declarations
var HeroesComponent = (function () {
    function HeroesComponent(heroService, helper) {
        this.heroService = heroService;
        this.helper = helper;
        this.name = 'Angular';
    }
    HeroesComponent.prototype.getHeroes = function () {
        var _this = this;
        this.heroService.getHeroesCached().then(function (heroes) {
            _this.heroes = heroes;
        });
        this.heroService.getRandomHero().then(function (hero) {
            _this.randomHero = hero;
        });
    };
    HeroesComponent.prototype.ngOnInit = function () {
        this.getHeroes();
    };
    HeroesComponent.prototype.onSelect = function (hero) {
        this.selectedHero = hero;
    };
    return HeroesComponent;
}());
HeroesComponent = __decorate([
    core_1.Component({
        selector: 'my-heroes',
        template: "\n    <div class=\"row\" style=\"margin: 15px;\">\n      <div class=\"col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1\">\n        <div class=\"jumbotron jumbotron-add-padding\" *ngIf=\"randomHero; else loadingBlock\">\n          <h1>Random hero of the day is {{ randomHero.name }}!</h1>\n          <p>The rest of the roster: {{ randomHero.listHeroesExcluding(heroes) }}</p>\n        </div>\n        <ng-template #loadingBlock>\n          <div class=\"jumbotron jumbotron-add-padding\">\n            <h1>Loading Hero Roster ...</h1>\n            <p>Please be patient! We will display the roster of heroes as soon as it is loaded</p>\n          </div>\n        </ng-template>\n      </div>\n    </div>\n    <div class=\"row\" style=\"margin: 15px;\">\n      <div class=\"col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1\">\n        <h2>Hero Roster</h2>\n        <table class=\"table table-condensed heroes\">\n          <thead>\n          <tr>\n            <th class=\"col-xs-1 col-sm-1 col-md-1\">ID</th>\n            <th>Name</th>\n          </tr>\n          </thead>\n          <tbody>\n          <tr *ngFor=\"let hero of heroes\" [class.selected]=\"hero === selectedHero\" (click)=\"onSelect(hero)\">\n            <td>{{hero.id}}</td>\n            <td>{{hero.name}}</td>\n          </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n    <hero-detail [hero]=\"selectedHero\"></hero-detail>\n  ",
    }),
    __metadata("design:paramtypes", [hero_service_1.HeroService, helpers_1.Helper])
], HeroesComponent);
exports.HeroesComponent = HeroesComponent;
//# sourceMappingURL=heroes.component.js.map