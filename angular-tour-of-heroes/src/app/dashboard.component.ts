import { Component, OnInit } from '@angular/core';

// Import classes
import { Hero } from  './hero';

// Import services
import { HeroService } from './hero.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  topHeroes: Hero[];
  randomHero: Hero;

  constructor(private heroService: HeroService) { }

  getHeroes(): void {
    this.heroService.getHeroesCached().then(heroes => {
      this.topHeroes = heroes.slice(0,4);
    });
    this.heroService.getRandomHero().then(hero => {
      this.randomHero = hero;
    });
  }

  ngOnInit(): void {
    this.getHeroes();
  }
}
