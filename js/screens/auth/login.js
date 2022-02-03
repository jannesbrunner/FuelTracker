import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, TextInput, HelperText, Text } from 'react-native-paper';
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
                        style={styles.inputStyle}
                        autoCapitalize="none"
                        placeholder="Enter your eMail"
                        value={userEmail}
                        mode="outlined"
                        width="50%"
                        activeOutlineColor="#00a400"
                        onChangeText={(val) => this.setState({ userEmail: val })}
                        left={
                            <TextInput.Icon name="mail" />
                        }
                        error={this.state.falsePasswordOrUser}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputStyle}
                        autoCapitalize="none"
                        placeholder="Enter your password"
                        secureTextEntry={this.state.visible}
                        value={userPassword}
                        mode="outlined"
                        activeOutlineColor="#00a400"
                        onChangeText={(val) => this.setState({ userPassword: val })}
                        left={
                            <TextInput.Icon name="lock" />
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
                    <Text style={styles.register_button} onPress={() => this.props.navigation.navigate("RegisterScreen")}>Register</Text>
                </TouchableOpacity>

                <StyledButton
                    title="LOGIN"
                    onPress={() => this.onLogin, this.props.navigation.navigate('HomeScreen')}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'sans-serif',
    },
    text: {
        fontSize: 10,
    },
    inputView: {
        height: "100%",
        width: "100%",
        height: 20,
        alignItems: "center",
        justifyContent: 'center',
        paddingTop: 0,
    },

    inputStyle: {
        
    },

    register_button: {
        height: 30,
        color: "#00a400",
        marginTop: 20,
        marginBottom: 10
    },

    loginBtn: {
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: "#b3b3b3",
        uppercase: true,
        fontWeight: 'bold'
    }
})