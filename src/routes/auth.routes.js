import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { Login } from '../screens/Login';

const Stack = createStackNavigator();

export function AuthRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          cardStyle: {
            backgroundColor: '#ffff',
          },
        }}
      />
    </Stack.Navigator>
  );
}
