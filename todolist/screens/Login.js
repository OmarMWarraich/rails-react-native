import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Login = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = () => {
        const user = {
            email: email,
            password: password,
        };

        axios
            .post('http://localhost:3000/sessions', { user }, { withCredentials: true })
            .then((response) => {
                if (response.data.logged_in) {
                    // Handle successful registration
                    // props.handleLogin(response.data);
                    // redirect();
                    setEmail('');
                    setPassword('');
                    navigation.navigate('TodoList');
                    window.location.reload();

                } else {
                    navigation.navigate('Registration');
                    setErrors(response.data.errors);
                }
            })
            .catch((error) => console.log('api errors:', error));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                />
                <Button title="Submit" onPress={handleSubmit} />
                <View style={{ marginTop: 10 }}>
                    <Button title="Registration" onPress={() => navigation.navigate('Registration')} />
                </View>
            </View>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems:'center',
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
    },
    form: {
        marginHorizontal: 30,
        width: '40%',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
});
