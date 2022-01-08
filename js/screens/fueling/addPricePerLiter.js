import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class AddPricePerLiterScreen extends Component {
    render() {
        const { navigation } = this.props
        return (
            <View styles={styles.container}>
                <Text style={styles.text}>Add Price Per Liter</Text>
                <Button 
                    onPress={() => navigation.push('addTotalLiters')} 
                    title={'Next: Add Total amount of Liters'}
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