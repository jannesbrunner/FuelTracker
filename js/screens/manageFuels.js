import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import { DataTable } from 'react-native-paper';

import { supabase } from '../helpers/database';


export default class manageFuelsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fuels: [],
            error: null,
            isLoading: true,
        }
    }

    render() {
        const { navigation } = this.props
        const { error, fuels } = this.state
        console.log(fuels);

        var rows = [];
        for (var i = 0; i < fuels.length; i++) {
            // note: we are adding a key prop here to allow react to uniquely identify each
            // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
            rows.push(
                <DataTable.Row key={fuels[i].id}>
                    <DataTable.Cell>{fuels[i].created_at.substring(0, 10)}</DataTable.Cell>
                    <DataTable.Cell>{fuels[i].gas_station.company}</DataTable.Cell>
                    <DataTable.Cell>{fuels[i].gas_station.address}</DataTable.Cell>
                    <DataTable.Cell>{fuels[i].volume}</DataTable.Cell>
                    <DataTable.Cell>{fuels[i].price}</DataTable.Cell>
                </DataTable.Row>
            );
        }

        const list = <DataTable>
            <DataTable.Header>
                <DataTable.Title>Date</DataTable.Title>
                <DataTable.Title>Station</DataTable.Title>
                <DataTable.Title>Address</DataTable.Title>
                <DataTable.Title>Fueled (L)</DataTable.Title>
                <DataTable.Title>Total Price</DataTable.Title>
            </DataTable.Header>
            {rows}
        </DataTable>;
        
        const { isLoading } = this.state;
        return (
            <View styles={styles.container}>
                <Text style={styles.text}>Manage Fuels</Text>
                {error ? <Text>There was an error: {error} </Text> : <Text>Your have {fuels.length} recorded fuelings</Text>}
                {isLoading ? <ActivityIndicator size="large" /> : list}


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
            .select('*, gas_station( company, address )');
        if (error) {
            console.log(error);
            this.setState({
                fuels: [],
                error: error.message,
                isLoading: true
            })
        } else {
            console.log(data);
            this.setState({
                fuels: data,
                isLoading: false
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