import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HeroService } from './hero.service';
import { AppModule } from './app.module';
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

  complexForm: FormGroup;

  constructor(formBuilder: FormBuilder, private store: Store<AppState>, private heroActions: HeroActions) {
    this.complexForm = formBuilder.group({
      'heroName': [null, Validators.compose([Validators.required, Validators.minLength(2)])],
    });
  }

  ngOnInit(): void {
    // Example of how to get an injected service without injecting it in the constructor
    this.heroService = AppModule.injector.get(HeroService);
  }

  addHero(name: string) {
    name = name.trim();
    if (!name) { return; }
    this.store.dispatch( this.heroActions.createHero(name) );
  }

  submitForm(value: string){
    this.addHero(value);
  }
}
