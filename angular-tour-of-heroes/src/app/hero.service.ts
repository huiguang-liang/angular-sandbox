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
  private randomHeroId: number = -1;

  private heroesUrl = 'api/heroes';
  private headers = new Headers({'Content-Type': 'application/json'});

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
      setTimeout( () => resolve(this.getHeroes()), 0 );
    });
  }

  getHeroesCached(): Promise<Hero[]> {
    //this.cachedPromise = this.cachedPromise || this.getHeroesSlowly();
    this.cachedPromise = this.getHeroesSlowly();
    this.cachedPromise.then(heroes => this.getAndSetRandomHeroId(heroes)).catch(this.handleError);
    return this.cachedPromise;
  }

  getAndSetRandomHeroId(heroes: Hero[]): void {
    let idArray = heroes.map(h => h.id);
    this.randomHeroId = idArray.indexOf(this.randomHeroId) === -1 ? Number(idArray[this.helperService.rand(0, idArray.length)]) : this.randomHeroId;
  }

  getRandomHero(): Promise<Hero> {
    //this.cachedRandomHero = this.cachedRandomHero || this.getHeroesCached().then(heroes => Promise.resolve(heroes[this.helperService.rand(0, heroes.length)]));
    this.cachedRandomHero = this.getHeroesCached().then(heroes => Promise.resolve(heroes[heroes.map(h => h.id).indexOf(this.randomHeroId)]));
    return this.cachedRandomHero;
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.put(url, JSON.stringify(hero), {headers: this.headers}).toPromise().then(() => hero).catch(this.handleError);
  }

  create(name: string): Promise<Hero> {
    return this.http.post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers}).toPromise().then(res => this.getHeroFromJson(res.json().data)).catch(this.handleError);
  }

  delete(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.delete(url, {headers: this.headers}).toPromise().then(() => hero).catch(this.handleError);
  }

  /* Generic Error Handler */
  private handleError(error: any): Promise<any> {
    console.error('An error occurred! ', error);
    return Promise.reject(error);
  }
}
