import { createFeatureSelector, createSelector } from "@ngrx/store";
import { WeatherState } from "./weather.reducer";

export const getSelectedCity = createFeatureSelector<WeatherState>('selectedCity');
export const getCitiesWeather = createFeatureSelector<WeatherState>('citiesWeather');

export const selectCities = (state: WeatherState) => state.citiesWeather;
export const selectSelectedCity = (state: WeatherState) => state.selectedCity;

export const getCity = createSelector(
    getSelectedCity,
    selectSelectedCity
);

export const getCitiesList = createSelector(
    getCitiesWeather,
    selectCities
);