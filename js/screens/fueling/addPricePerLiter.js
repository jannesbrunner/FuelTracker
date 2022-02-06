import React, { Component } from 'react';
import { createLocationString, checkNumericInput } from '../../helpers/snippets';
import StyledButton from '../../components/StyledButton';
import {
    Platform,
    View,
    ActivityIndicator,
    KeyboardAvoidingView,
    StyleSheet,
    Pressable,
    TouchableOpacity,
} from 'react-native';
import { Button, TextInput, HelperText, Text } from 'react-native-paper';

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
        this.setState({ pricePl: input.toString(), priceCorrect: checkNumericInput(input) })
    }

    goToTotalLiters() {
        const { navigation } = this.props;
        navigation.push('addTotalLiters', {
            location: this.props.route.params.location,
            kilometers: this.props.route.params.kilometers,
            pricePerLiter: this.state.pricePl
        })
    }

    render() {
        const { priceCorrect } = this.state
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView styles={styles.container}>
                    <View style={styles.inputView}>
                        <Text style={styles.text}>Add Price Per Liter</Text>
                        <Text style={styles.textSmall}>At Station: {createLocationString(this.props.route.params.location)}</Text>
                        <Text style={styles.textSmall}>Car Kilometers: {this.props.route.params.kilometers}</Text>
                        <TextInput
                            value={this.state.pricePl.toString()}
                            keyboardType={'decimal-pad'}
                            maxLength={5}
                            onChangeText={(input) => this.handleInput(input)}
                            mode="outlined"
                            width="50%"
                            activeOutlineColor="#00a400"
                        ></TextInput>
                    </View>

                    <StyledButton
                        onPress={() => this.goToTotalLiters()}
                        title={'Next: Add Total amount of Liters'}
                        disabled={!priceCorrect}
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