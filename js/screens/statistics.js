import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator } from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

import { padding } from '../helpers/snippets';
import { supabase } from '../helpers/database';
import { isLoading } from 'expo-font';

import BasicTextStatistics from '../components/statistics/BasicTextStatistic';
import BazierLineCPL from '../components/statistics/BazierLineCPL';

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export default class StatisticsScreen extends Component {
    state = {
        dimensions: {
          window,
          screen
        },
        records: null,
        isLoading: true,
        error: null
      };

    componentDidMount() {
        this.fetchData();
    }  

    // get fuel records from db
    fetchData = async () => {
        try {
            const { data, error } = await supabase
            .from('refueling')
            .select('*, gas_station( company, address ), car(car_name)')
            .order('created_at', { ascending: false })
            if(error) {
                throw new Error(error)
            } else {
                console.log(data)
                this.setState({records: data, isLoading: false})
            }
        } catch (error) {
            console.log(error);
            this.setState({error: error.toString()})
        }
    }

    statistics = () => {
        const { isLoading, error, records} = this.state
        if(error) return <Text>{error}</Text>
        if(!isLoading && !error) {
            return(
                <View>
                    <BasicTextStatistics 
                    data={records}
                    />
                    <BazierLineCPL data={records} />
                </View>
            )
        } 
    }

    render() {
        const { dimensions: { window, screen, isLoading } } = this.state;
        return (
            <View styles={styles.container}>
                <Text style={styles.text}>Statistic Screen</Text>
                {isLoading ? <ActivityIndicator size="large" /> : this.statistics()}
            </View>
        );
    }


}


const styles = StyleSheet.create({
    container: {
       flex: 1,
       width: screen.width * 0.8,
       paddingLeft: screen.width * 0.2,
       maxWidth: screen.width * 0.8,
       marginVertical: 20,
    },
    text: {
        fontSize: 50,
    }
})