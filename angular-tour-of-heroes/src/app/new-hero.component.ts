import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HeroService } from './hero.service';
import { Hero } from './hero';
import { Http } from '@angular/http';
import { AppModule } from './app.module';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from './reducers/index';
import { HeroActions } from './actions/hero.actions';

// Class declarations
@Component({
  selector: 'new-hero',
  templateUrl: './new-hero.component.html',
})

export class NewHeroComponent implements OnInit {

  private heroService: HeroService;

  heroes: Hero[];
  heroesState: Observable<any>;

  complexForm: FormGroup;

  constructor(formBuilder: FormBuilder, private store: Store<AppState>, private heroActions: HeroActions) {
    this.complexForm = formBuilder.group({
      'heroName': [null, Validators.compose([Validators.required, Validators.minLength(2)])],
    });
    this.heroesState = this.store.select('heroes');
  }

  ngOnInit(): void {
    this.heroService = AppModule.injector.get(HeroService);
    this.heroService.getHeroesCached().then(heroes => {this.heroes = heroes});
  }

  addHero(name: string) {
    name = name.trim();
    if (!name) { return; }
    // this.heroService.create(name).then(hero => {
    //   //this.heroes.push(hero);
    // });
    this.store.dispatch( this.heroActions.createHero(name) );
  }

  submitForm(value: string){
    this.addHero(value);
  }
}
