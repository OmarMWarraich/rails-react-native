import axios from "axios"
import React from "react"
import { Button, View } from "react-native"
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
        <View>
          <Button title="Logout" onPress={handleLogout} />
        </View>
    )
    }

export default Logout


