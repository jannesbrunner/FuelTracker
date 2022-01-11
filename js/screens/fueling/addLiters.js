import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, Button, KeyboardAvoidingView } from 'react-native';

const saveFuel = () => {
    alert('All done!');
}

export default class AddLitersScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { totalLiters: 0 }
    }
    
    handleInput(input) {
        console.log(`total liters: ${input.toString()}`);
        this.setState({ totalLiters: input})
    }

    render() {
        const { navigation } = this.props
        return (
            <KeyboardAvoidingView styles={styles.container}>
                <Text style={styles.text}>Add Total Liters</Text>
                <TextInput 
                    style={styles.textInput}
                    value={this.state.totalLiters.toString()}
                    keyboardType={'decimal-pad'}
                    maxLength={5}  
                    onChangeText={(input) => this.handleInput(input)}
                ></TextInput>
                <Button 
                    onPress={() => { 
                        saveFuel();
                        navigation.navigate('HomeScreen'); 
                    }} 
                    title={'Finish!'}
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