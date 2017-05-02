import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from './hero.service';
import { Hero } from './hero';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html'
})

export class HeroDetailComponent implements OnInit {

  hero: Hero;

  constructor(private heroService: HeroService, private activatedRoute: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .switchMap( (params: Params) => this.heroService.getHero(Number(params['id'])) )
      .subscribe( hero => this.hero = hero );
  }

  save(): void {
    this.heroService.update(this.hero);
  }

  goBack(): void {
    this.location.back();
  }

  // @Input() hero: Hero;
}
