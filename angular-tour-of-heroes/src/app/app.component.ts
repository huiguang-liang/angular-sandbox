import { Component, OnInit } from '@angular/core';
import { Helper } from './helpers';
import { Hero } from './hero';
import { HeroService } from './hero.service';

// let H = new Helper;
// let hService = new HeroService;

// Class declarations
@Component({
  selector: 'my-app',
  template: `
    <div class="row" style="margin: 15px;">
      <div class="col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1">
        <h1>{{title}}</h1>
        <hr>
        <div class="jumbotron jumbotron-add-padding">
          <h1>Random hero of the day is {{ randomHero.name }}!</h1>
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
    <hero-detail [hero]="selectedHero"></hero-detail>
  `,
  providers: [HeroService, Helper],
})

export class AppComponent implements OnInit {

  name = 'Angular';
  title = 'Tour of Heroes';
  heroes: Hero[];
  selectedHero: Hero;
  randomHero: Hero;

  constructor(private heroService: HeroService, private helper: Helper) { }

  getHeroes(): void {
    this.heroes = this.heroService.getHeroes();
  }

  getRandomHero(): void {
    this.randomHero = this.heroes[this.helper.rand(0, this.heroes.length)];
  }

  ngOnInit(): void {
    this.getHeroes();
    this.getRandomHero();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
