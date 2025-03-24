import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons';
import {useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold} from "@expo-google-fonts/poppins";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      Alert.alert("Login bem-sucedido!");
    } else {
      Alert.alert("Usuário ou senha incorretos!");
    }
  };

  if (!fontsLoaded) {
    return <Text>Carregando fontes...</Text>;
  }

  return (
    <View style={styles.containerGeral}>

      <View style={styles.containerSecundario}>

        <View style={styles.logo}>
          <Feather name="scissors" size={100} color="black" />
        </View>

        <Text style={styles.title}>Entrar</Text>

        <View style={styles.inputContainer}>
          <Feather name="at-sign" size={24} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputContainer}>
          <Feather name="lock" size={24} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <Text style={styles.esqueceuSenha}>Esqueceu a senha?</Text>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>

        <Text style={styles.criarConta}>Ainda não possui uma conta? <Text style={styles.criarContaLink}>Cadastre-se</Text></Text>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  containerGeral: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  containerSecundario: {
    marginTop: 50,
  },
  title: {
    fontSize: 32,
    fontFamily: "Poppins_700Bold",
  },
  input: {
    height: 40,
    flex: 1,
    borderColor: "black",
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 5,
    paddingBottom: 0,
    fontFamily: "Poppins_400Regular"
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  esqueceuSenha: {
    color:"#818181",
    fontFamily: "Poppins_400Regular",
    textAlign: "right",
    marginBottom: 24,
  },
  criarConta: {
    marginTop: 24,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  criarContaLink: {
    color: "#818181",
  },
  button: {
    backgroundColor: "#18212A",
    padding: 8,
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    color: "#ffffff",
    fontSize: 16,
  },
  logo: {
    display: "flex",
    justifyContent:"center",
    alignItems: "center",
    marginBottom: 80,
  }
});
