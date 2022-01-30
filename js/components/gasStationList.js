import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";

import { supabase } from '../helpers/database';

const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text style={[styles.title, textColor]}>{item.name}</Text>
        <Text>{item.location}</Text>
    </TouchableOpacity>
);

const gasStationList = (props) => {
    const [selectedId, setSelectedId] = useState(null);
    const [stations, setStations] = useState(null);
    const [error, setError] = useState(null);

    // retrieve data from DB
    useEffect( () => { // component did mount
        async function getData() {
            const { data, error } = await supabase
            .from('gas_station')
            .select()
            return { data, error }
        }
        getData().then( (response) => {
            if(response.data) {
                setStations(response.data);
                console.log(response.data);
            } else {
                console.log(error);
                setError(response.error.message);
            }
        }).catch( error => {
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
