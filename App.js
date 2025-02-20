import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './components/Home';
import Settings from './components/Settings';

const Drawer = createDrawerNavigator();

export default function App() {
  const [isCelsius, setIsCelsius] = useState(true); 

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen 
          name="Home" 
          children={() => <Home isCelsius={isCelsius} setIsCelsius={setIsCelsius} />} 
        />
        <Drawer.Screen 
          name="Settings" 
          children={() => <Settings isCelsius={isCelsius} setIsCelsius={setIsCelsius} />} 
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
