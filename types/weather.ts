export type WeatherData = {
  temp_c: number;
  wind_kph: number;
  humidity: number;
  condition: {
    text: string;
  };
};

export type ForecastDay = {
  date: string;
  day: {
    avgtemp_c: number;
    condition: {
      text: string;
    };
  };
};
