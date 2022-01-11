import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, Button, KeyboardAvoidingView } from 'react-native';

export default class AddPricePerLiterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { pricePl: 0 }
    }

    handleInput(input) {
        console.log(input)
        this.setState({ pricePl: input.toString()}) 
    }
    
    render() {
        const { navigation } = this.props
        return (
            <KeyboardAvoidingView styles={styles.container}>
                <Text style={styles.text}>Add Price Per Liter</Text>
                <TextInput 
                    style={styles.textInput}
                    value={this.state.pricePl.toString()}
                    keyboardType={'decimal-pad'}
                    maxLength={5}  
                    onChangeText={(input) => this.handleInput(input)}
                ></TextInput>
                <Button 
                    onPress={() => navigation.push('addTotalLiters')} 
                    title={'Next: Add Total amount of Liters'}
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