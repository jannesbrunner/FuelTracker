import React from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Headline, Subheading } from 'react-native-paper';
import {
    LineChart,
    BarChart,
} from "react-native-chart-kit";


const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const chartConfig = {
    backgroundColor: "#00a400",
    backgroundGradientFrom: "#00a400",
    backgroundGradientTo: "#00a400",
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
}

const BazierLineCPL = (props) => {

    const { data } = props;

    const PricePerLiter = () => {
        const costsPerLiter = []
        const dates = []
        data.forEach(fueling => {
            costsPerLiter.push(fueling.price / fueling.volume)
            dates.push(fueling.created_at.substring(0, 10))
        });
        return {
            x: dates,
            y: costsPerLiter
        }
    }

    const FuelVolumePerFueling = () => {
        const volumes = [];
        const dates = [];
        data.forEach(fueling => {
            volumes.push(fueling.volume)
            dates.push(fueling.created_at.substring(0, 10))
        });
        return {
            x: dates,
            y: volumes
        }
    }

    return (
        <View>
            <Headline style={styles.headline}>Price / L over period</Headline>
            <LineChart
                data={{
                    labels: PricePerLiter().x,
                    datasets: [
                        {
                            data: PricePerLiter().y
                        }
                    ]
                }}
                width={window.width} // from react-native
                height={220}
                yAxisLabel=""
                yAxisSuffix=" €/L"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={chartConfig}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
            <Headline style={styles.headline}>Fueled Liters per fueling</Headline>
            <BarChart
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
                data={{
                    labels: FuelVolumePerFueling.x,
                    datasets: [
                        {
                            data: FuelVolumePerFueling().y
                        }
                    ]
                }}
                width={window.width}
                height={220}
                yAxisLabel="L"
                fromZero
                chartConfig={chartConfig}
                verticalLabelRotation={30}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    headline: {
        color: "#00a400",
        marginTop: 20
    },
})

export default BazierLineCPL;