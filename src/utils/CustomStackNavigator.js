import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const CustomStackNavigator = ({screens}) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      {screens.map((screen, index) => (
        <Stack.Screen
          key={index}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </Stack.Navigator>
  );
};

export default CustomStackNavigator;
