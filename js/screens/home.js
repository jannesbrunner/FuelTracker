import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class HomeScreen extends Component {
    render() {
        return (
            <View styles={styles.container}>
                <Text>Home Screen</Text>
                <Button
                    title="Track Fuel"
                    onPress={() => this.props.navigation.navigate('TrackFuelScreen')}
                />
                <Button
                    title="Show Statistics"
                    onPress={() => this.props.navigation.navigate('StatisticsScreen')}
                />
                <Button
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