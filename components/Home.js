import React from 'react';
import { View, Text, Button } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <View>
      <Text>This is the home page!</Text>
      
      {/* Button to navigate to Search screen */}
      <Button
        title="Go to Search"
        onPress={() => navigation.navigate('Search')} // Use 'navigate' to go to Search screen
      />
    </View>
  );
};

export default Home;
