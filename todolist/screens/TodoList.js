import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'

import Logout from './Logout'
import AddTodo from '../components/AddTodo'

const TodoList = () => {
  const [userId, setUserId] = useState('')

  
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

  return (
    <>
      <View style={styles.container}>
        <div>TodoList</div>
        <AddTodo user_id={userId}/>
        <View style={styles.logout}>
          <Logout />
        </View>
      </View>
    </>
  )
}

export default TodoList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor:'#fff',
  },
  logout: {
    marginTop: 10,
    width: '40%',
  },
})