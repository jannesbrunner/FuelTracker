import React, { Component } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

import { padding } from '../helpers/snippets';

const data = {
    labels: ["Sep 21", "Oct 21", "Nov 21", "Dec 21", "Jan 22", "Feb 22"],
    datasets: [
        {
            data: [
                87.2,
                91.3,
                85.2,
                88.3,
                100.2,
                97.2
            ]
        }
    ]

}

const pie = [
    {
    name: "Spring 21",
    distance: 2365,
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
},
    {
        name: "Summer 21",
    distance: 4873,
    color: "black",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
},
    {
        name: "Fall 21",
    distance: 3865,
    color: "red",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
},
    {
        name: "Winter 21",
        distance: 4353,
    population: 4323,
    color: "green",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
},
    ];

export default function StatisticsScreen() {

    const { height, width } = useWindowDimensions();
    return (
        <View styles={styles.container}>
            <Text style={styles.text}>Statistic Screen</Text>
            <Text>Fuel consumption over time</Text>
            <LineChart
                data={data}
                width={width} // from react-native
                height={220}
                yAxisLabel="V:"
                yAxisSuffix="L"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "green",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "green",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
            <Text>Year 2021 in review: Distances</Text>
            { <PieChart
                data={pie}
                width={width}
                height={220}
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    
                  }}
                accessor={"distance"}
                backgroundColor={"transparent"}
                paddingLeft={"1"}
                center={[5, 50]}
            />}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 50,
    }
})