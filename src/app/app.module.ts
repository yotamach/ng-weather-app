import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchCityComponent } from './components/search-city/search-city.component';
import { HttpClientModule } from '@angular/common/http';
import { SelectedCityComponent } from './components/selected-city/selected-city.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WeatherListComponent } from './components/weather-list/weather-list.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'; // Angular CLI environment
import { StoreModule } from '@ngrx/store';
import { weatherReducer } from './store/weather.reducer';

@NgModule({
  declarations: [
    AppComponent,
    SearchCityComponent,
    SelectedCityComponent,
    HeaderComponent,
    FooterComponent,
    WeatherListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    FontAwesomeModule,
    StoreModule.forRoot(weatherReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
