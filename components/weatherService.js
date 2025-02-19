const API_KEY = '25d1520dfee2ee05ef782a30c2c9e45a'; // Replace with your API key

export async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    return await response.json();
  } catch (error) {
    console.error('Weather API error:', error);
    return null;
  }
}


