import React, { Component } from 'react';
import Toast from 'react-native-toast-message';
import { checkNumericInput, createLocationString } from '../../helpers/snippets';
import {
    Platform,
    View,
    ActivityIndicator,
    KeyboardAvoidingView,
    StyleSheet,
    Pressable,
    TouchableOpacity
} from 'react-native';
import { Button, TextInput, HelperText, Text } from 'react-native-paper';
import { supabase } from '../../helpers/database';
import StyledButton from '../../components/StyledButton';

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
                navigation.reset({
                    index: 0,
                    routes: [{name: 'HomeScreen'}],
                  });
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
            <View style={styles.container}>
            <KeyboardAvoidingView styles={styles.container}>
                <View style={styles.inputView}>
                    <Text style={styles.text}>Add Total Liters</Text>
                    <Text style={styles.textSmall}>At Station: {createLocationString(this.props.route.params.location)}</Text>
                    <Text style={styles.textSmall}>Car Kilometers: {this.props.route.params.kilometers}</Text>
                    <Text style={styles.textSmall}>Price per Liter: {this.props.route.params.pricePerLiter}</Text>
                    <Text style={styles.textSmall}>Total Price: {this.state.totalPrice}</Text>
                    <TextInput
                        value={this.state.totalLiters.toString()}
                        keyboardType={'decimal-pad'}
                        maxLength={5}
                        placeholder="Enter your eMail"
                        mode="outlined"
                        width="50%"
                        activeOutlineColor="#00a400"
                        onChangeText={(input) => this.handleInput(input)}
                    />
                </View>

                <StyledButton
                    title={'Save & Finish!'}
                    onPress={() => this.saveFuel()}
                    disabled={!correctLiters}
                >
                </StyledButton>

            </KeyboardAvoidingView>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: "#fff",
        alignItems: 'center',
        //justifyContent: 'center',
        fontFamily: 'sans-serif',
        flex: 1
    },
    text: {
        fontSize: 40,
        marginBottom: 15,
        marginTop: 10,
        textAlign: "center"
    },
    textStyle: {
        marginBottom: 5,
        marginTop: 30,
        color: "#00a400",
        textAlign: "center"

    },
    textSmall: {
        marginTop: 10,
        textAlign: "center",
        color: "#00a400",
    }
})