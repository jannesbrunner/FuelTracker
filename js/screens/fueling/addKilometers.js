import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button, KeyboardAvoidingView } from 'react-native';

export default class AddKilometersScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { kilometers: 0 }
    }
    
    handleInput(input) {
        console.log(input);
        this.setState({ kilometers: input.toString()}) 
    }
    
    render() {
        const { navigation } = this.props
        return (
            <KeyboardAvoidingView styles={styles.container}>
                <Text style={styles.text}>Add Total Kilometer</Text>
                <TextInput 
                    style={styles.textInput}
                    value={this.state.kilometers.toString()}
                    keyboardType={'numeric'}
                    maxLength={7}  
                    onChangeText={(input) => this.handleInput(input)}
                ></TextInput>
                <Button 
                    onPress={() => navigation.push('addPricePerLiter')} 
                    title={'Next: Add Price Per Liter'}
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
    },
    textInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }
})