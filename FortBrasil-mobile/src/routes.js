import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Singnin from './pages/Singnin/index';
import SingnUp from './pages/SingnUp/index';
import Home from './pages/Home/index';
import Maps from './pages/Maps/index';
import ListEstablishments from './pages/ListEstablishments/index';

import {navigationRef} from './services/rootNavigation';

const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name="Singnin" component={Singnin} />
        <Stack.Screen name="SingnUp" component={SingnUp} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Maps" component={Maps} />
        <Stack.Screen
          name="ListEstablishments"
          component={ListEstablishments}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
