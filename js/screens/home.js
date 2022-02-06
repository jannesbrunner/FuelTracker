import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StyledButton from '../components/StyledButton'

import GasPrices from '../components/GasPrices';

//style To Do: gesamter Bildschirm Hintergrund weiß


export default class HomeScreen extends Component {

    state = {
        showGasPrices: false
    }

    togglePrices = () => {
        this.setState({showGasPrices: !this.state.showGasPrices})
    }

    render() {
        return (
            <View styles={styles.container}>
                <View style={styles.inputView}>
                    <SafeAreaView>

                        <StyledButton
                            title="Track Fuel"
                            onPress={() => this.props.navigation.navigate('TrackFuelScreen')}
                        />
                        <StyledButton
                            title="Manage Fuel Processes"
                            onPress={() => this.props.navigation.navigate('ManageFuelsScreen')}
                        />
                        <StyledButton
                            title="Show Statistics"
                            onPress={() => this.props.navigation.navigate('StatisticsScreen')}
                        />
                        <StyledButton
                            title="App Settings"
                            onPress={() => this.props.navigation.navigate('SettingsScreen')}
                        />
                         <StyledButton
                            title="Show Gas Prices"
                            onPress={() => this.togglePrices()}
                        />
                        <GasPrices 
                            closeCallBack={this.togglePrices}
                            modalVisible={this.state.showGasPrices}
                        />
                    </SafeAreaView>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'sans-serif',
    },

    inputView: {
        width: "100%",
        alignItems: "center",
        justifyContent: 'center',
        paddingTop: 30,

    },


})