import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Import classes
import { Hero } from './hero';

//Import services
import { HeroService } from './hero.service';
import { HelperService } from './helpers.service';

// Class declarations
@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
})

export class HeroesComponent implements OnInit {

  name = 'Angular';
  heroes: Hero[];
  selectedHero: Hero;
  randomHero: Hero;

  constructor(private heroService: HeroService, private router: Router, private helperService: HelperService) { }

  getHeroes(): void {
    this.heroService.getHeroesCached().then(heroes => {
      this.heroes = heroes;
    });
    this.heroService.getRandomHero().then(hero => {
      this.randomHero = hero;
    });
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  onClickView(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  addHero(heroName: String): void {
    console.log('Add ' + heroName);
  }
}
