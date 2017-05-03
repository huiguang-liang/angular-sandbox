import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HeroService } from './hero.service';
import { Hero } from './hero';
import { Http } from '@angular/http';
import { AppModule } from './app.module';

// Class declarations
@Component({
  selector: 'new-hero',
  templateUrl: './new-hero.component.html',
})

export class NewHeroComponent implements OnInit {

  private heroService: HeroService;

  heroes: Hero[];

  complexForm: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.complexForm = formBuilder.group({
      'heroName': [null, Validators.compose([Validators.required, Validators.minLength(2)])],
    });
  }

  ngOnInit(): void {
    this.heroService = AppModule.injector.get(HeroService);
    this.heroService.getHeroesCached().then(heroes => {this.heroes = heroes});
  }

  addHero(name: string) {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name).then(hero => {
      //this.heroes.push(hero);
    });
  }

  submitForm(value: string){
    this.addHero(value);
  }
}
