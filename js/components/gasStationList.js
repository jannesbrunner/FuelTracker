import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";



const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text style={[styles.title, textColor]}>{item.company}</Text>
        <Text>{item.address}</Text>
    </TouchableOpacity>
);

const gasStationList = (props) => {
    const [selectedId, setSelectedId] = useState(null);  
    const { passSelectedId } = props;      

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "blue" : "grey";
        const color = item.id === selectedId ? 'white' : 'black';

        return (
            <Item
                item={item}
                onPress={() => { 
                    setSelectedId(item.id);
                    passSelectedId(item.id); 
                }}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
          <FlatList
                data={props.stations}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
           />
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
