import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

// Import classes
import { Hero } from './hero';
//import { HEROES } from './init-heroes';

// Import services
import { HelperService } from './helpers.service';

@Injectable()
export class HeroService {

  cachedPromise: Promise<Hero[]>;
  cachedRandomHero: Promise<Hero>;

  private heroesUrl = 'api/heroes';

  constructor(private helperService: HelperService, private http: Http) { }

  getHero(id: number): Promise<Hero> {
    //return this.getHeroesCached().then( heroes => heroes.find( hero => hero.id === id ) );
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url).toPromise().then(response => this.getHeroFromJson(response.json().data)).catch(this.handleError);
  }

  getHeroes(): Promise<Hero[]> {
    //return Promise.resolve(HEROES);
    return this.http.get(this.heroesUrl).toPromise().then(response => this.getHeroesFromJson(response.json().data)).catch(this.handleError);
  }

  getHeroesFromJson(data: JSON[]): Hero[] {
    return data.map(j => this.getHeroFromJson(j));
  }

  getHeroFromJson(json: JSON): Hero {
    return new Hero(json['name'], json['id']);
  }

  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise(resolve => {
      setTimeout( () => resolve(this.getHeroes()), 1000 );
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

  /* Generic Error Handler */
  private handleError(error: any): Promise<any> {
    console.error('An error occurred! ', error);
    return Promise.reject(error);
  }
}
