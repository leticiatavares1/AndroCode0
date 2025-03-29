import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import styles from "./Styles";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      Alert.alert("Login bem-sucedido!");
    } else {
      Alert.alert("Usuário ou senha incorretos!");
    }
  };

  return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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

          <Link href="/screens/EsqueceuSenha/EsqueceuSenha" style={styles.esqueceuSenha}>Esqueceu a senha?</Link>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Acessar</Text>
          </TouchableOpacity>

          <Text style={styles.criarConta}>Ainda não possui uma conta? 
            <Link href="/screens/Cadastro/Cadastro" style={styles.criarContaLink}> Cadastre-se</Link>
          </Text>

        </View>

      </View>
    </TouchableWithoutFeedback>
  );
}
