// Import modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { Injector } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxChartsModule } from '@swimlane/ngx-charts';

// Import components
import { AppComponent } from './app.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroesComponent } from './heroes.component';
import { DashboardComponent } from './dashboard.component';
import { NewHeroComponent } from './new-hero.component';
import { HeroSearchComponent } from './hero-search.component';
import { VertBarChartComponent } from './charts/vert-bar-chart.component';
import { PieBasicChartComponent } from './charts/pie-basic-chart.component';
import { PieAdvancedChartComponent } from './charts/pie-advanced-chart.component';
import { PieGridChartComponent } from './charts/pie-grid-chart.component';
import { LineBasicChartComponent } from './charts/line-basic-chart.component';
import { HeatMapChartComponent } from './charts/heat-map-chart.component';
import { BubbleChartComponent } from './charts/bubble-chart.component';
import { MdEditorComponent } from './elements/mdeditor.component';

// 'Fake' HTTP Server
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

// Import services
import { HeroService } from './hero.service';
import { HelperService } from './helpers.service';

// Import actions
import { HeroActions } from './actions/hero.actions';

// Import reducers
import reducer from './reducers/index';

// Import effects
import { HeroEffects } from './effects/hero.effects';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    StoreModule.provideStore(reducer),
    EffectsModule.run(HeroEffects),
    BrowserAnimationsModule,
    NgxChartsModule,
  ],
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroesComponent,
    DashboardComponent,
    NewHeroComponent,
    HeroSearchComponent,
    VertBarChartComponent,
    PieBasicChartComponent,
    PieAdvancedChartComponent,
    PieGridChartComponent,
    LineBasicChartComponent,
    HeatMapChartComponent,
    BubbleChartComponent,
    MdEditorComponent
  ],
  providers:    [ HeroService, HelperService, HeroActions ],
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
