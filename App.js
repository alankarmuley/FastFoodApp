import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Home from './src/screen/Home';
import Pay from './src/screen/Pay';

import {ShopProvider} from './src/hooks/OrderContext';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <ShopProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
            <Stack.Screen name="Pay" component={Pay} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ShopProvider>
  );
}

export default App;
