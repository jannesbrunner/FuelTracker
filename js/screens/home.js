import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import StyledButton from '../components/StyledButton'

export default class HomeScreen extends Component {
    render() {
        return (
            <View styles={styles.container}>
                <Text>Home Screen</Text>
                <StyledButton 
                       title="Track Fuel"
                       onPress={() => this.props.navigation.navigate('TrackFuelScreen')}
                />
                <StyledButton
                    title="Show Statistics"
                    onPress={() => this.props.navigation.navigate('StatisticsScreen')}
                />
                <StyledButton
                    title="App Settings"
                    onPress={() => this.props.navigation.navigate('SettingsScreen')}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})