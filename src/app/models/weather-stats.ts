export interface WeatherStats {
    id: number;
    name: string;
    temp: number;
    country: string;
    description?: string;
    icon?: string;
    unit?: string;
}