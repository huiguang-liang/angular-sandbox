import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';

// Class declarations
@Component({
  selector: 'my-heroes',
  template: `
    <div class="row" style="margin: 15px;">
      <div class="col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1">
        <div class="jumbotron jumbotron-add-padding" *ngIf="randomHero; else loadingBlock">
          <h1>Random hero of the day is {{ randomHero.name }}!</h1>
          <p>The rest of the roster: {{ randomHero.listHeroesExcluding(heroes) }}</p>
        </div>
        <ng-template #loadingBlock>
          <div class="jumbotron jumbotron-add-padding">
            <h1>Loading Hero Roster ...</h1>
            <p>Please be patient! We will display the roster of heroes as soon as it is loaded</p>
          </div>
        </ng-template>
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
    <!--<hero-detail [hero]="selectedHero"></hero-detail>-->
  `,
})

export class HeroesComponent implements OnInit {

  name = 'Angular';
  heroes: Hero[];
  selectedHero: Hero;
  randomHero: Hero;

  constructor(private heroService: HeroService) { }

  getHeroes(): void {
    this.heroService.getHeroesCached().then(heroes => {
      this.heroes = heroes;
    });
    this.heroService.getRandomHero().then(hero => {
      this.randomHero = hero;
    });
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
