import { Injectable } from '@angular/core';

// Import classes
import { Hero } from './hero';
import { HEROES } from './init-heroes';

// Import services
import { HelperService } from './helpers.service';

@Injectable()
export class HeroService {

  cachedPromise: Promise<Hero[]>;
  cachedRandomHero: Promise<Hero>;

  constructor(private helperService: HelperService) { }

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
    this.cachedRandomHero = this.cachedRandomHero || this.getHeroesCached().then(heroes => Promise.resolve(heroes[this.helperService.rand(0, heroes.length)]));
    return this.cachedRandomHero;
  }
}
