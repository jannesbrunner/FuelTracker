import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Text, TopNav, Button, TextInput } from 'react-native-rapi-ui';
import { Ionicons } from '@expo/vector-icons';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userEmail: '',
            userPassword: '',
        }
    }

    render() {
        const { navigation } = this.props
        const { userEmail, userPassword } = this.state
        return (
            <Layout>
                <TopNav middleContent="Fuel Tracker 0.1" />
                <Text style={styles.text}>Login</Text>
                <TextInput
                    
                    autoCapitalize="none"
                    placeholder="Enter your eMail"
                    value={userEmail}
                    onChangeText={(val) => this.setState({userEmail: val})}
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
                    onChangeText={(val) => this.setState({userPassword})}
                    leftContent={
                        <Ionicons name="lock-closed" size={20} color={'grey'} />
                    }
                />
                <Button
                    onPress={() => alert('Logging you in...')}
                    text="Login"
                    status="primary"
                >
                </Button>
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                    }}
                />
                <Button
                    onPress={() => navigation.push('register')}
                    text={'Register'}
                    status="info"
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