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
var AppComponent = (function () {
    function AppComponent() {
        this.name = 'Angular';
        this.title = 'Tour of Heroes';
        this.heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];
        this.myHero = this.heroes[H.rand(0, this.heroes.length)];
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        template: "\n    <div class=\"row\" style=\"margin: 15px;\">\n      <div class=\"col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1\">\n        <h1>{{title}}</h1>\n        <hr>\n        <h2>My favorite hero is {{ myHero }}!</h2>\n        <div class=\"panel panel-default\">\n          <div class=\"panel-body\">\n            List of heros: <span *ngFor=\"let hero of heroes; let last = last\">{{ hero }}{{last ? '' : ', '}}</span>\n          </div>\n        </div>\n      </div>\n    </div>\n  ",
    })
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map