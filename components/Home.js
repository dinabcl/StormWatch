import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { getWeather } from './weatherService';

export default function Home({ isCelsius, setIsCelsius }) {
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

  // Function to convert Celsius to Fahrenheit
  const convertTemp = (temp) => {
    return isCelsius ? temp : temp * 9 / 5 + 32;
  };

  const getTempColor = (temp) => {
    // Convert Fahrenheit to Celsius for comparison
    const tempInCelsius = isCelsius ? temp : (temp - 32) * 5 / 9;
  
    if (tempInCelsius >= 20) {
      return 'red'; // Hot
    } else if (tempInCelsius <= 15) {
      return 'blue'; // Cold
    } else {
      return 'black'; // Moderate
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  // Ensure weather data exists before rendering
  const renderWeatherInfo = () => {
    if (!weather) {
      return <Text style={styles.condition}>Loading weather...</Text>;
    }

    const { name, main, weather: weatherData } = weather;
    const temperature = main?.temp; // Check if main exists and has temp
    const description = weatherData?.[0]?.description || 'No description available';

    if (temperature === undefined) {
      return <Text style={styles.condition}>Unable to retrieve temperature data</Text>;
    }

    return (
      <View style={styles.weatherContainer}>
        <Text style={styles.city}>🌍 {name}</Text>
        <Text style={[styles.temp, { color: getTempColor(convertTemp(temperature)) }]} >
          🌡 {convertTemp(temperature).toFixed(1)}°{isCelsius ? 'C' : 'F'}
        </Text>
        <Text style={styles.condition}>☁ {description}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Storm Watch</Text>
      <TextInput
        value={city}
        onChangeText={setCity}
        placeholder="Enter city"
        style={styles.input}
      />
      {/* Custom Button */}
      <TouchableOpacity style={styles.button} onPress={fetchWeather}>
        <Text style={styles.buttonText}>Get Weather</Text>
      </TouchableOpacity>
      {renderWeatherInfo()}
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
    color: '#',
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
  button: {
    backgroundColor: '#007BFF', // Blue background
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 2, // Add border
    borderColor: '#0056b3', // Darker blue border
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', // White text
    fontSize: 18,
    fontWeight: 'bold',
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
