import { WeatherService } from './../../services/weather.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.scss']
})
export class SearchCityComponent implements OnInit {
  units:string[] = new Array("Celsius","Kelvin","Fahrenheit");
  faPlus = faPlus;
  alertMessage : boolean = false;
  searchCity = new FormGroup({
    searchField: new FormControl('', [
      Validators.required
    ]),
    unitsField: new FormControl('', [
      Validators.required
    ])
  });

  constructor(private weatherService : WeatherService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.alertMessage = !this.searchCity.valid;
    if(!this.searchCity.valid) {
      return;
    }
    this.weatherService.searchCity(this.searchCity.get('searchField')?.value,this.searchCity.get('unitsField')?.value);
  }
}