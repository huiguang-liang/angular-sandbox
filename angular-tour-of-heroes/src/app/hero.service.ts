import { Injectable } from '@angular/core';

import { Hero } from './hero';
import { HEROES } from './init-heroes';

@Injectable()
export class HeroService {
  getHeroes(): Hero[] {
    return HEROES;
  }
}
