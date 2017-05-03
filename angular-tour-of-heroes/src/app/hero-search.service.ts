import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';

// Observable operators
import 'rxjs/add/operator/map';

// Import classes
import { Hero } from './hero';

@Injectable()
export class HeroSearchService {

  private heroesUrl = 'app/heroes';

  constructor(private http: Http) {}

  search(term: string): Observable<Hero[]> {
    const url = `${this.heroesUrl}/?name=${term}`;
    return this.http.get(url).map(response => this.getHeroesFromJson(response.json().data));
  }

  getHeroFromJson(json: JSON): Hero {
    return new Hero(json['name'], json['id']);
  }

  getHeroesFromJson(data: JSON[]): Hero[] {
    return data.map(j => this.getHeroFromJson(j));
  }
}
