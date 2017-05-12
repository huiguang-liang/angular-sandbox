import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Hero } from '../hero';

@Injectable()
export class HeroActions {

  static LOAD_HEROES = 'LOAD_HEROES';
  loadHeroes(): Action {
    return {
      type: HeroActions.LOAD_HEROES
    };
  }

  static LOAD_HEROES_SUCCESS = 'LOAD_HEROES_SUCCESS';
  loadHeroesSuccess(heroes: Hero[]): Action {
    return {
      type: HeroActions.LOAD_HEROES_SUCCESS,
      payload: heroes
    };
  }

  static RESET_BLANK_HERO = 'RESET_BLANK_HERO';
  resetBlankHero(): Action {
    return {
      type: HeroActions.RESET_BLANK_HERO
    };
  }

  static GET_HERO = 'GET_HERO';
  getHero(id: number): Action {
    return {
      type: HeroActions.GET_HERO,
      payload: id
    };
  }

  static GET_HERO_SUCCESS = 'GET_HERO_SUCCESS';
  getHeroSuccess(hero: Hero): Action {
    return {
      type: HeroActions.GET_HERO_SUCCESS,
      payload: hero
    };
  }

  static GET_RANDOM_HERO = 'GET_RANDOM_HERO';
  getRandomHero(): Action {
    return {
      type: HeroActions.GET_RANDOM_HERO
    };
  }

  static GET_RANDOM_HERO_SUCCESS = 'GET_RANDOM_HERO_SUCCESS';
  getRandomHeroSuccess(hero: Hero): Action {
    return {
      type: HeroActions.GET_RANDOM_HERO_SUCCESS,
      payload: hero
    };
  }

  static CHANGE_RANDOM_HERO = 'CHANGE_RANDOM_HERO';
  changeRandomHero(): Action {
    return {
      type: HeroActions.CHANGE_RANDOM_HERO
    };
  }

  static CHANGE_RANDOM_HERO_SUCCESS = 'CHANGE_RANDOM_HERO_SUCCESS';
  changeRandomHeroSuccess(hero: Hero): Action {
    return {
      type: HeroActions.CHANGE_RANDOM_HERO_SUCCESS,
      payload: hero
    };
  }

  static SAVE_HERO = 'SAVE_HERO';
  saveHero(hero: Hero): Action {
    return {
      type: HeroActions.SAVE_HERO,
      payload: hero
    };
  }

  static SAVE_HERO_SUCCESS = 'SAVE_HERO_SUCCESS';
  saveHeroSuccess(hero: Hero): Action {
    return {
      type: HeroActions.SAVE_HERO_SUCCESS,
      payload: hero
    };
  }

  static ADD_HERO = 'ADD_HERO';
  addHero(hero: Hero): Action {
    return {
      type: HeroActions.ADD_HERO,
      payload: hero
    };
  }

  static ADD_HERO_SUCCESS = 'ADD_HERO_SUCCESS';
  addHeroSuccess(hero: Hero): Action {
    return {
      type: HeroActions.ADD_HERO_SUCCESS,
      payload: hero
    };
  }

  static DELETE_HERO = 'DELETE_HERO';
  deleteHero(hero: Hero): Action {
    return {
      type: HeroActions.DELETE_HERO,
      payload: hero
    };
  }

  static DELETE_HERO_SUCCESS = 'DELETE_HERO_SUCCESS';
  deleteHeroSuccess(hero: Hero): Action {
    return {
      type: HeroActions.DELETE_HERO_SUCCESS,
      payload: hero
    };
  }
}