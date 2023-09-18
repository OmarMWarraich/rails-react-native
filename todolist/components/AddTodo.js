import axios from 'axios';
import React , { useState } from 'react';
import { StyleSheet, TextInput, View, Button, FlatList, TouchableOpacity, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';

const AddTodo = ({user_id}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const addTodo = () => {
        axios.post('http://localhost:3000/todos', {
            title,
            description,
            completed:false,
            user_id
        })
        .then(res => {
            setTimeout(() => {
                window.location.reload();
            }, 400);
        }
        )
        .catch(err => {
            console.log(err);
        }
        )
    }

    return (
        <View style={styles.container}>
            {/* <View style={styles.header}>
                <Text style={styles.text_header}>Todo List</Text>
            </View> */}
            {/* <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            > */}
                <Text style={styles.text_footer}>Title</Text>
                <View style={styles.action}>
                    <Ionicons
                        name="ios-book"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput
                        placeholder="Title"
                        style={styles.textInput}
                        onChangeText={value => setTitle(value)}
                    />
                </View>
                <Text style={[styles.text_footer, { marginTop: 35 }]}>Description</Text>
                <View style={styles.action}>
                    <Ionicons
                        name="ios-book"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput
                        placeholder="Description"
                        style={styles.textInput}
                        onChangeText={value => setDescription(value)}
                    />
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={addTodo}
                >
                    <Text style={styles.textSign}>Add Todo</Text>
                </TouchableOpacity>
            {/* </Animatable.View> */}
        </View>
    )
}

export default AddTodo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#05375a'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingTop: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
        paddingTop: 50
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
        alignItems: 'center'
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        color: '#05375a',
        fontSize: 18
    },
    button: {
        alignItems: 'center',
        marginTop: 20
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: '#05375a',
        color: '#fff'
    },
})

    