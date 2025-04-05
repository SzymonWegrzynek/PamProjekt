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
    <ScrollView>
      <Text className="text-center text-black font-bold text-4xl mt-20 font-lexend">
        Pogoda
      </Text>

      <View className="flex flex-row justify-center gap-2 mt-5">
        <TextInput
          className="w-[60%] border-2 border-black rounded-lg p-2"
          placeholder="Wpisz miasto..."
          value={city}
          onChangeText={setCity}
        />
        <Button 
          color="black"
          title="Szukaj" onPress={() => fetchWeather(city)} 
        />
      </View>      

      {weather && (
        <View className="self-center bg-[#0a0908] w-[90%] rounded-lg m-5 ">
          <Text className="text-[#fffcf2] text-center text-3xl font-bold p-2">{city}</Text>
          <View className="self-center h-[1px] bg-[#fffcf2] w-[90%]" />
          <View className="flex-row flex-wrap justify-center p-2 gap-5">
            <View className="flex flex-col">
              <Text className="text-[#fffcf2] text-center text-xl mb-1">Temperatura</Text>
              <Text className="font-bold text-center text-3xl text-[#fffcf2]">{weather.temp_c}°C</Text>
            </View>
            <View className="flex flex-col">
              <Text className="text-[#fffcf2] text-center text-xl mb-1">Wilgotność</Text>
              <Text className="font-bold text-center text-3xl text-[#fffcf2]">{weather.humidity}%</Text>
            </View>
            <View className="flex flex-col">
              <Text className="text-[#fffcf2] text-center text-xl mb-1">Wiatr</Text>
              <Text className="font-bold text-center text-3xl text-[#fffcf2]">{weather.wind_kph} km/h</Text>
            </View>
            <View className="flex flex-col">
              <Text className="text-[#fffcf2] text-center text-xl mb-1">Opis</Text>
              <Text className="font-bold text-center text-3xl text-[#fffcf2]">{weather.condition.text}</Text>
            </View>            
          </View>          
        </View>
      )}

      {forecast.length > 0 && (
        <View>
          <Text>Prognoza na 7 dni:</Text>
          {forecast.map((day) => (
            <Text key={day.date}>
              {day.date}: {day.day.avgtemp_c}°C, {day.day.condition.text}
            </Text>
          ))}
        </View>
      )}

      <View>
        <Text>Historia wyszukiwań:</Text>
        {searchHistory.map((item, index) => (
          <Text key={index} onPress={() => fetchWeather(item)}>
            {item}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}
