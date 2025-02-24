import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  FlatList, KeyboardAvoidingView, Platform 
} from 'react-native';
import { getWeather } from './weatherService';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Import AsyncStorage
import { convertTemp, getTempColor } from './utils';  // Import utility functions

export default function Home({ isCelsius, setIsCelsius }) {
  const [city, setCity] = useState('London');
  const [forecast, setForecast] = useState(null);
  const [favoriteCities, setFavoriteCities] = useState([]); // State to manage favorites

  const fetchWeather = async () => {
    try {
      const data = await getWeather(city);
      console.log('Setting Forecast Data:', data); // Log the data being set
      setForecast(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  // Load favorite cities from AsyncStorage
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const savedFavorites = await AsyncStorage.getItem('favoriteCities');
        if (savedFavorites) {
          setFavoriteCities(JSON.parse(savedFavorites));
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };
    loadFavorites();
  }, []);

  // Handle adding/removing cities from the favorites list
  const handleFavorite = async () => {
    if (favoriteCities.includes(city)) {
      const updatedCities = favoriteCities.filter(item => item !== city);
      setFavoriteCities(updatedCities);
      await AsyncStorage.setItem('favoriteCities', JSON.stringify(updatedCities));
    } else {
      const updatedCities = [...favoriteCities, city];
      setFavoriteCities(updatedCities);
      await AsyncStorage.setItem('favoriteCities', JSON.stringify(updatedCities));
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <FlatList
        data={[{ key: 'title' }, { key: 'inputButtonContainer' }, { key: 'favoriteButton' }, ...(forecast ? forecast.forecast : [])]} // Assuming your forecast API returns a list
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          if (item.key === 'title') {
            return <Text style={styles.title}>Storm Watch</Text>;
          }

          if (item.key === 'inputButtonContainer') {
            return (
              <View style={styles.inputButtonContainer}>
                <TextInput
                  value={city}
                  onChangeText={setCity}
                  placeholder="Enter city"
                  style={styles.input}
                />
                <TouchableOpacity style={styles.button} onPress={fetchWeather}>
                  <Text style={styles.buttonText}>Get Weather</Text>
                </TouchableOpacity>
              </View>
            );
          }

          if (item.key === 'favoriteButton') {
            return (
              <TouchableOpacity 
                style={styles.favoriteButton} 
                onPress={handleFavorite}
              >
                <Text style={styles.buttonText}>
                  {favoriteCities.includes(city) ? 'Remove from Favorites' : 'Add to Favorites'}
                </Text>
              </TouchableOpacity>
            );
          }

          const isToday = index === 0; // Assuming the first item is today's forecast

          return (
            <View style={[styles.forecastItem, isToday && styles.todayForecastItem]}>
              <Text style={styles.date}>{item.date}</Text> {/* Adjust according to your API's date format */}
              <Text 
                style={[styles.temp, { color: getTempColor(item.temp, isCelsius) }]}
              >
                🌡 <Text>{convertTemp(item.temp, isCelsius).toFixed(1)}°{isCelsius ? 'C' : 'F'}</Text>
              </Text>
              <Text style={styles.condition}>☁ <Text>{item.description}</Text></Text>
              <Text style={styles.humidity}>💧 <Text>Humidity: {item.humidity}%</Text></Text>
              <Text style={styles.wind}>🌬 <Text>Wind: {item.windSpeed} km/h</Text></Text> {/* Wind speed is usually in m/s, may need conversion */}
            </View>
          );
        }}
        contentContainerStyle={styles.flatlistContainer}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3f2fd',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0d47a1',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
  },
  inputButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    borderBottomWidth: 2,
    width: '60%',
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    borderBottomColor: '#1565c0',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    elevation: 3,
  },
  button: {
    backgroundColor: '#1565c0',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#0d47a1',
    marginLeft: 10,
    alignItems: 'center',
    elevation: 4,
  },
  favoriteButton: {
    backgroundColor: '#ffeb3b',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ff9800',
    marginTop: 10,
    alignItems: 'center',
    elevation: 4,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forecastItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    width: '85%',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignSelf: 'center',
  },
  todayForecastItem: {
    backgroundColor: '#ffffff', // Same background color as other items
    borderColor: '#0d47a1', // Add a border color to make it stand out
    borderWidth: 2,
    width: '90%', // Make it wider
    padding: 20, // Increase padding
    alignSelf: 'center', // Center it
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e88e5',
  },
  temp: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  condition: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#616161',
  },
  humidity: {
    fontSize: 16,
    color: '#616161',
  },
  wind: {
    fontSize: 16,
    color: '#616161',
  },
  flatlistContainer: {
    paddingBottom: 100, // Ensures enough scroll space
  }
});
