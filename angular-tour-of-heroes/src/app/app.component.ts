import { Component } from '@angular/core';

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
          <li role="presentation"><a routerLink="/dashboard">Dashboard</a></li>
          <li role="presentation"><a routerLink="/heroes">Heroes Table</a></li>
          <li role="presentation"><a routerLink="/">Messages</a></li>
        </ul>
      </div>
    </div>
    <router-outlet></router-outlet>
  `,
})

export class AppComponent {
  title = 'Tour of Heroes';
}
