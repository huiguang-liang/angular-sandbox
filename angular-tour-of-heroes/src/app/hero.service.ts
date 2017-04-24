import { Injectable } from '@angular/core';

import { Hero } from './hero';
import { HEROES } from './init-heroes';
import { Helper } from './helpers';

@Injectable()
export class HeroService {

  cachedPromise: Promise<Hero[]>;
  cachedRandomHero: Promise<Hero>;

  constructor(private helper: Helper) { }

  getHeroes(): Promise<Hero[]> {
    return Promise.resolve(HEROES);
  }

  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise(resolve => {
      setTimeout( () => resolve(this.getHeroes()), 2000 );
    });
  }

  getHeroesCached(): Promise<Hero[]> {
    this.cachedPromise = this.cachedPromise || this.getHeroesSlowly();
    return this.cachedPromise;
  }

  getRandomHero(): Promise<Hero> {
    this.cachedRandomHero = this.cachedRandomHero || this.getHeroesCached().then(heroes => Promise.resolve(heroes[this.helper.rand(0, heroes.length)]));
    return this.cachedRandomHero;
  }
}
