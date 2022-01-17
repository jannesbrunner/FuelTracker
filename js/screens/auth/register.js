import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Text, TopNav, Button, TextInput, Picker, Section, SectionContent } from 'react-native-rapi-ui';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';


export default class RegisterScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            userEmail: '',
            userPassword: '',
            userPasswordConfirm: '',
            userDateOfBirth: new Date(),
            userGender: ''
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
            <Layout>
                <TopNav middleContent="Fuel Tracker 0.1" />
                <Text style={styles.text}>Register</Text>
                <TextInput
                    autoCapitalize="none"
                    placeholder="Enter your Username"
                    value={userName}
                    onChangeText={(val) => this.setState({ userName: val })}
                    leftContent={
                        <Ionicons name="mail" size={20} color={'grey'} />
                    }
                />
                <TextInput

                    autoCapitalize="none"
                    placeholder="Enter your eMail"
                    value={userEmail}
                    onChangeText={(val) => null}
                    leftContent={
                        <Ionicons name="mail" size={20} color={'grey'} />
                    }
                />
                <TextInput
                    style={{ marginBottom: 100 }}
                    autoCapitalize="none"
                    placeholder="Enter your password"
                    secureTextEntry={true}
                    value={userPassword}
                    onChangeText={(val) => null}
                    leftContent={
                        <Ionicons name="lock-closed" size={20} color={'grey'} />
                    }
                />
                <TextInput
                    style={{ marginBottom: 100 }}
                    autoCapitalize="none"
                    placeholder="Confirm your password"
                    secureTextEntry={true}
                    value={userPasswordConfirm}
                    onChangeText={(val) => null}
                    leftContent={
                        <Ionicons name="lock-closed" size={20} color={'grey'} />
                    }
                />
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
                    text="Sign up"
                    status="primary"
                >
                </Button>

                <Button
                    onPress={() => navigation.goBack()}
                    text="Back to login"
                    status="danger"
                >
                </Button>
            </Layout>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 50,
    }
})