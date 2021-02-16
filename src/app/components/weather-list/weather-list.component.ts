import { CityItem } from './../../models/city-item';
import { WeatherService } from './../../services/weather.service';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.scss']
})
export class WeatherListComponent implements OnInit, OnDestroy {

  constructor(private weatherService : WeatherService) { }
  citiesListSub : Subscription = new Subscription();
  errorMessage : string = '';
  citiesList : CityItem[] = [];
  ngOnInit(): void {
    this.citiesListSub = this.weatherService.getCitiesArrayUpdateListener().subscribe((updatesCities: CityItem[])  => {
      console.log(updatesCities);
      this.citiesList = updatesCities;
      this.errorMessage = '';
    });
  }

  ngOnDestroy(): void {
    this.citiesListSub.unsubscribe();
  }

  
  getUnitSign(unit: string | undefined) {
    switch (unit) {
      case 'Kelvin': {
          return 'K';
      }
      case 'Celsius': {
          return 'C';
      }
      case 'Fahrenheit': {
        return 'F';
      }
      default: {
          return 'K';
      }
  }
  }
}
