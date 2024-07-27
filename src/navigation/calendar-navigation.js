import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { nativeStackConfig } from './nativeStackConfig';

import Routes from './routes';
import { CreateTask, Home, Setting } from '@calendar/screens';
import { useStore } from '@calendar/store';
import LoginScreen from '../Login';

const Stack = createStackNavigator();

function MainNavigatorWrapper() {
  return (
    <Stack.Navigator {...nativeStackConfig}>
      <Stack.Screen component={LoginScreen} name="Login" />      
      <Stack.Screen component={Home} name={Routes.HOME} />
      <Stack.Screen component={CreateTask} name={Routes.CREATE_TASK} />
      <Stack.Screen component={Setting} name={Routes.SETTING} />      
    </Stack.Navigator>
  );
}

const AppContainer = React.forwardRef((props, ref) => (
  <NavigationContainer ref={ref}>
    <MainNavigatorWrapper initialRoute={props.initialRoute} />
  </NavigationContainer>
));

AppContainer.displayName = 'AppContainer';

export default React.memo(AppContainer);
