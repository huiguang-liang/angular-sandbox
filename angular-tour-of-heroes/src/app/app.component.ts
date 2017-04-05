import { Component } from '@angular/core';
import { Helper } from './app.helpers';

let H = new Helper;

@Component({
  selector: 'my-app',
  template: `
    <div class="row" style="margin: 15px;">
      <div class="col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1">
        <h1>{{title}}</h1>
        <hr>
        <h2>My favorite hero is {{ myHero }}!</h2>
        <div class="panel panel-default">
          <div class="panel-body">
            List of heros: <span *ngFor="let hero of heroes; let last = last">{{ hero }}{{last ? '' : ', '}}</span>
          </div>
        </div>
      </div>
    </div>
  `,
})

export class AppComponent {
  name = 'Angular';
  title = 'Tour of Heroes';
  heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];
  myHero = this.heroes[H.rand(0, this.heroes.length)];
}
