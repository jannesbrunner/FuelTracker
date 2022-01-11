import React, { Component } from 'react';
import { Button, KeyboardAvoidingView, StyleSheet, Text } from 'react-native';

import GasStationList from '../../components/gasStationList';

export default class AddStation extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedStation: null }
    }

    render() {
        const { navigation } = this.props
        return (
            <KeyboardAvoidingView styles={styles.container}>
                <Text style={styles.text}>Add Gas Station</Text>
                <GasStationList />
                <Button 
                    onPress={() => navigation.push('addKilometers')} 
                    title={'Next: Kilometers'}
                    >
                </Button>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 50,
    }
})