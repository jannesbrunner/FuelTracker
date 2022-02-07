import React from 'react';
import { Text, View } from 'react-native';
import { Card, Title, Paragraph, Headline, Subheading } from 'react-native-paper';

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
        <View>
            <Headline>Basic</Headline>
            <Subheading>Data from: {getTimeFrame(data).from} to: {getTimeFrame(data).to}</Subheading>
            <Card>
                <Card.Content>
                    <Title>Driven total</Title>
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

export default BasicTextStatistics;