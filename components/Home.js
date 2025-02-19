import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getWeather } from './weatherService';

export default function Home() {
  const [city, setCity] = useState('London');
  const [weather, setWeather] = useState(null);

  // Function to fetch weather
  const fetchWeather = async () => {
    try {
      const data = await getWeather(city);
      setWeather(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  // Function to determine the text color based on temperature
  const getTempColor = (temp) => {
    if (temp >= 20) {
      return 'red'; // Hot
    } else if (temp <= 15) {
      return 'blue'; // Cold
    } else {
      return 'black'; // Moderate
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      <TextInput
        value={city}
        onChangeText={setCity}
        placeholder="Enter city"
        style={styles.input}
      />
      <Button title="Get Weather" onPress={fetchWeather} />
      {weather && (
        <View style={styles.weatherContainer}>
          <Text style={styles.city}>🌍 {weather.name}</Text>
          <Text style={[styles.temp, { color: getTempColor(weather.main.temp) }]}>
            🌡 {weather.main.temp}°C
          </Text>
          <Text style={styles.condition}>☁ {weather.weather[0].description}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    borderBottomWidth: 1,
    width: '80%',
    marginBottom: 15,
    padding: 8,
    textAlign: 'center',
    fontSize: 18,
    borderBottomColor: '#007BFF',
  },
  weatherContainer: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    alignItems: 'center',
    width: '80%',
  },
  city: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  temp: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  condition: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#555',
  },
});
