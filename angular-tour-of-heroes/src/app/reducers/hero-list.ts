import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Hero } from '../hero';
import { HeroActions } from '../actions/hero-actions';

export type HeroListState = Hero[];

const initialState: HeroListState = [];

export default function (state = initialState, action: Action): HeroListState {
  switch (action.type) {
    case HeroActions.LOAD_HEROES_SUCCESS: {
      return action.payload;
    }
    // The three dots notation tells JS to enumerate out the state array instead of returning as an array of arrays
    case HeroActions.ADD_HERO_SUCCESS: {
      return [...state, action.payload];
    }
    case HeroActions.SAVE_HERO_SUCCESS: {
      let index = state.map(hero => hero.id).indexOf(action.payload.id);
      return (index >= 0) ? [...state.slice(0,index), action.payload, ...state.slice(index+1)] : state;
    }
    case HeroActions.DELETE_HERO_SUCCESS: {
      return state.filter(function(x) {x.id != action.payload.id});
    }
    default: {
      return state;
    }
  }
}