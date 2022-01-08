import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const saveFuel = () => {
    alert('All done!');
}

export default class AddLitersScreen extends Component {
    render() {
        const { navigation } = this.props
        return (
            <View styles={styles.container}>
                <Text style={styles.text}>Add Total Liters</Text>
                <Button 
                    onPress={() => { 
                        saveFuel();
                        navigation.navigate('HomeScreen'); 
                    }} 
                    title={'Finish!'}
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