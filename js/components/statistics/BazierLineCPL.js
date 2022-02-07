import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import { Card, Title, Paragraph, Headline, Subheading } from 'react-native-paper';
import {
    LineChart,
    BarChart,
} from "react-native-chart-kit";


const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
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
            <Headline>Price / L over period</Headline>
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
            <Headline>Fueled Liters per fueling</Headline>
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

export default BazierLineCPL;