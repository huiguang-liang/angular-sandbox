import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';
//import '@ngrx/core/add/operator/select';

import heroReducer, * as fromHero from './hero.reducer';
import heroesReducer, * as fromHeroes from './heroes.reducer';
import randomHeroReducer, * as fromRandomHero from './randomHero.reducer';

export interface AppState {
  hero: fromHero.HeroState;
  heroes: fromHeroes.HeroListState;
  randomHero: fromRandomHero.RandomHeroState;
}

export default compose( combineReducers ) ({
  hero: heroReducer,
  heroes: heroesReducer,
  randomHero: randomHeroReducer
});