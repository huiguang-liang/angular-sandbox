import { Action } from '@ngrx/store';

import { Hero } from '../hero';
import { HeroActions } from '../actions/hero.actions';

export type RandomHeroState = Hero;

const initialState: RandomHeroState = new Hero('', 0);

export default function (state = initialState, action: Action): RandomHeroState {
  switch (action.type) {
    case HeroActions.GET_RANDOM_HERO_SUCCESS: {
      return action.payload;
    }
    case HeroActions.CHANGE_RANDOM_HERO_SUCCESS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}