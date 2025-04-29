import axios from "axios";
import { WeatherData, ForecastDay } from "@/types/weather";

export const WEATHER_CONFIG = {
  BASE_URL: "https://api.weatherapi.com",
  API_KEY: "6ca3797837f94861847213336250404",
};

export const fetchWeather = async (city: string) => {
  try {
    const response = await axios.get(
      `${WEATHER_CONFIG.BASE_URL}/v1/forecast.json?key=${WEATHER_CONFIG.API_KEY}&q=${city}&days=7&aqi=no&alerts=no&lang=pl`
    );

    const weather = response.data.current as WeatherData;
    const forecast = response.data.forecast.forecastday as ForecastDay[];

    return { weather, forecast };
  } catch (error) {
    console.warn("Błąd podczas pobierania pogody:", error);
  }
};
