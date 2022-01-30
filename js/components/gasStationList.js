import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";

import * as Location from 'expo-location';

import { supabase } from '../helpers/database';
import { sortStationsByLocation } from "../helpers/snippets";

const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text style={[styles.title, textColor]}>{item.company}</Text>
        <Text>{item.address}</Text>
    </TouchableOpacity>
);

const gasStationList = (props) => {
    const [selectedId, setSelectedId] = useState(null);
    const [stations, setStations] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [location, setLocation] = useState(null);

    // get stations from db, then get user location, then sort stations by locations
    useEffect(() => {
        (async () => {
            try {
                const { body, error, status } = await getData();
                if(error) {
                    throw new Error(`${error.message} - ${status}`)
                }
                const stations = body;
                console.log(stations);
                const gpsLocation = await getCurrentLocation();
               
                if(gpsLocation) {
                    const sortedStations = sortStationsByLocation(stations, gpsLocation);
                    setStations(sortedStations);
                    setLocation(gpsLocation);
                } else {
                    setStations(stations);
                }

            } catch (error) {
                console.log(error);
                setErrorMsg(error.toString());
            }
        })();
    }, []); // run like componentDidMount

    async function getCurrentLocation() {
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
    
    async function getData() {
        try {
            const data = await supabase
            .from('gas_station')
            .select()
        return data
        } catch (error) {
            return error
        }
    }

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "blue" : "grey";
        const color = item.id === selectedId ? 'white' : 'black';

        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {!errorMsg ? <FlatList
                data={stations}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
            /> : <Text>{errorMsg}</Text>}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
    },
    item: {
        padding: 5,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 22,
    },
});

export default gasStationList;  
