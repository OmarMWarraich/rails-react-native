import axios from "axios"
import React from "react"
import { Button, View, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"

const Logout = () => {
    const navigation = useNavigation()
    
    const handleLogout = () => {
        axios
            .delete("http://localhost:3000/logged_out", { withCredentials: true })
            .then((response) => {
                if (response.data.logged_out) {
                    navigation.navigate("Login")
                    window.location.reload()
                }
            })
            .catch((error) => console.log(error))
    }
    
    return (
        <View style={styles.input}>
          <Button title="Logout" onPress={handleLogout} />
        </View>
    )
    }

export default Logout

const styles = StyleSheet.create({
    input: {
        width: "100px",      
    },
})