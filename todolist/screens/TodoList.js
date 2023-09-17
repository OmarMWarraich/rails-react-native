
import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import Logout from './Logout'

const TodoList = () => {


  return (
    <>
      <View style={styles.container}>
        <div>TodoList</div>
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