import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from './reducers/index';
import { Subscription } from 'rxjs/Subscription';
import { HeroActions } from './actions/hero.actions';
import { HeroService } from './hero.service';
import { Hero } from './hero';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/from';

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html'
})

export class HeroDetailComponent implements OnInit, OnDestroy {

  hero: Hero;

  heroSub: Subscription;
  heroState: Observable<any>;

  constructor(private heroService: HeroService, private activatedRoute: ActivatedRoute, private location: Location, private store: Store<AppState>, private heroActions: HeroActions) {
    this.heroState = this.store.select('hero');
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .switchMap( (params: Params) => Observable.of(Number(params['id'])) )
      .subscribe( id => this.store.dispatch(this.heroActions.getHero(id)) );
    this.heroSub = this.heroState.subscribe(hero => this.hero = hero);
  }

  ngOnDestroy(): void {
    this.heroSub.unsubscribe();
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.store.dispatch( this.heroActions.updateHero(this.hero) );
    this.goBack();
  }

  delete(): void {
    this.store.dispatch( this.heroActions.deleteHero(this.hero) );
    this.store.dispatch( this.heroActions.getRandomHero() );
    this.goBack();
  }
}
