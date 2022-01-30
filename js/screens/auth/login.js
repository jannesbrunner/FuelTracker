import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Layout, Text, TopNav } from 'react-native-rapi-ui';
import { Ionicons } from '@expo/vector-icons';
import { Button, TextInput, HelperText } from 'react-native-paper';
import StyledButton from '../../components/StyledButton'

export default class LoginScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userEmail: '',
            userPassword: '',

            visible: true,

            falsePasswordOrUser: false //to be implemented
        }
    }

    render() {
        const { navigation } = this.props
        const { userEmail, userPassword } = this.state
        return (
            //Logo noch einfügen
            //<Text style={styles.text}>Login</Text>
            <View style={styles.container}>
                <View style={styles.inputView}>
                    <TextInput
                        autoCapitalize="none"
                        placeholder="Enter your eMail"
                        value={userEmail}
                        mode="outlined"
                        activeOutlineColor="#00a400"
                        onChangeText={(val) => this.setState({ userEmail: val })}
                        leftContent={
                            <Ionicons name="mail" size={20} color={'grey'} />
                        }
                        error={this.state.falsePasswordOrUser}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        autoCapitalize="none"
                        placeholder="Enter your password"
                        secureTextEntry={this.state.visible}
                        value={userPassword}
                        mode="outlined"
                        activeOutlineColor="#00a400"
                        onChangeText={(val) => this.setState({ userPassword: val })}
                        leftContent={
                            <Ionicons name="lock-closed" size={20} color={'grey'} />
                        }
                        right={
                            <TextInput.Icon
                                name="eye"
                                onPress={() => {
                                    this.setState({ visible: !(this.state.visible) });
                                }}
                            />
                        }
                        error={this.state.falsePasswordOrUser}
                    />
                </View>
                <HelperText type="error" visible={this.state.falsePasswordOrUser}>
                    E-Mail-Adresse oder Passwort ist falsch
                </HelperText>
                <TouchableOpacity>
                    <Text style={styles.register_button} /*onPress={() => this.props.navigation.navigate("Registrieren")}*/>Register</Text>
                </TouchableOpacity>
                <Button
                    onPress={() => {alert('Logging you in...'), this.props.navigation.navigate('HomeScreen')}}
                    style = {styles.loginBtn}
                > LOGIN </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'sans-serif',
    },
    text: {
        fontSize: 10,
    },
    inputView: {
        flex: 1,    
        width: "100%",
        height: 20,
        alignItems: "center",
        justifyContent: 'center',
        paddingTop: 0,
    },

    register_button: {
        height: 30,
        color: "#b3b3b3",
        marginTop: 0,
    },

    loginBtn:   {
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: "#b3b3b3",
    }
})