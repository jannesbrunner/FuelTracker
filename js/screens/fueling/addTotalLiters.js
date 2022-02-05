import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, Button, KeyboardAvoidingView } from 'react-native';
import Toast from 'react-native-toast-message';
import { checkNumericInput, createLocationString } from '../../helpers/snippets';

import { supabase } from '../../helpers/database';

export default class AddLitersScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalLiters: 0,
            totalPrice: 0,
            correctLiters: 0
        }
        console.log(this.props.route.params);
    }

    handleInput(input) {
        this.setState({ 
            totalLiters: input.toString(), 
            correctLiters: checkNumericInput(input),
            totalPrice: this.calculateTotalPrice()
        })
    }

    calculateTotalPrice() {
        const ppl = parseFloat(this.props.route.params.pricePerLiter) * 100; // cents
        const ttl = parseFloat(this.state.totalLiters);
        return (ttl * ppl) / 100;
    }

    saveFuel = async () => {
        const gas_station_id = parseFloat(this.props.route.params.location.id);
        const car_id = 1;
        const mileage = parseFloat(this.props.route.params.kilometers);
        const price = parseFloat(this.state.totalPrice);
        const volume = parseFloat(this.state.totalLiters);

        Toast.show({
            type: 'info',
            text1: 'Patience please',
            text2: 'We are saving your data...'
        });

        try {
            const { data, error } = await supabase
                .from('refueling')
                .insert([
                    {
                        gas_station_id,
                        car_id,
                        mileage,
                        price,
                        volume
                    }
                ])
            if (error) {
                throw new Error(error.message)
            } else {
                console.log(data);
                Toast.show({
                    type: 'success',
                    text1: 'Success!',
                    text2: 'Your refueling was tracked!'
                });
                const { navigation } = this.props;
                navigation.push('HomeScreen');
            }

        } catch (error) {
            console.log(error);
            Toast.show({
                type: 'error',
                text1: 'Oh no...',
                text2: 'Error saving your data: ' + error
            });
        }

        const { navigation } = this.props;
        navigation.navigate('HomeScreen');
    }





    render() {
        const { correctLiters } = this.state
        return (
            <KeyboardAvoidingView styles={styles.container}>
                <Text style={styles.text}>Add Total Liters</Text>
                <Text>At Station: {createLocationString(this.props.route.params.location)}</Text>
                <Text>Car Kilometers: {this.props.route.params.kilometers}</Text>
                <Text>Price per Liter: {this.props.route.params.pricePerLiter}</Text>
                <Text>Total Price: {this.state.totalPrice}</Text>
                <TextInput
                    style={styles.textInput}
                    value={this.state.totalLiters.toString()}
                    keyboardType={'decimal-pad'}
                    maxLength={5}
                    onChangeText={(input) => this.handleInput(input)}
                ></TextInput>
                <Button
                    onPress={() => {
                        this.saveFuel();
                    }}
                    title={'Save & Finish!'}
                    disabled={!correctLiters}
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