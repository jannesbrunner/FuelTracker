import React, { Component } from 'react';
import Toast from 'react-native-toast-message';
import StyledButton from '../../components/StyledButton';
import { supabase } from '../../helpers/database';
import { createLocationString, checkNumericInput } from '../../helpers/snippets';
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
export default class AddKilometersScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kilometers: 0,
            lastKilometers: null,
            correctKilometers: false
        }
        this.goToPricePerLiter = this.goToPricePerLiter.bind(this);
    }

    componentDidMount() {
        this.getLastKilometers().then(
            (data) => {
                if (data) {
                    this.setState({ kilometers: data[0].mileage, lastKilometers: data[0].mileage })
                    Toast.show({
                        type: 'success',
                        text1: 'Super!',
                        text2: 'We got the value from your last refueling :)'
                    });
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Oh no..',
                        text2: 'Error getting your last km value :('
                    })
                }
            }
        ).catch(
            (error) => {
                console.log(error)
                Toast.show({
                    type: 'error',
                    text1: 'Oh no..',
                    text2: error
                })
            }
        )
    }

    handleInput(input) {
        // do we got a last km value from db?
        const checkDBvalue = (input) => {
            if (this.state.lastKilometers) {
                return parseFloat(input) > this.state.lastKilometers
            } else return true
        }
        this.setState({ correctKilometers: checkNumericInput(input) && checkDBvalue(input) });
        this.setState({ kilometers: input.toString() })
    }

    async getLastKilometers() {
        try {
            const response = await supabase
                .from('refueling')
                .select('created_at, mileage')
                .order('created_at', { ascending: false })
                .limit(1);
            const { data, error } = response;
            if (error) {
                throw new Error(error.message);
            } else return data;
        } catch (error) {
            console.log(error);
        }
    }

    goToPricePerLiter() {
        const { navigation } = this.props;
        navigation.push('addPricePerLiter', { location: this.props.route.params.location, kilometers: this.state.kilometers })
    }
    render() {
        const { correctKilometers, lastKilometers, kilometers } = this.state;
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView styles={styles.container}>
                    <View style={styles.inputView}>
                        <Text style={styles.text}>Add Total Kilometers</Text>
                        <Text style={styles.textSmall}>At Station: {createLocationString(this.props.route.params.location)}</Text>
                        <Text style={styles.textSmall}>{lastKilometers ? `Last KM value: ${lastKilometers}` : `No previous KM record found`}</Text>
                        {lastKilometers ? <Text style={styles.textSmall}>You drove {(kilometers - lastKilometers) > 0 ? kilometers - lastKilometers : 0} km.</Text> : <Text style={styles.textSmall}></Text>}
                        <TextInput
                            value={this.state.kilometers.toString()}
                            keyboardType={'number-pad'}
                            maxLength={7}
                            mode="outlined"
                            width="50%"
                            activeOutlineColor="#00a400"
                            onChangeText={(input) => this.handleInput(input)}
                        />
                    </View>

                    <StyledButton
                        title={'Next: Add Price Per Liter'}
                        onPress={() => this.goToPricePerLiter()}
                        disabled={!correctKilometers}
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