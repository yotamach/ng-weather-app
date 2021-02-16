import { CityItem } from './../models/city-item';
import { WeatherStats } from './../models/weather-stats';

import { createAction, props } from "@ngrx/store";

export const updateCitiesList = createAction('UPDATE_CITIES_LIST',props<{ cities: CityItem[] }>());
export const selectCity = createAction('SELECT_CITY',props<{ weatherStats: WeatherStats }>());