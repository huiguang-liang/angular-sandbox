import { Component } from '@angular/core';
import { Helper } from './app.helpers';

let H = new Helper;

// Class declarations
export class Ident {

  protected id: number;
  protected static Id: Ident;

  constructor () {
    this.id = 0;
  }

  static getInstance(): Ident {
    if (!this.Id) {
      this.Id = new Ident();
    }
    return this.Id;
  }

  public getNextId() {
    return this.id++;
  }
}

export class Hero {

  readonly id: number;
  public name: string;

  idInstance = Ident.getInstance();

  constructor (n: string) {
    this.id = this.idInstance.getNextId();
    this.name = n;
  }

  isEqual(h: Hero) {
    return h.id === this.id && h.name === this.name;
  }

  listHeroesExcluding(h: Hero[]) {
    var r: Hero = this;

    var heroes = h.filter(function(x) {
      return !x.isEqual(r);
    });

    var heroNames = Array.from(heroes, x => x.name);

    return heroNames.splice(0, heroNames.length - 2).concat(heroNames.splice(-2).join(" & ")).join(", ");
  }

  valueOf() {
    return JSON.stringify({
      id: this.id,
      name: this.name
    });
  }
}

@Component({
  selector: 'my-app',
  template: `
    <div class="row" style="margin: 15px;">
      <div class="col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1">
        <h1>{{title}}</h1>
        <hr>
        <div class="jumbotron jumbotron-add-padding">
          <h1>Random hero of the day is {{ randomHero.name }}!</h1>
          <!--<p>The other heros are: <span *ngFor="let hero of heroes; let last = last; let first = first; let i = index">{{hero.valueOf()}}</span></p>-->
          <p>The rest of the roster: {{ randomHero.listHeroesExcluding(heroes) }}</p>
        </div>
      </div>
    </div>
    <div class="row" style="margin: 15px;">
      <div class="col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1">
        <h2>Hero Roster</h2>
        <table class="table table-condensed heroes">
          <thead>
          <tr>
            <th class="col-xs-1 col-sm-1 col-md-1">ID</th>
            <th>Name</th>
          </tr>
          </thead>
          <tbody>
          <tr *ngFor="let hero of heroes" [class.selected]="hero === selectedHero" (click)="onSelect(hero)">
            <td>{{hero.id}}</td>
            <td>{{hero.name}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row" style="margin: 15px;">
      <div class="col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1">
        <div *ngIf="selectedHero">
          <h2>Hero Editor</h2>
            <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">You've selected {{selectedHero.name}}.</h3>
            </div>
            <div class="panel-body">
              <form class="form-inline">
                <label>ID: </label> {{selectedHero.id}}
                <div class="form-group">
                  <label for="heroName">Name: </label>
                  <input type="text" class="form-control" id="heroName" [(ngModel)]="selectedHero.name" name="selectedHero.name" placeholder="name">
                </div>
              </form>
            </div>
          </div>
        <div>
      </div>
    </div>
  `,
})

export class AppComponent {
  name = 'Angular';
  title = 'Tour of Heroes';
  heroes: Hero[] = [
    new Hero('Windstorm'),
    new Hero('Bombasto'),
    new Hero('Mr. Nice'),
    new Hero('Narco'),
    new Hero('Celeritas'),
    new Hero('Magneta'),
    new Hero('RubberMan'),
    new Hero('Dynama'),
    new Hero('Dr. IQ'),
    new Hero('Magma'),
    new Hero('Tornado'),
  ];
  randomHero = this.heroes[H.rand(0, this.heroes.length)];
  selectedHero: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
