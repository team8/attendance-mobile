import React from "react";
import ModalDropdown from 'react-native-modal-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
    AsyncStorage,
    Modal,
    View,
    Text,
    StyleSheet,
    Button,
    TextInput,
} from "react-native";
import NavigationService from '../NavigationService.js';



var url = "https://civil-charmer-256720.appspot.com/"
class LoginScreen extends React.Component {
// remembering the values
    static navigationOptions = {
        title: 'Sign Up'
    }
    constructor(props) {
        super(props);
        this.state = {
            token: '', first: '', last: '', email: '', subteam: '', password: '', confirmPassword: '', modalVisible: false,
        }
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }
    // login method
    login = () => {
        var signinData = {
            "id": this.state.token,
            "password": this.state.password
        }
        fetch(`${url}signin/`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(signinData)
        }).then(function (response) {
            var res = response._bodyText;
            if(res == "User does not exist." || res == "Incorrect password.") {
                alert(res);
            } else {
                var loginData = JSON.parse(res)
                for(var property in loginData) {
                    if (property != "password") {
                        AsyncStorage.setItem(property, loginData[property])
                    }
                }
                // this.setModalVisible(false);
                NavigationService.navigate('Home');
            }
        });

    }
    //signup method
    signUp = () => {
        const { token, first, last, email, subteam, password, confirmPassword } = this.state;
        if (password != confirmPassword) {
            alert("Passwords do not match")
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            alert("Invalid email")
        } else {
            if (token != '' && first != '' && last != '' && email != '' && subteam != '' && password != '' && confirmPassword != '') {
                var data = {
                    "id": this.state.token,
                    "first": this.state.first,
                    "last": this.state.last,
                    "email": this.state.email,
                    "subteam": this.state.subteam,
                    "password": this.state.password
                }
                fetch(`${url}signup/`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                }).then(function (response) {
                    if (response._bodyText == "false") {
                        alert("User already exists.")
                    } else {
                        for (var property in data) {
                            // AsyncStorage.getItem(property).then((value) => {
                            //     alert(value);
                            // })
                            if (property != "password"  ) {
                                AsyncStorage.setItem(property, data[property])
                            }
                        }
                        this.setModalVisible(false);
                        this.props.navigation.navigate('Home')
            
                    }
                });
            } else {
                alert("Please fill in all the fields")
            }
        }

    }

    render() {
        return (
            <KeyboardAwareScrollView style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}>
                    <View style={styles.container, { marginTop: 25, marginHorizontal: 20 }}>
                        <View style={styles.row}>
                            <View style={styles.label}>
                                <Text style={styles.labelText}>Student ID</Text>
                            </View>
                            <View style={styles.input}>
                                <TextInput onChangeText={(text) => this.setState({ token: text })} style={styles.inputText}></TextInput>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.label}>
                                <Text style={styles.labelText}>Password</Text>
                            </View>
                            <View style={styles.input}>
                                <TextInput secureTextEntry={true} style={styles.inputText} onChangeText={(text) => this.setState({ password: text })}></TextInput>
                            </View>
                        </View>
                        <Button title="Login"
                            onPress={() => {
                                this.login()
                            }} />


                        <Button title="Cancel"
                            onPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                            }} />
                    </View>
                </Modal>

                <View style={styles.row}>
                    <View style={styles.label}>
                        <Text style={styles.labelText}>Student ID</Text>
                    </View>
                    <View style={styles.input}>
                        <TextInput onChangeText={(text) => this.setState({ token: text })} style={styles.inputText}></TextInput>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.label}>
                        <Text style={styles.labelText}>First Name</Text>
                    </View>
                    <View style={styles.input}>
                        <TextInput onChangeText={(text) => this.setState({ first: text })} style={styles.inputText}></TextInput>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.label}>
                        <Text style={styles.labelText}>Last Name</Text>
                    </View>
                    <View style={styles.input}>
                        <TextInput onChangeText={(text) => this.setState({ last: text })} style={styles.inputText}></TextInput>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.label}>
                        <Text style={styles.labelText}>Email</Text>
                    </View>
                    <View style={styles.input}>
                        <TextInput onChangeText={(text) => this.setState({ email: text })} style={styles.inputText}></TextInput>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.label}>
                        <Text style={styles.labelText}>Subteam</Text>
                    </View>
                    <View style={styles.input}>
                        <ModalDropdown
                            style={{ marginLeft: 30, borderColor: "#03572C", borderBottomWidth: 3 }}
                            textStyle={{ fontSize: 20 }} dropdownTextStyle={{ fontSize: 20 }}
                            dropdownStyle={{ width: 175, alignItems: 'center' }}
                            options={['Art', 'Build', 'Business', 'Design', 'Software', 'Strategy & Scouting', 'Other']}
                            onSelect={(idx, value) => this.setState({ subteam: value })} />
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.label}>
                        <Text style={styles.labelText}>Password</Text>
                    </View>
                    <View style={styles.input}>
                        <TextInput secureTextEntry={true} style={styles.inputText} onChangeText={(text) => this.setState({ password: text })}></TextInput>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.label}>
                        <Text style={styles.labelText}>Confirm Password</Text>
                    </View>
                    <View style={styles.input}>
                        <TextInput secureTextEntry={true} style={styles.inputText} onChangeText={(text) => this.setState({ confirmPassword: text })}></TextInput>
                    </View>
                </View>
                <Button title="Sign Up"
                    onPress={() => this.signUp()} />
                <Button title="Already have an account?"
                    onPress={() => this.setModalVisible(true)} />
            </KeyboardAwareScrollView>
        );
    }


}
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,

    },
    row: {
        flexDirection: "row",
        paddingVertical: 20
    },
    label: {
        flex: 0.3
    },
    input: {
        flex: 0.7,


    },
    labelText: {
        fontSize: 20
    },
    inputText: {
        marginLeft: 30,
        fontSize: 20,
        borderColor: "#03572C",
        borderBottomWidth: 3
    }
});

