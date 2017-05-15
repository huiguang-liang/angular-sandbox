import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

// Import classes
import { Hero } from './hero';

// Import services
import { HeroService } from './hero.service';
import { HelperService } from './helpers.service';

import { AppState } from './reducers/index';
import { HeroActions } from './actions/hero.actions';

import 'rxjs/add/operator/switchMap';

// Class declarations
@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
})

export class HeroesComponent implements OnInit, OnDestroy {

  name = 'Angular';
  heroes: Hero[];

  selectedHero: Hero;
  randomHero: Hero;

  heroesState: Observable<any>;
  heroState: Observable<any>;
  
  heroesSub: Subscription[] = [];

  constructor(private heroService: HeroService, private router: Router, private helperService: HelperService, private store: Store<AppState>, private heroActions: HeroActions) {
    this.heroesState = this.store.select('heroes');
    this.heroState = this.store.select('hero');
  }

  // getHeroes(): void {
  //   this.heroService.getHeroesCached().then(heroes => {
  //     this.heroes = heroes;
  //   });
  //   this.heroService.getRandomHero().then(hero => {
  //     this.randomHero = hero;
  //   });
  // }

  ngOnInit(): void {
    //this.getHeroes();
    this.heroesSub.push(this.heroesState.subscribe(heroes => {this.heroes = heroes;}));
    this.heroesSub.push(this.heroState.subscribe(hero => {this.randomHero = hero;}));
    this.store.dispatch( this.heroActions.getHeroes() );
    this.store.dispatch( this.heroActions.getRandomHero() );
  }

  ngOnDestroy(): void {
    this.heroesSub.forEach(x => x.unsubscribe());
    this.heroesSub = [];
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  onClickView(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  delete(hero: Hero): void {
    //this.heroService.delete(hero).then(hero => this.heroes = this.heroes.filter(x => x.id !== hero.id));
    this.store.dispatch( this.heroActions.deleteHero(hero) );
  }

  unselect(hero: Hero): void {
    this.selectedHero = this.selectedHero === hero ? undefined : this.selectedHero;
  }
}
