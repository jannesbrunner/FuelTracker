import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class SettingsScreen extends Component {
    render() {
        return (
            <View styles={styles.container}>
                <Text>Settings Screen</Text>
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