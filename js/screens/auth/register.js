import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Text, TextInput, HelperText } from 'react-native-paper';
import StyledButton from '../../components/StyledButton'
import DateTimePicker from '@react-native-community/datetimepicker';


export default class RegisterScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            userEmail: '',
            userPassword: '',
            userPasswordConfirm: '',
            userDateOfBirth: new Date(),
            userGender: '',

            visiblePasswordRepeat: true,
            visiblePassword: true,
        }

        const genders = [
            { label: 'male', value: 'male' },
            { label: 'female', value: 'female' },
            { label: 'other', value: 'other' },
        ];
    }



    render() {
        const { navigation } = this.props
        const { userName,
            userEmail,
            userPassword,
            userPasswordConfirm,
            userDateOfBirth,
            userGender } = this.state
        return (
            //<TopNav middleContent="Fuel Tracker 0.1" />
            //<Text style={styles.text}>Register</Text>
            <View style={styles.container}>
                <View style={styles.inputView}>
                    <TextInput
                        autoCapitalize="none"
                        style={styles.TextInput}
                        mode="outlined"
                        activeOutlineColor="#D98302"
                        placeholder="Enter your Username"
                        value={userName}
                        onChangeText={(val) => this.setState({ userName: val })}
                        left={
                            <TextInput.Icon name="username" />
                        }
                    />
                </View>
                <View style={styles.inputView}>

                    <TextInput
                        style={styles.TextInput}
                        autoCapitalize="none"
                        placeholder="Enter your eMail"
                        value={userEmail}
                        mode="outlined"
                        activeOutlineColor="#D98302"
                        onChangeText={(val) => null}
                        left={
                            <TextInput.Icon name="mail" />
                        }
                    />
                </View>

                <View style={styles.inputView}>

                    <TextInput
                        style={{ marginBottom: 100 }}
                        style={styles.TextInput}
                        autoCapitalize="none"
                        placeholder="Enter your password"
                        secureTextEntry={true}
                        value={userPassword}
                        style={styles.TextInput}
                        mode="outlined"
                        secureTextEntry={this.state.visiblePassword}
                        activeOutlineColor="#D98302"
                        onChangeText={(val) => null}
                        right={
                            <TextInput.Icon
                                name="eye"
                                onPress={() => {
                                    this.setState({ visiblePassword: !(this.state.visiblePassword) });
                                }}
                            />
                        }
                        left={
                            <TextInput.Icon
                                name="lock" />
                        }
                    />
                </View>

                <View style={styles.inputView}>

                    <TextInput
                        style={{ marginBottom: 100 }}
                        style={styles.TextInput}
                        autoCapitalize="none"
                        placeholder="Confirm your password"
                        secureTextEntry={true}
                        value={userPasswordConfirm}
                        style={styles.TextInput}
                        mode="outlined"
                        activeOutlineColor="#D98302"
                        secureTextEntry={this.state.visiblePasswordRepeat}
                        onChangeText={(val) => null}
                        right={
                            <TextInput.Icon
                                name="eye"
                                onPress={() => {
                                    this.setState({ visiblePasswordRepeat: !(this.state.visiblePasswordRepeat) });
                                }}
                            />
                        }
                        left={
                            <TextInput.Icon
                                name="lock" />
                        }
                    />
                </View>

                <Text>Enter your Birthday</Text>
                <DateTimePicker
                    testID="dateTimePicker"
                    value={userDateOfBirth}
                    maximumDate={new Date()}
                    mode={'date'}
                    locale="de-DE"
                    display="default"
                />


                <Button
                    onPress={() => alert('Register you in...')}
                    status="primary"
                    style={styles.registerBtn}
                    color="#00a400"
                > SIGN UP
                </Button>

                <Button
                    onPress={() => navigation.goBack()}
                    style={styles.goBackBtn}
                    status="danger"
                    color="#00a400"
                > BACK TO LOGIN
                </Button>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'sans-serif',
    },
    text: {
        fontSize: 50,
    },

    registerBtn: {
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: "#b3b3b3",
    },
    goBackBtn: {
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: "#b8b8b8",
    },
    inputView: {
        width: "100%",
        alignItems: "center",
        justifyContent: 'center',
        paddingTop: 30,
    },

})