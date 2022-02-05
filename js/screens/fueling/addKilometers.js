import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button, KeyboardAvoidingView } from 'react-native';
import Toast from 'react-native-toast-message';
import { supabase } from '../../helpers/database';
import { createLocationString, checkNumericInput } from '../../helpers/snippets';
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
                if(data) {
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
            (error) => { console.log(error)
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
            if( this.state.lastKilometers ) {
                return parseFloat(input) > this.state.lastKilometers
            } else return true
        }
        this.setState({ correctKilometers: checkNumericInput(input) && checkDBvalue(input) });        
        this.setState({ kilometers: input.toString()})
    }

    async getLastKilometers() {
        try {
            const response = await supabase
            .from('refueling')
            .select('created_at, mileage')
            .order('created_at', { ascending: false})
            .limit(1);
            const { data, error } = response;
            if(error) {
                throw new Error(error.message);
            } else return data;
        } catch (error) {
            console.log(error);
        }  
    }

    goToPricePerLiter() {
        const { navigation } = this.props;
        navigation.push('addPricePerLiter',  { location: this.props.route.params.location, kilometers: this.state.kilometers })
    }
    
    render() {
        const { correctKilometers, lastKilometers, kilometers } = this.state;
        return (
            <KeyboardAvoidingView styles={styles.container}>
                <Text style={styles.text}>Add Total Kilometer</Text>
                <Text>At Station: {createLocationString(this.props.route.params.location)}</Text>
                <Text>{lastKilometers ? `Last KM value: ${lastKilometers}` : `No previous KM record found`}</Text>
                {lastKilometers ? <Text>You drove {(kilometers - lastKilometers) > 0 ? kilometers - lastKilometers : 0 } km.</Text> : <Text></Text>}
                <TextInput 
                    style={styles.textInput}
                    value={this.state.kilometers.toString()}
                    keyboardType={'number-pad'}
                    maxLength={7}  
                    onChangeText={(input) => this.handleInput(input)}
                ></TextInput>
                <Button 
                    title={'Next: Add Price Per Liter'}
                    onPress={() => this.goToPricePerLiter()}
                    disabled={!correctKilometers}
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