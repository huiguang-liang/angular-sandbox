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
}
