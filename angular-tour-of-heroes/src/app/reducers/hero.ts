import { Action } from '@ngrx/store';

import { Hero } from '../hero';
import { HeroActions } from '../actions/hero-actions';

export type HeroState = Hero;

const initialState: HeroState = new Hero('', 0);

export default function (state = initialState, action: Action): HeroState {
  switch (action.type) {
    case HeroActions.GET_HERO_SUCCESS: {
      return action.payload;
    }
    case HeroActions.GET_RANDOM_HERO_SUCCESS: {
      return action.payload;
    }
    case HeroActions.CHANGE_RANDOM_HERO_SUCCESS: {
      return action.payload;
    }
    case HeroActions.RESET_BLANK_HERO: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}