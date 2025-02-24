import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { getWeather } from './weatherService';  
import AsyncStorage from '@react-native-async-storage/async-storage';
import { convertTemp, getTempColor } from './utils';  // Import utility functions

const FavoriteCities = ({ isCelsius }) => {
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [favoriteWeather, setFavoriteWeather] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state

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

  // Fetch weather for each favorite city
  useEffect(() => {
    const fetchFavoriteWeather = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const newWeather = {};
        for (let city of favoriteCities) {
          const data = await getWeather(city);
          newWeather[city] = data.forecast[0]; // Assuming first item is the current weather
        }
        setFavoriteWeather(newWeather);
        console.log('Fetched Weather Data:', newWeather); // Log the fetched data
      } catch (error) {
        console.error('Error fetching favorite cities weather:', error);
      } finally {
        setLoading(false); // Set loading to false once fetching is complete
      }
    };

    if (favoriteCities.length > 0) {
      fetchFavoriteWeather();
    }
  }, [favoriteCities]);

  // Render loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Cities</Text>
      <FlatList
        data={favoriteCities}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.forecastItem}>
            <Text style={styles.cityName}>{item}</Text>
            <Text style={[styles.temp, { color: getTempColor(favoriteWeather[item]?.temp, isCelsius) }]}>
              🌡 <Text>{favoriteWeather[item]?.temp ? convertTemp(favoriteWeather[item].temp, isCelsius).toFixed(1) : '--'}°{isCelsius ? 'C' : 'F'}</Text>
            </Text>
            <Text style={styles.condition}>
              ☁ <Text>{favoriteWeather[item]?.description ? favoriteWeather[item].description : '--'}</Text>
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3f2fd',
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  forecastItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
    elevation: 3,
  },
  cityName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 18,
    marginVertical: 5,
  },
  condition: {
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
  },
});

export default FavoriteCities;
