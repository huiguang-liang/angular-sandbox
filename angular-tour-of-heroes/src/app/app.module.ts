// Import modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { Injector } from '@angular/core';

// Import components
import { AppComponent } from './app.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroesComponent } from './heroes.component';
import { DashboardComponent } from './dashboard.component';
import { NewHeroComponent } from './new-hero.component';
import { HeroSearchComponent } from './hero-search.component';

// 'Fake' HTTP Server
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

// Import services
import { HeroService } from './hero.service';
import { HelperService } from './helpers.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
  ],
  declarations: [ AppComponent, HeroDetailComponent, HeroesComponent, DashboardComponent, NewHeroComponent, HeroSearchComponent ],
  providers:    [ HeroService, HelperService ],
  bootstrap:    [ AppComponent ]
})

export class AppModule {

    /**
    * Allow the global calling of AppModule.injector.get(MyService)
    */
    static injector: Injector;
    constructor(injector: Injector) {
      AppModule.injector = injector;
    }
}
