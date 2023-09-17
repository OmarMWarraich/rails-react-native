import axios from 'axios';
import React , { useState } from 'react';
import { StyleSheet, TextInput, View, Button } from 'react-native';

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
            console.log(res.data);
        }
        )
        .catch(err => {
            console.log(err);
        }
        )
    }

    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder="Title"
                onChangeText={value => setTitle(value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                onChangeText={value => setDescription(value)}
            />
            <Button
                title="Add Todo"
                onPress={addTodo}
            />
        </View>
    )
}

export default AddTodo

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
        margin: 10
    }
})

    