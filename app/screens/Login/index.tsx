import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard, StatusBar } from "react-native";
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import styles from "./Styles";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";
import { useRouter } from "expo-router";


export default function Login() {

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;
      
      if (!user.emailVerified) {
        Alert.alert(
          "E-mail não verificado",
          "Por favor, verifique seu e-mail antes de fazer login."
        );
        return;
      }

      router.replace("/Home");
    } catch (error: any) {
      let msg = "Erro ao fazer login.";
      if (error.code === "auth/invalid-email") msg = "E-mail ou senha incorretos.";
      if (error.code === "auth/user-not-found") msg = "Usuário não encontrado.";
      if (error.code === "auth/wrong-password") msg = "E-mail ou senha incorretos.";
      Alert.alert("Erro", msg);
    }
  };

  return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.containerGeral}>

      <StatusBar
        backgroundColor="#ffffff"
        barStyle="dark-content"
      />

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
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity 
              onPress={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: 0, padding: 10 }}
            >
              <Text style={styles.showPasswordStyle}>
                  {showPassword ? 'Ocultar' : 'Mostrar'}
              </Text>
            </TouchableOpacity>
          </View>

          <Link href="/screens/EsqueceuSenha" style={styles.esqueceuSenha}>Esqueceu a senha?</Link>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Acessar</Text>
          </TouchableOpacity>

          <Text style={styles.criarConta}>Ainda não possui uma conta? 
            <Link href="/screens/Cadastro" style={styles.criarContaLink}> Cadastre-se</Link>
          </Text>

        </View>

      </View>
    </TouchableWithoutFeedback>
  );
}
