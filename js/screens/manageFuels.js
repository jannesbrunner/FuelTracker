import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


export default class manageFuelsScreen extends Component {
    
    render() {
        const { navigation } = this.props
        return (
            <View styles={styles.container}>
                <Text style={styles.text}>Manage Fuels</Text>
                <Text>No refueling tracked yet</Text>
                <Button 
                    onPress={() => navigation.goBack()} 
                    title={'Back'}
                    >
                </Button>
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
    },
    text: {
        fontSize: 50,
    }
})