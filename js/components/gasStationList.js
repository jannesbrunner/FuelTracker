import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";



const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text style={[styles.title, textColor]}>{item.company}</Text>
        <Text style={[styles.text]}>{item.address}</Text>
    </TouchableOpacity>
);

const gasStationList = (props) => {
    const [selectedId, setSelectedId] = useState(null);  
    const { passSelectedId } = props;      

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#00a400" : "#b3b3b3";
        const color = item.id === selectedId ? "#b3b3b3" : "#00a400";

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
        paddingTop: 5,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        marginVertical: 10,
        borderRadius: 10,
        width: "100%",
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        marginBottom: 10
    },
});

export default gasStationList;  
