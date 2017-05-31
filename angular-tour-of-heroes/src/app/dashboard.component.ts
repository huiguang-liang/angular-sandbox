import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from './reducers/index';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { HeroActions } from './actions/hero.actions';

// Import classes
import { Hero } from  './hero';

// Import services
import { HeroService } from './hero.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit, OnDestroy {

  topHeroes: Hero[];
  heroesState: Observable<any>;

  heroesSub: Subscription;

  constructor(private heroService: HeroService, private store: Store<AppState>, private heroActions: HeroActions) {
    this.heroesState = this.store.select('heroes');
  }

  ngOnInit(): void {
    this.heroesSub = this.heroesState.subscribe(heroes => this.topHeroes = heroes.slice(0,4));
    this.store.dispatch( this.heroActions.getHeroes() );
  }

  ngOnDestroy(): void {
    this.heroesSub.unsubscribe();
  }
}
