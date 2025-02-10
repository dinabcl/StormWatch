import React from 'react';
import { View, Text, Button } from 'react-native';

const Search = ({ navigation }) => {
  return (
    <View>
      <Text>This is the search screen!</Text>
      
      {/* Manually navigate back to Home screen */}
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default Search;
