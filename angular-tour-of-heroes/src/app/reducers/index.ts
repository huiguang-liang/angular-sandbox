import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';
//import '@ngrx/core/add/operator/select';

import heroReducer, * as fromHero from './hero.reducer';
import heroesReducer, * as fromHeroes from './heroes.reducer';

export interface AppState {
  hero: fromHero.HeroState;
  heroes: fromHeroes.HeroListState;
}

export default compose( combineReducers ) ({
  hero: heroReducer,
  heroes: heroesReducer
});