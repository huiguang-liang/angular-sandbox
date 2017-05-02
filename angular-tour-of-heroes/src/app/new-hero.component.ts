import { Component, ReflectiveInjector, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HeroService } from './hero.service';
import { HelperService } from './helpers.service';
import { Http } from '@angular/http';

// Class declarations
@Component({
  selector: 'new-hero',
  templateUrl: './new-hero.component.html',
})

export class NewHeroComponent implements OnInit {

  private helperService: HelperService;
  private heroService: HeroService;
  private http: Http;
  complexForm: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.complexForm = formBuilder.group({
      'heroName': [null, Validators.compose([Validators.required, Validators.minLength(2)])],
    });
  }

  ngOnInit(): void {
    
  }

  addHero(name: string) {
    name = name.trim();
    if (!name) { return; }
    //this.heroService.create(name).then(hero => {});
  }

  submitForm(value: string){
    console.log(value);
  }
}
