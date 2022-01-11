import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import StyledButton from '../components/StyledButton'

export default class HomeScreen extends Component {
    render() {
        return (
            <SafeAreaView styles={styles.container}>
                <StyledButton 
                       title="Track Fuel"
                       onPress={() => this.props.navigation.navigate('TrackFuelScreen')}
                />
                 <StyledButton 
                       title="Manage Fuel Processes"
                       onPress={() => this.props.navigation.navigate('ManageFuelsScreen')}
                />
                <StyledButton
                    title="Show Statistics"
                    onPress={() => this.props.navigation.navigate('StatisticsScreen')}
                />
                <StyledButton
                    title="App Settings"
                    onPress={() => this.props.navigation.navigate('SettingsScreen')}
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    }
})