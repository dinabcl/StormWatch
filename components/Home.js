import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* App Title */}
      <Text style={styles.header}>Weather App</Text>

      {/* Weather Information Placeholder */}
      <View style={styles.weatherCard}>
        <Text style={styles.city}>Your Location</Text>
        <Text style={styles.temperature}>27°C</Text>
        <Text style={styles.description}>Fetching weather...</Text>
      </View>

      {/* Navigation Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Search')}
      >
        <Text style={styles.buttonText}>Go to Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#afeeee',
    padding: 20,
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
  },
  weatherCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5, // For Android shadow
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
  },
  city: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#555',
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
    marginVertical: 10,
  },
  description: {
    fontSize: 18,
    color: '#666',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Home;
