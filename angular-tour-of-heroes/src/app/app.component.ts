import { Component } from '@angular/core';
import { Helper } from './app.helpers';

let H = new Helper;

// Class declarations
export class Id {
  private id: number = 0;
  constructor () {

  }
  public getNextId() {
    return this.id++;
  }
}

let I = new Id;

export class Hero {

  readonly id: number;
  public name: string;

  constructor (n: string) {
    this.id = I.getNextId();
    this.name = n;
  }

  isEqual(h: Hero) {
    return h.id === this.id && h.name === this.name;
  }

  public static listHeroesExcluding(h: Hero[], r: Hero) {
  // listHeroesExcluding(h: Hero[], excludeH: Hero[]) {
    //var heroes = Array.from(h, x => x.valueOf());
    // var excludeHeroes = Array.from(h, x => x.valueOf());
    //
    // return heroes.concat(excludeHeroes).toString();
    // return heroes;
    var heroes = h.filter(function(x) {
      return !x.isEqual(r);
    });
    return Array.from(heroes, x => x.valueOf());
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
          <p>The other heros are: <span *ngFor="let hero of heroes; let last = last; let first = first; let i = index">{{hero.valueOf()}}</span></p>
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
    // new Hero('Narco'),
    // new Hero('Celeritas'),
    // new Hero('Magneta'),
    // new Hero('RubberMan'),
    // new Hero('Dynama'),
    // new Hero('Dr. IQ'),
    // new Hero('Magma'),
    // new Hero('Tornado'),
  ];
  // heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];
  randomHero = this.heroes[H.rand(0, this.heroes.length)];
}
