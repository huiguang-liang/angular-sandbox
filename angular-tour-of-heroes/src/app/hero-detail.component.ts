import { Component, Input } from '@angular/core';
import { Hero } from './hero';

@Component({
  selector: 'hero-detail',
  template: `
  <div class="row" style="margin: 15px;">
    <div class="col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1">
      <div *ngIf="hero">
        <h2>Hero Editor</h2>
          <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">You've selected {{hero.name}}.</h3>
          </div>
          <div class="panel-body">
            <form class="form-inline">
              <label>ID: </label> {{hero.id}}
              <div class="form-group">
                <label for="heroName">Name: </label>
                <input type="text" class="form-control" id="heroName" [(ngModel)]="hero.name" name="hero.name" placeholder="name">
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
})

export class HeroDetailComponent {
  @Input() hero: Hero;
}
