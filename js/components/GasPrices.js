import React, { Component } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, ActivityIndicator } from "react-native";
import Toast from 'react-native-toast-message';
import { Avatar, Card, IconButton } from 'react-native-paper';
import axios from "axios";
import * as Location from 'expo-location';

const API_URL = 'https://creativecommons.tankerkoenig.de/json/';

import db_creds from "../helpers/db_creds";



class GasPrices extends Component {

  state = {
    isLoading: true,
    userLatitude: null,
    userLongitude: null,
    stations: null,
    prices: {
      diesel: {
        min: 0,
        max: 0,
      },
      e5: {
        min: 0,
        max: 0,
      },
      e10: {
        min: 0,
        max: 0
      }
    },
  };

  constructor(props) {
    super(props);
    this.getLocation = this.getLocation.bind(this);
    this.fetchPrices = this.fetchPrices.bind(this);
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    this.init = this.init.bind(this);
    this.createPrices = this.createPrices.bind(this);
  }

  init = async () => {
    await this.getLocation();
    await this.fetchPrices();
  }

  getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return false;
      }

      let location = await Location.getCurrentPositionAsync({});
      return location;
    } catch (error) {
      return error;
    }
  };

  getLocation = async () => {
    try {
      Toast.show({
        type: 'info',
        text1: 'Where are you?',
        text2: `We try to locate you`
      });
      const gpsLocation = await this.getCurrentLocation();
      this.setState({
        userLatitude: gpsLocation.coords.latitude,
        userLongitude: gpsLocation.coords.longitude
      })
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        text2: `We could not locate you...${error}`
      });
      console.log(error);
    }
  }

  createPrices() {
    let { prices, stations } = this.state;

    stations.forEach((station) => {
      if (station.diesel > prices.diesel.max) prices.diesel.max = station.diesel;
      if (station.diesel < prices.diesel.min || prices.diesel.min == 0) prices.diesel.min = station.diesel;
      if (station.e5 > prices.e5.max) prices.e5.max = station.e5;
      if (station.e5 < prices.e5.min || prices.e5.min == 0) prices.e5.min = station.e5;
      if (station.e10 > prices.e10.max) prices.e10.max = station.e10;
      if (station.e10 < prices.e10.min || prices.e10.min == 0) prices.e10.min = station.e10;
    });
    this.setState({
      prices
    })

  }

  fetchPrices = async () => {
    if (!this.state.userLatitude || !this.state.userLongitude) {
      this.setState({ isLoading: false })
      return
    }
    const FETCH_ENDPOINT = `${API_URL}list.php?lat=${this.state.userLatitude}&lng=${this.state.userLongitude}8&rad=1.5&sort=dist&type=all&apikey=${db_creds.tankerKoenigKey}`
    try {
      const { data } = await axios.get(FETCH_ENDPOINT);
      console.log(data);
      this.setState({
        stations: data.stations
      });

      this.createPrices();

    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message) // error from server
        Toast.show({
          type: 'error',
          text1: 'Oh no...',
          text2: error.response.data.message
        });
      }
      else {
        console.log("Error Occured. Please try Again.!")
        Toast.show({
          type: 'error',
          text1: 'Oh no...',
          text2: "Error Occured. Please try Again.!"
        });
      }
    }
    finally {
      this.setState({ isLoading: false });
    }
  }


  render() {
    const { isLoading, prices } = this.state;
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          onShow={() => this.init()}
          transparent={true}
          visible={this.props.modalVisible}
          onRequestClose={() => {
            this.props.closeCallBack(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {isLoading ? <ActivityIndicator size="large" /> : <View>
                <Text style={styles.modalText}>Current Prices near by your location</Text>
                <Card.Title
                  title="Diesel"
                  subtitle={`Min: ${prices.diesel.min} | Max: ${prices.diesel.max} `}
                />
                 <Card.Title
                  title="E5"
                  subtitle={`Min: ${prices.e5.min} | Max: ${prices.e5.max} `}
                />
                 <Card.Title
                  title="E10"
                  subtitle={`Min: ${prices.e10.min} | Max: ${prices.e10.max} `}
                />
              </View>}
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.props.closeCallBack()}
              >
                <Text style={styles.textStyle}>OK</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default GasPrices;