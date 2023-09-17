import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Registration = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = () => {
    const user = {
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
    };

    axios
      .post('http://localhost:3000/registrations', { user }, { withCredentials: true })
      .then((response) => {
        if (response.data.status === 'created') {
          // Handle successful registration
          // props.handleLogin(response.data);
          // redirect();
          setEmail('');
          setPassword('');
          setPasswordConfirmation('');
          navigation.navigate('Login');

        } else {
          setErrors(response.data.errors);
        }
      })
      .catch((error) => console.log('api errors:', error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration</Text>
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
        <TextInput
          style={styles.input}
          placeholder="Password Confirmation"
          onChangeText={(text) => setPasswordConfirmation(text)}
          value={passwordConfirmation}
          secureTextEntry={true}
        />
        <Button title="Submit" onPress={handleSubmit} />
        <View style={{ marginTop: 10 }}>
            <Button title="Login" onPress={() => navigation.navigate('Login')} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
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

export default Registration;
