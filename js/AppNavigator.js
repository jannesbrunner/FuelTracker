// Module imports
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



// Screen imports
import HomeScreen from './screens/home';
import SettingsScreen from './screens/settings';
import StatisticsScreen from './screens/statistics';
import TrackFuelScreen from './screens/trackFuel';
import ManageFuelsScreen from './screens/manageFuels';
import LoginScreen from './screens/auth/login';
import RegisterScreen from './screens/auth/register';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{ title: 'Login' }}
                />
                 <Stack.Screen
                    name="RegisterScreen"
                    component={RegisterScreen}
                    options={{ title: 'Register' }}
                />
                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{ title: 'Fuel Tracker' }}
                />
                <Stack.Screen
                    name="SettingsScreen"
                    component={SettingsScreen}
                    options={{ title: 'Settings' }}
                />
                <Stack.Screen
                    name="StatisticsScreen"
                    component={StatisticsScreen}
                    options={{ title: 'Car Statistics' }}
                />
                <Stack.Screen
                    name="TrackFuelScreen"
                    component={TrackFuelScreen}
                    options={{ title: 'Add Fueling' }}
                />
                <Stack.Screen
                    name="ManageFuelsScreen"
                    component={ManageFuelsScreen}
                    options={{ title: 'Manage refueling' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
