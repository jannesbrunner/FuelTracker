import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


export default class AddStation extends Component {
    
    render() {
        const { navigation } = this.props
        return (
            <View styles={styles.container}>
                <Text style={styles.text}>Add Gas Station</Text>
                <Button 
                    onPress={() => navigation.push('addKilometers')} 
                    title={'Next: Kilometers'}
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