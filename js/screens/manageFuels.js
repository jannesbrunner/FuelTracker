import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { supabase } from '../helpers/database';


export default class manageFuelsScreen extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            fuels: [],
            error: null    
        }
    }

    render() {
        const { navigation } = this.props
        const { error, fuels} = this.state
        console.log(fuels);
        return (
            <View styles={styles.container}>
                <Text style={styles.text}>Manage Fuels</Text>
                {error ? <Text>There was an error: {error} </Text> : <Text>Your recorded fuelings:</Text>}
                {fuels.length > 0 ? <Text>{fuels[0].mileage}</Text> : <Text>No fuelings yet</Text> }
                
                
                <Button 
                    onPress={() => navigation.goBack()} 
                    title={'Back'}
                    >
                </Button>
            </View>
        );
    }

    async getFuelings() {
            const { data, error } = await supabase
            .from('refueling')
            .select();
            if(error) {
                console.log(error);
                this.setState({
                    fuels: [],
                    error: error.message
                })
            } else {
                console.log(data);
                this.setState({
                    fuels: data
                })
            }
    }

    componentDidMount() {
       this.getFuelings();
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
    }
})