import { HttpErrorResponse } from '@angular/common/http';
import { WeatherStats } from './../../models/weather-stats';
import { WeatherService } from './../../services/weather.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-selected-city',
  templateUrl: './selected-city.component.html',
  styleUrls: ['./selected-city.component.scss']
})
export class SelectedCityComponent implements OnInit, OnDestroy {
  public selectedCitySub : Subscription = new Subscription();
  public errorMessageSub : Subscription = new Subscription();
  showDetails: boolean = false;
  errorMessage: string = '';
  public selectedCity: WeatherStats = {
    id: 0,
    name: 'N/A',
    temp: 0,
    country: 'N/A',
    unit: "N/A"
  };
  constructor(private weatherService : WeatherService) { }

  ngOnInit(): void {
    this.showDetails = false;
    this.selectedCitySub = this.weatherService.getSelectedCityUpdateListener().subscribe((selectedCity: WeatherStats | string)  => {
      const selected = <WeatherStats>selectedCity;
      this.selectedCity = selected;
      this.showDetails = true;
      this.errorMessage = '';
    });
    this.errorMessageSub = this.weatherService.getErrorMessageUpdateListener().subscribe((errorObj) => {
      if(errorObj.operation === 'getCityDetails') {
        this.showDetails = false;
        this.errorMessage = errorObj.message;
      }
    });
  }
  getWeatherImage() {
    return `http://openweathermap.org/img/wn/${this.selectedCity.icon}.png`;
  }

  ngOnDestroy(): void {
    this.selectedCitySub.unsubscribe();
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
