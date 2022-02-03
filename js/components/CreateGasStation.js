import React, { Component } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

import { TextInput } from 'react-native-paper';

import { supabase } from '../helpers/database';




class CreateGasStation extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        address: this.props.initialAddress,
        company: "",
        lat: this.props.initialLat,
        long: this.props.initialLong
    }

    async createNewStation() {
        try {
            let response = await supabase
                .from('gas_station')
                .insert([
                    { 
                        user_id: 1,
                        company: this.state.company,
                        address: this.state.address,
                        long: this.state.long,
                        lat: this.state.lat
                     }
                ])
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    inputCheck() {
        const { company, address, long, lat} = this.state;
        if(company.length < 3 || address.length < 5 || long.length < 5 || lat.length <5 ) {
            return false
        }
        return true
    }

    render() {
        const { modalVisible, closeCallBack, initialAddress, initialLat, initialLong } = this.props;
        return (
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        closeCallBack(false);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Create a new Gas Station</Text>
                            <TextInput
                                label="Address"
                                value={this.state.address}
                                onChangeText={text => this.setState({ address: text })}
                            />
                            <TextInput
                                label="Company"
                                value={this.state.company}
                                placeholder=""
                                onChangeText={text => this.setState({ company: text })}
                            />
                            <TextInput
                                label="Lat"
                                value={this.state.lat}
                                placeholder={initialLat}
                                onChangeText={text => this.setState({ lat: text })}
                            />
                            <TextInput
                                label="Long"
                                value={this.state.long}
                                placeholder={initialLong}
                                onChangeText={text => this.setState({ long: text })}
                            />


                            <Pressable
                                style={[styles.button, styles.buttonOpen]}
                                onPress={() => {
                                    if(this.inputCheck) {
                                        this.createNewStation().then( (data) => {
                                            alert(`OK! => ${data}`);
                                            console.log(data);
                                            closeCallBack(false);
                                        }).catch( (error) => {
                                            console.log(error);
                                            alert(`Error! => ${error}`)
                                        })
                                    }
                                }}
                            >
                                <Text style={styles.textStyle}>Create Station</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => closeCallBack(false)}
                            >
                                <Text style={styles.textStyle}>Abort</Text>
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
        margin: 10,
        backgroundColor: "white",
        borderRadius: 10,
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

export default CreateGasStation;