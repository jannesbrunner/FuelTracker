import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import auth screens
import loginScreen from './screens/auth/login';
import registerScreen from './screens/auth/register';


const Stack = createNativeStackNavigator();


export default class AuthNavigator extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerBackVisible: false,
                    headerShown: false
                }}>
                    <Stack.Screen name="login" component={loginScreen} />
                    <Stack.Screen name="register" component={registerScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

