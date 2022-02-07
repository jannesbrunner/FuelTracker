import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Headline, Subheading } from 'react-native-paper';
import { inlineStyles } from 'react-native-svg';

import { 
    getTimeFrame, 
    getTotalKM, 
    getAvgConsumption,
    getAvgCostsPerKm,
    getAvgCostsPerLiter,
} from '../../helpers/statHelpers';

const BasicTextStatistics = (props) => {

    const { data } = props;

    return (
        <View  styles={styles.container}>
            <Headline style={styles.headline}>Basic</Headline>
            <Subheading>Data from: {getTimeFrame(data).from} to: {getTimeFrame(data).to}</Subheading>
            <Card>
                <Card.Content>
                    <Title >Driven total</Title>
                    <Paragraph>{getTotalKM(data)} km</Paragraph>
                </Card.Content>
            </Card>
            <Card>
                <Card.Content>
                    <Title>Average consumption (100km)</Title>
                    <Paragraph>{getAvgConsumption(data).km100} L</Paragraph>
                </Card.Content>
            </Card>
            <Card>
                <Card.Content>
                    <Title>Average costs (100km)</Title>
                    <Paragraph>{getAvgCostsPerKm(data).euro100} €</Paragraph>
                </Card.Content>
            </Card>
            <Card>
                <Card.Content>
                    <Title>Average costs per Liter</Title>
                    <Paragraph>Max: {getAvgCostsPerLiter(data).max} €</Paragraph>
                    <Paragraph>Min: {getAvgCostsPerLiter(data).min} €</Paragraph>
                    <Paragraph>Avg: {getAvgCostsPerLiter(data).avg} €</Paragraph>
                    <Paragraph>Median: {getAvgCostsPerLiter(data).median} €</Paragraph>
                </Card.Content>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    headline: {
        color: "#00a400",
        marginTop: 20
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
     },
})

export default BasicTextStatistics;