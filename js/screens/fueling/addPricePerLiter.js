import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, Button, KeyboardAvoidingView } from 'react-native';
import { createLocationString, checkNumericInput } from '../../helpers/snippets';

export default class AddPricePerLiterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            pricePl: 0,
            priceCorrect: false
        }
        this.goToTotalLiters = this.goToTotalLiters.bind(this);
    }

    handleInput(input) {
        console.log(checkNumericInput(input));
        this.setState({ pricePl: input.toString(), priceCorrect: checkNumericInput(input)}) 
    }

    goToTotalLiters() {
        const { navigation } = this.props;
        navigation.push('addTotalLiters',  { 
            location: this.props.route.params.location, 
            kilometers: this.props.route.params.kilometers,
            pricePerLiter: this.state.pricePl
         })
    }
    
    render() {
        const { priceCorrect } = this.state
        return (
            <KeyboardAvoidingView styles={styles.container}>
                <Text style={styles.text}>Add Price Per Liter</Text>
                <Text>At Station: {createLocationString(this.props.route.params.location)}</Text>
                <Text>Car Kilometers: {this.props.route.params.kilometers}</Text>
                <TextInput 
                    style={styles.textInput}
                    value={this.state.pricePl.toString()}
                    keyboardType={'decimal-pad'}
                    maxLength={5}  
                    onChangeText={(input) => this.handleInput(input)}
                ></TextInput>
                <Button 
                    onPress={() => this.goToTotalLiters()} 
                    title={'Next: Add Total amount of Liters'}
                    disabled={!priceCorrect}
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