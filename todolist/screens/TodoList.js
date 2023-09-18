import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { View, ScrollView, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { Ionicons } from '@expo/vector-icons'

import Logout from './Logout'
import AddTodo from '../components/AddTodo'

const TodoList = () => {
  const [userId, setUserId] = useState('')
  const [todos, setTodos] = useState([])

  
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const res = await axios.get('http://localhost:3000/logged_in', { withCredentials: true });
        const data = res.data;
        setUserId(data.user.id);
      } catch (err) {
        console.log(err);
      }
    }
    fetchUserId();
  }, [])

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get("http://localhost:3000/todos/");
        const data = res.data;
        const userData = data.filter((todo) => todo.user_id === userId)
        setTodos(userData);
      } catch (err) {
        console.log(err);
      }
    }
    fetchTodos();
  }, [userId])

  const deleteTodo = (id) => {
    const apiUrl = `http://localhost:3000/todos/${id}`;
    console.log("DELETE request URL:", apiUrl); // Debugging
    
    axios.delete(apiUrl)
        .then(res => {
            // Code to execute after a 1-second delay
            setTimeout(() => {
                console.log("Deleted successfully!");
            }, 1000);
            
            // Update the todos state after the DELETE request is successful
            const newTodos = todos.filter(todo => todo.id !== id);
            setTodos(newTodos);
        })
        .catch(err => {
            console.log(err);
        });
}


  const completeTodo = (id) => {
    axios.patch(`http://localhost:3000/todos/${id}`, {
        completed: true
    })
        .then(res => {
            console.log(res.data);
            const newTodos = todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = true;
                }
                return todo;
            })
            setTodos(newTodos),
            console.log("Completed successfully!")
        })
        .catch(err => {
            console.log(err);
        })
        
  }

  return (
    <>
      <ScrollView style={styles.container}>
      <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
        <AddTodo user_id={userId}/>
        <View style={styles.logout}>
          <Logout />
        </View>
        <View style={styles.todos}>
                    <FlatList
                        data={todos}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.todo}
                                onPress={() => {
                                  completeTodo(item.id)
                                  setTimeout(() => {
                                    window.location.reload();
                                  }, 300);
                                }}
                            >
                                <Text style={[styles.todoText, { textDecorationLine: item.completed ? 'line-through' : 'none' }]}>{item.title}</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                      deleteTodo(item.id)
                                      setTimeout(() => {
                                        window.location.reload();
                                      }, 300);
                                    } 
                                    }
                                >
                                    <Ionicons
                                        name="ios-trash"
                                        color="#05375a"
                                        size={20}
                                    />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        )}
                    />
                </View>
      </Animatable.View>
      </ScrollView>
    </>
  )
}

export default TodoList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#05375a',
  },
  logout: {
    marginTop: 10,
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
  todos: {
    marginTop: 20
  },
  todo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  todoText: {
    fontSize: 16,
    flex: 1, // This makes the text take up all available space
    textDecorationLine: 'none', // Initial text decoration
  },
  completedTodoText: {
    textDecorationLine: 'line-through', // Text decoration for completed items
    color: 'gray', // Color for completed items
  },
})