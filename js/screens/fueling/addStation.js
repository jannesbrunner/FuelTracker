import React, { Component } from 'react';
import {
    Platform,
    View,
    ActivityIndicator,
    KeyboardAvoidingView,
    StyleSheet,
    Pressable,
} from 'react-native';

import { Text, TextInput, HelperText } from 'react-native-paper';

import * as Location from 'expo-location';
import StyledButton from '../../components/StyledButton'

import Toast from 'react-native-toast-message';

import { supabase } from '../../helpers/database';
import { sortStationsByLocation } from "../../helpers/snippets";

import GasStationList from '../../components/GasStationList';
import CreateGasStation from '../../components/CreateGasStation';

export default class AddStation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStation: null,
            stations: null,
            location: "",
            gpsLocation: null,
            errorMsg: null,
            isLoading: true,
            modalVisible: false,
        }
        this.selectedStation = this.selectedStation.bind(this);
        this.goToKilometers = this.goToKilometers.bind(this);
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
        this.init();
    }

    componentDidMount() {
        // get stations from db, then get user location, then sort stations by location
        this.init();
        Toast.show({
            type: 'info',
            text1: 'Patience please',
            text2: 'We retrieve your favorite gas stations...'
          });
        
    }

    async init() {
        try {
            const { body, error, status } = await this.getData();
            if (error) {
                throw new Error(`${error.message} - ${status}`)
            }
            const stations = body;
            console.log(stations);
            const gpsLocation = await this.getCurrentLocation();

            if (gpsLocation) {
                const sortedStations = sortStationsByLocation(stations, gpsLocation);
                if (Platform.OS !== "web") { // web needs Google API Key, too expensive...
                    const rgc = await Location.reverseGeocodeAsync({
                        latitude: parseFloat(gpsLocation.coords.latitude),
                        longitude: parseFloat(gpsLocation.coords.longitude)
                    });
                    const location = `${rgc[0].street} ${rgc[0].streetNumber} - ${rgc[0].postalCode} - (${rgc[0].district}) ${rgc[0].region}`;
                    console.log(rgc);
                    this.setState({ stations: sortedStations, location, isLoading: false, gpsLocation })
                } else {
                    const location = `Lat: ${gpsLocation.coords.latitude} Long: ${gpsLocation.coords.longitude}`;
                    this.setState({ stations: sortedStations, location, isLoading: false, gpsLocation })
                }
            } else {
                this.setState({ stations: stations, location: null, isLoading: false })
            }

        } catch (error) {
            console.log(error);
            this.setState({ errorMsg: error.toString(), isLoading: false })
            Toast.show({
                type: 'error',
                text1: 'Oh no...',
                text2: 'Could not retrieve stations: ' + error.toString()
              });
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

    selectedStation(itemId) {
        let selectedStation = this.state.stations.find((item) => {
            return item.id === itemId;
        })
        this.setState({ selectedStation });
    }

    goToKilometers() {
        const { navigation } = this.props;
        navigation.push('addKilometers', { location: this.state.selectedStation })
    }

    render() {
        const { stations, errorMsg, isLoading, location, modalVisible, gpsLocation, selectedStation } = this.state;
        let list;
        if (isLoading) { list = <ActivityIndicator size="large" /> }
        else {
            if (errorMsg) { list = <Text>{errorMsg}</Text>; }
            else {
                list =
                    <View style={styles.container}>
                        <Text style={styles.text}>Add Gas Station</Text>
                        <CreateGasStation
                            modalVisible={modalVisible}
                            closeCallBack={this.setModalVisible}
                            initialAddress={location.startsWith("Lat:") ? "" : location}
                            initialLat={gpsLocation.coords.latitude}
                            initialLong={gpsLocation.coords.longitude}
                        />
                        {location ? <Text>Your location: {location}</Text> :
                            <Text>Could not locate you! Sorry!</Text>}
                        <GasStationList stations={stations}
                            passSelectedId={this.selectedStation} />
                        <Pressable
                            style={[styles.button, styles.buttonOpen]}
                            onPress={() => this.setModalVisible(true)}
                        >
                            <Text style={styles.textStyle}>Add Station</Text>
                        </Pressable>
                        <StyledButton
                            onPress={() => this.goToKilometers()}
                            title={'Next: Kilometers'}
                            disabled={!selectedStation}
                        >
                        </StyledButton>
                    </View>;
            }
        }
        return (
            <KeyboardAvoidingView styles={styles.container}>

                {list}
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'sans-serif',
        flex: 1
    },
    text: {
        fontSize: 40,
        marginBottom: 15,
        marginTop: 10
    },
    textStyle: {
        marginBottom: 5,
        marginTop: 30,
        color: "#00a400",
    }
})