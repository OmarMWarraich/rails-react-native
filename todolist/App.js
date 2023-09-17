import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/Login';
import Registration from './screens/Registration';
import TodoList from './screens/TodoList';

const Stack = createNativeStackNavigator();

const App = () => {
  const [loggedInStatus, setLoggedInStatus] = useState('NOT_LOGGED_IN');

  const checkLoginStatus = () => {
    axios.get('http://localhost:3000/logged_in', { withCredentials: true })
      .then(response => {
        if (response.data.logged_in && loggedInStatus === 'NOT_LOGGED_IN') {
          setLoggedInStatus('LOGGED_IN');
        } else if (!response.data.logged_in && loggedInStatus === 'LOGGED_IN') {
          setLoggedInStatus('NOT_LOGGED_IN');
        }
      })
      .catch(error => console.log('api errors:', error));
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          loggedInStatus === 'LOGGED_IN' ?
          (
            <Stack.Screen
              name="TodoList"
              component={TodoList}
              options={{ title: 'TodoList' }}
            />
          )
          :
          (
            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ title: 'Login' }}
              />
              <Stack.Screen
                name="Registration"
                component={Registration}
                options={{ title: 'Registration' }}
              />
            </Stack.Group>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
