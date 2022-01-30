import React, { useEffect, useState } from "react";
import { Platform, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";

import * as Location from 'expo-location';

import { supabase } from '../helpers/database';

const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text style={[styles.title, textColor]}>{item.company}</Text>
        <Text>{item.address}</Text>
    </TouchableOpacity>
);

const gasStationList = (props) => {
    const [selectedId, setSelectedId] = useState(null);
    const [stations, setStations] = useState(null);
    const [error, setError] = useState(null);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    // get current geo location to sort list to nearest station
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            console.log(location);

        })();
        
        // sort stations according to geo location
        if(stations) {
                console.log(stations);
        }
    }, [stations]); // run if stations get updated

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }



    // retrieve data from DB
    useEffect(() => { // component did mount
        async function getData() {
            const { data, error } = await supabase
                .from('gas_station')
                .select()
            return { data, error }
        }
        getData().then((response) => {
            if (response.data) {
                setStations(response.data);
                console.log(response.data);
            } else {
                console.log(error);
                setError(response.error.message);
            }
        }).catch(error => {
            console.log(error);
            setError(error.toString());
        });
    }, [])



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
            {!error ? <FlatList
                data={stations}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
            /> : <Text>Error: {error}</Text>}


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
