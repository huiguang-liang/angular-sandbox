import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

// Observable operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/fromPromise';

import { AppState } from '../reducers/index';
import { HeroActions } from '../actions/hero.actions';
import { HeroService } from '../hero.service';


@Injectable()
export class HeroEffects {
  constructor (private update$: Actions, private heroActions: HeroActions, private heroService: HeroService) {}

  @Effect() getHeroes$ = this.update$
    .ofType(HeroActions.GET_HEROES)
    .switchMap(() => Observable.fromPromise(this.heroService.getHeroes()))
    .map(heroes => this.heroActions.getHeroesSuccess(heroes));

  @Effect() getHero$ = this.update$
    .ofType(HeroActions.GET_HERO)
    .map(action => action.payload)
    .switchMap(id => Observable.fromPromise(this.heroService.getHero(id)))
    .map(hero => this.heroActions.getHeroSuccess(hero));

  @Effect() getRandomHero$ = this.update$
    .ofType(HeroActions.GET_RANDOM_HERO)
    .switchMap(() => Observable.fromPromise(this.heroService.getRandomHero()))
    .map(hero => this.heroActions.getRandomHeroSuccess(hero));

  @Effect() updateHero$ = this.update$
    .ofType(HeroActions.UPDATE_HERO)
    .map(action => action.payload)
    .switchMap(hero => Observable.fromPromise(this.heroService.update(hero)))
    .map(hero => this.heroActions.updateHeroSuccess(hero));

  @Effect() createHero$ = this.update$
    .ofType(HeroActions.CREATE_HERO)
    .map(action => action.payload)
    .switchMap(name => Observable.fromPromise(this.heroService.create(name)))
    .map(hero => this.heroActions.createHeroSuccess(hero));

  @Effect() deleteHero$ = this.update$
    .ofType(HeroActions.DELETE_HERO)
    .map(action => action.payload)
    .switchMap(hero => Observable.fromPromise(this.heroService.delete(hero)))
    .map(hero => this.heroActions.deleteHeroSuccess(hero));
}