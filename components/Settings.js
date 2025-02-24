import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

export default function Settings({ isCelsius, setIsCelsius }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select temperature unit:</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.toggleText}>°F</Text>
        <Switch
          value={isCelsius}
          onValueChange={setIsCelsius}
          thumbColor={isCelsius ? "#007BFF" : "#8A2BE2"} // Blue for °C, Purple for °F
          trackColor={{ false: "#D8BFD8", true: "#87CEEB" }} // Light purple & sky blue
          ios_backgroundColor="#D8BFD8" // Consistent iOS styling
          style={styles.switch}
        />
        <Text style={styles.toggleText}>°C</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    marginTop: 20,
  },
  toggleText: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 15,
  },
  switch: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
    marginHorizontal: 10,
  },
});
