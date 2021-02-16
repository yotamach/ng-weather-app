import { CityItem } from './../models/city-item';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, ɵConsole } from '@angular/core';
import { WeatherStats } from '../models/weather-stats';
import { catchError, map } from "rxjs/operators";
import { Subject, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCity, updateCitiesList } from '../store/weather.actions';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {
  private apiKey : string = '0d7303c17ee3d3482cd82a2ad273a90d';
  private citiesArrayUpdated = new Subject<CityItem[]>();
  private selectedCityUpdated = new Subject<WeatherStats>();
  private errorMessageUpdated = new Subject<{operation: string, message: string}>();
  private citiesArray: CityItem[] = [];
  private selectedCity: WeatherStats = {id: 0,name: '',temp: 0, country: ''}
  constructor(private http :HttpClient,private store: Store) { }
  
  searchCity(text: string,unit: string) {
    
    this.http.get<any>(`http://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${this.apiKey}`).pipe(
      map(weatherStats => { 
        
        return {
          id: weatherStats.id,
          name: weatherStats.name,
          temp: Math.floor(this.unitsConvertor(weatherStats.main.temp,unit)),
          unit,
          country: weatherStats.sys.country,
          description: weatherStats.weather[0].description,
          icon: weatherStats.weather[0].icon
        }
      },
      catchError(err => err)
      ),
    ).subscribe(
      (weatherStats: WeatherStats) => {
        const stats = (<WeatherStats>weatherStats);
        this.selectedCity = stats;
        this.store.dispatch(selectCity({ weatherStats: this.selectedCity}));
        this.selectedCityUpdated.next(this.selectedCity);
        let exitingIrem = false;
        this.citiesArray = this.citiesArray.map((item : CityItem) => {
          if(item.id === weatherStats.id) {
            exitingIrem = true;
            return <CityItem>weatherStats;
          }
          return item;
        });
        if(!exitingIrem)
          this.citiesArray.push(<CityItem>weatherStats);
        this.citiesArray.push();
        this.store.dispatch(updateCitiesList({ cities: this.citiesArray}));
        this.citiesArrayUpdated.next(this.citiesArray);

    },
    (err : HttpErrorResponse) => {
      this.errorMessageUpdated.next({operation: 'getCityDetails',message: this.getServerErrorMessage(err)});
    });
  }

  addSelectedCityToList() {
    this.citiesArray.push(<CityItem>this.selectedCity);
    this.citiesArrayUpdated.next(this.citiesArray);
  }

  getCitiesArrayUpdateListener() {
    return this.citiesArrayUpdated.asObservable();
  }

  getSelectedCityUpdateListener() {
    return this.selectedCityUpdated.asObservable();
  }

  getErrorMessageUpdateListener() {
    return this.errorMessageUpdated.asObservable();
  }

  private getServerErrorMessage(error: HttpErrorResponse) {
    const {cod,message} = error.error;
    switch (error.status) {
        case 404: {
            return `${cod} Not Found: ${message}`;
        }
        case 403: {
            return `${cod} Access Denied: ${message}`;
        }
        case 500: {
            return `${cod} Internal Server Error: ${message}`;
        }
        default: {
            return `${cod} Unknown Server Error: ${message}`;
        }
    }
}

  unitsConvertor(temp: number,unit: string) {
    switch (unit) {
      case 'Kelvin': {
          return temp;
      }
      case 'Celsius': {
          return temp - 273.15;
      }
      case 'Fahrenheit': {
          return temp * (9/5) - 459.67;
      }
      default: {
          return temp;
      }
  }
  }

}



