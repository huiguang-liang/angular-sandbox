import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';
import '@ngrx/core/add/operator/select';

import heroReducer, * as fromHero from './hero';

export interface AppState {
  hero: fromHero.HeroState;
}

export default compose( combineReducers ) ({
  hero: heroReducer
});