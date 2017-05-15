import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from './reducers/index';
import { Observable } from 'rxjs/Observable';
import { HeroActions } from './actions/hero.actions';

// Import classes
import { Hero } from  './hero';

// Import services
import { HeroService } from './hero.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  topHeroes: Hero[];
  randomHero: Hero;
  heroesState: Observable<any>;

  constructor(private heroService: HeroService, private store: Store<AppState>, private heroActions: HeroActions) {
    this.heroesState = this.store.select('heroes');
  }

  getHeroes(): void {
    this.heroService.getHeroesCached().then(heroes => {
      this.topHeroes = heroes.slice(0,4);
    });
    this.heroService.getRandomHero().then(hero => {
      this.randomHero = hero;
    });
  }

  ngOnInit(): void {
    this.getHeroes();
    this.store.dispatch( this.heroActions.getHeroes() );
  }
}
