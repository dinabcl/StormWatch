// Convert temperature based on selected unit
export const convertTemp = (temp, isCelsius) => (isCelsius ? temp : temp * 9 / 5 + 32);

// Get color based on temperature
export const getTempColor = (temp, isCelsius) => {
  if (temp === undefined || temp === null) return '#333'; // Default color for invalid data

  const tempInCelsius = isCelsius ? temp : (temp - 32) * 5 / 9; // Convert to Celsius if Fahrenheit is used

  // Adjusted color ranges for better gradient handling
  if (tempInCelsius >= 30) {
    return '#d32f2f'; // Hot - Red
  } else if (tempInCelsius >= 20 && tempInCelsius < 30) {
    return '#f57c00'; // Warm - Orange
  } else if (tempInCelsius >= 10 && tempInCelsius < 20) {
    return '#0288d1'; // Moderate - Blue
  } else if (tempInCelsius <= 10) {
    return '#1565c0'; // Cold - Blue
  } else {
    return '#333'; // Default
  }
};
