import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_KEY = "6ca3797837f94861847213336250404";

type WeatherData = {
  temp_c: number;
  wind_kph: number;
  humidity: number;
  condition: {
    text: string;
  };
};

type ForecastDay = {
  date: string;
  day: {
    avgtemp_c: number;
    condition: {
      text: string;
    };
  };
};

export default function WeatherApp() {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const fetchWeather = async (cityName: string) => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=7&aqi=no&alerts=no&lang=pl`
      );

      setWeather(response.data.current as WeatherData);
      setForecast(response.data.forecast.forecastday as ForecastDay[]);
      saveSearch(cityName);
    } catch (error) {
      console.warn("Błąd podczas pobierania pogody:", error);
    }
  };

  const saveSearch = async (cityName: string) => {
    try {
      const history = JSON.parse(
        (await AsyncStorage.getItem("weatherHistory")) || "[]"
      );
      const updated = [
        cityName,
        ...history.filter((c: string) => c !== cityName),
      ].slice(0, 5);
      await AsyncStorage.setItem("weatherHistory", JSON.stringify(updated));
      setSearchHistory(updated);
    } catch (e) {
      console.warn("Błąd zapisu historii:", e);
    }
  };

  const loadSearchHistory = async () => {
    const history = JSON.parse(
      (await AsyncStorage.getItem("weatherHistory")) || "[]"
    );
    setSearchHistory(history);
  };

  useEffect(() => {
    loadSearchHistory();
  }, []);

  return (
    <ScrollView className="p-4 bg-[#000] h-full pt-20">
      <Text className="text-white text-3xl font-bold mb-10 text-center">
        Pogoda
      </Text>
      <View className="flex flex-row flex-wrap justify-between gap-4">
        <View className="flex-row justify-between items-center p-2 rounded-xl w-full bg-[#222]">
          <TextInput
            className="text-white p-2"
            placeholder="Wpisz miasto..."
            value={city}
            onChangeText={setCity}
          />
          <Button
            color="white"
            title="Szukaj"
            onPress={() => fetchWeather(city)}
          />
        </View>

        {weather && (
          <View className="bg-[#222] w-full rounded-xl">
            <Text className="text-[#fff] text-center text-3xl font-semibold p-5">
              {city}
            </Text>
            <View className="self-center h-[1px] bg-[#fff] w-full" />
            <View className="p-5 gap-5">
              <View>
                <View className="flex-row items-center justify-center">
                  <Text className="text-[#fff] text-center text-xl font-medium">
                    Temperatura
                  </Text>
                  <Text className="font-semibold text-center text-3xl text-[#fff]">
                    {weather.temp_c}°C
                  </Text>
                </View>

                <View className="flex-row items-center justify-center">
                  <Text className="text-[#fff] text-center text-xl font-medium">
                    Wilgotność
                  </Text>
                  <Text className="font-semibold text-center text-3xl text-[#fff]">
                    {weather.humidity}%
                  </Text>
                </View>

                <View className="flex-row items-center justify-center">
                  <Text className="text-[#fff] text-center text-xl font-medium">
                    Wiatr
                  </Text>
                  <Text className="font-semibold text-center text-3xl text-[#fff]">
                    {weather.wind_kph} km/h
                  </Text>
                </View>
              </View>
              <View className="self-center h-[1px] bg-[#fff] w-full" />
              <Text className="font-semibold text-center text-3xl text-[#fff]">
                {weather.condition.text}
              </Text>
            </View>
          </View>
        )}

        {forecast.length > 0 && (
          <View className="bg-[#222] rounded-xl p-4 w-full">
            <Text className="text-white font-bold text-xl mb-2">
              Prognoza pogody:
            </Text>
            {forecast.map((day) => {
              const weekday = new Intl.DateTimeFormat("pl-PL", {
                weekday: "long",
              }).format(new Date(day.date));

              return (
                <Text key={day.date} className="text-white">
                  {weekday.charAt(0).toUpperCase() + weekday.slice(1)}:{" "}
                  {day.day.avgtemp_c}°C, {day.day.condition.text}
                </Text>
              );
            })}
          </View>
        )}

        <View className="bg-[#222] rounded-xl p-4 w-full">
          <Text className="text-white font-bold text-xl mb-2">Historia:</Text>
          {searchHistory.map((item, index) => (
            <Text
              key={index}
              onPress={() => fetchWeather(item)}
              className="text-white"
            >
              {item}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
