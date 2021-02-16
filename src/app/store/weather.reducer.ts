import { WeatherStats } from './../models/weather-stats';
import { CityItem } from './../models/city-item';
import { Action, createReducer, on } from '@ngrx/store';
import { updateCitiesList, selectCity } from './weather.actions';

export interface WeatherState {
    citiesWeather: CityItem[];
    selectedCity: WeatherStats;
  }

export const initialState: WeatherState = {
    citiesWeather: [],
    selectedCity:  {
        id: 0,
        name: 'N/A',
        temp: 0,
        country: 'N/A',
        unit: "N/A"
    }
};
 
const _weatherReducer = createReducer(
  initialState,
  on(updateCitiesList, (state,{ cities }) => ({...state,citiesWeather: cities})),
  on(selectCity, (state,{weatherStats}) => ({...state,selectedCity: weatherStats}))
);
 
export function weatherReducer(state: WeatherState, action: Action) {
  return _weatherReducer(state, action);
}