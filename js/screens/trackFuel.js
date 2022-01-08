import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class FuelScreen extends Component {
    render() {
        const { navigation } = this.props
        return (
            <View styles={styles.container}>
                <Text>Track Fuel Screen</Text>
                <Button
                    title="Fake next fuel screen push to stack"
                    onPress={() => navigation.push('TrackFuelScreen')}
                />
                <Button title="Go to Home" onPress={() => navigation.navigate('HomeScreen')} />
                <Button title="Go back" onPress={() => navigation.goBack()} />
                <Button
                    title="Go back to first screen in stack"
                    onPress={() => navigation.popToTop()}
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