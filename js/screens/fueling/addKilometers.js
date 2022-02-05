import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button, KeyboardAvoidingView } from 'react-native';
import { parse } from 'react-native-svg';
import Toast from 'react-native-toast-message';
import { supabase } from '../../helpers/database';
import { createLocationString } from '../../helpers/snippets';
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
        this.setState({ correctKilometers: true });
        // do we got a last km value from db?
        if( this.state.lastKilometers ) {
            if(parseFloat(input) <= this.state.lastKilometers) {
                this.setState({ correctKilometers: false });
            } 
        }
        if( parseFloat(input) <= 0 ) this.setState({ correctKilometers: false }); 
        if( isNaN(input) || input.length == 0) this.setState({ correctKilometers: false });
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
        navigation.push('addPricePerLiter',  { location: props.route.params.location, kilometers: this.state.kilometers })
    }
    
    render() {
        const { navigation } = this.props
        const { correctKilometers: correctMileage } = this.state;
        return (
            <KeyboardAvoidingView styles={styles.container}>
                <Text style={styles.text}>Add Total Kilometer</Text>
                <Text>At Station: {createLocationString(props.route.params.location)}</Text>
                <TextInput 
                    style={styles.textInput}
                    value={this.state.kilometers.toString()}
                    keyboardType={'numeric'}
                    maxLength={7}  
                    onChangeText={(input) => this.handleInput(input)}
                ></TextInput>
                <Button 
                    title={'Next: Add Price Per Liter'}
                    onPress={() => this.goToPricePerLiter()}
                    disabled={!correctMileage}
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