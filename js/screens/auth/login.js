import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Text, TopNav } from 'react-native-rapi-ui';
import { Ionicons } from '@expo/vector-icons';
import { Button, TextInput, HelperText } from 'react-native-paper';

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
            <View style={styles.container}>
                <Layout>
                    <TopNav middleContent="Fuel Tracker 0.1" />
                    <Text style={styles.text}>Login</Text>
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
                            style={{ marginBottom: 100 }}
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

                    <Button
                        onPress={() => alert('Logging you in...')}
                        text="Login"
                        status="primary"
                        style={styles.loginBtn}
                        mode="outlined"
                        color="FFFFFF"
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
                        style={styles.register_button}
                    >
                    </Button>
                </Layout>
            </View>
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
    },
    inputView: {
        borderRadius: 10,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },
    loginBtn: {
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#00a400",
    },
    register_button: {
        height: 30,
        marginTop: 10,
        color: "#808080",
    },
})