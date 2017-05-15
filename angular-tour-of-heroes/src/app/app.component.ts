import { Component } from '@angular/core';
import { AppState } from './reducers/index';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Component({
  selector: 'my-app',
  template: `
    <div class="row" style="margin: 15px;">
      <div class="col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1">
      <h1>{{title}}</h1>
      <hr>
      </div>
    </div>
    <div class="row" style="margin: 15px;">
      <div class="col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1">
        <ul class="nav nav-tabs" role="tablist">
          <li role="presentation" routerLinkActive="active"><a routerLink="/dashboard">Dashboard</a></li>
          <li role="presentation" routerLinkActive="active"><a routerLink="/heroes">Heroes Roster</a></li>
        </ul>
      </div>
    </div>
    <router-outlet></router-outlet>
  `,
})

export class AppComponent {
  title = 'Tour of Heroes';
  heroesState: Observable<any>;

  constructor(private store: Store<AppState>) {
    this.heroesState = this.store.select('heroes');
    this.heroesState.subscribe(heroes => console.log('Heroes: ' + heroes.map(hero => hero.valueOf())));
  }
}
