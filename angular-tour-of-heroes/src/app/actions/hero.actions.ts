import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Hero } from '../hero';

@Injectable()
export class HeroActions {

  static GET_HEROES = 'GET_HEROES';
  getHeroes(): Action {
    return {
      type: HeroActions.GET_HEROES
    };
  }

  static GET_HEROES_SUCCESS = 'GET_HEROES_SUCCESS';
  getHeroesSuccess(heroes: Hero[]): Action {
    return {
      type: HeroActions.GET_HEROES_SUCCESS,
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

  static UPDATE_HERO = 'UPDATE_HERO';
  updateHero(hero: Hero): Action {
    return {
      type: HeroActions.UPDATE_HERO,
      payload: hero
    };
  }

  static UPDATE_HERO_SUCCESS = 'UPDATE_HERO_SUCCESS';
  updateHeroSuccess(hero: Hero): Action {
    return {
      type: HeroActions.UPDATE_HERO_SUCCESS,
      payload: hero
    };
  }

  static CREATE_HERO = 'CREATE_HERO';
  createHero(name: string): Action {
    return {
      type: HeroActions.CREATE_HERO,
      payload: name
    };
  }

  static CREATE_HERO_SUCCESS = 'CREATE_HERO_SUCCESS';
  createHeroSuccess(hero: Hero): Action {
    return {
      type: HeroActions.CREATE_HERO_SUCCESS,
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