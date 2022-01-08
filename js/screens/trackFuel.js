import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import fueling screens
import addStation from './fueling/addStation';
import addKilometersScreen from './fueling/addKilometers';
import addPricePerLiterScreen from './fueling/addPricePerLiter';
import addTotalLitersScreen from './fueling/addLiters';


const Stack = createNativeStackNavigator();


export default class FuelScreen extends Component {
    render() {
        const { navigation } = this.props
        return (
                <Stack.Navigator screenOptions={{
                    headerBackVisible: false,
                    headerShown: false
                }}>
                    <Stack.Screen name="addStation" component={addStation} />
                    <Stack.Screen name="addKilometers" component={addKilometersScreen} />
                    <Stack.Screen name="addPricePerLiter" component={addPricePerLiterScreen} />
                    <Stack.Screen name="addTotalLiters" component={addTotalLitersScreen} />
                </Stack.Navigator>
        );
    }
}

