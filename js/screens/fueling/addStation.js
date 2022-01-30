import React, { Component } from 'react';
import { View, Button, KeyboardAvoidingView, StyleSheet, Text } from 'react-native';

import * as Location from 'expo-location';

import { supabase } from '../../helpers/database';
import { sortStationsByLocation } from "../../helpers/snippets";

import GasStationList from '../../components/GasStationList';

export default class AddStation extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            selectedStation: null,
            stations: null,
            location: null,
            errorMsg: null
        }
    }

    componentDidMount() {
        // get stations from db, then get user location, then sort stations by location
        this.init();
    }

    async init() {
        try {
            const { body, error, status } = await this.getData();
            if(error) {
                throw new Error(`${error.message} - ${status}`)
            }
            const stations = body;
            console.log(stations);
            const gpsLocation = await this.getCurrentLocation();
           
            if(gpsLocation) {
                const sortedStations = sortStationsByLocation(stations, gpsLocation);
                this.setState({stations: sortedStations, location: gpsLocation})
            } else {
                this.setState({stations: stations, location: null})
            }

        } catch (error) {
            console.log(error);
            this.setState({errorMsg: error.toString()})
        }
    }

    async getCurrentLocation() {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return false;
        }

        let location = await Location.getCurrentPositionAsync({});
        return location;
        } catch (error) {
            return error;
        }
    };
    
    async getData() {
        try {
            const data = await supabase
            .from('gas_station')
            .select()
        return data
        } catch (error) {
            return error
        }
    }
    

    render() {
        const { navigation } = this.props;
        const { stations, errorMsg } = this.state;
        let list;
        
        if(errorMsg) { list = <Text>{errorMsg}</Text>; }
        else { list = 
        <View>
        <GasStationList stations={stations} />
            <Button 
                onPress={() => navigation.push('addKilometers')} 
                title={'Next: Kilometers'}
                >
            </Button>
        </View>; }
        return (
            <KeyboardAvoidingView styles={styles.container}>
                <Text style={styles.text}>Add Gas Station</Text>
                {list}
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
    }
})