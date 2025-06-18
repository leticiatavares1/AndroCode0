import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, StatusBar, Image, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Feather } from '@expo/vector-icons';
import styles from "./Styles";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";
import { useRouter, Link } from "expo-router";
import Modal from 'react-native-modal';


export default function Login() {

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorModalMessage, setErrorModalMessage] = useState('');
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [goodModalMessage, setGoodModalMessage] = useState('');
  const [goodModalVisible, setGoodModalVisible] = useState(false);

  const toggleModalError = () => {
    setErrorModalVisible(false);
  };

  const toggleModalGood = () => {
    setGoodModalVisible(false);
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;
      
      if (!user.emailVerified) {
        setErrorModalMessage("Por favor, verifique seu e-mail antes de fazer login.");
        setErrorModalVisible(true);
        return;
      }

      router.replace("/Home");

    } catch (error: any) {
      let msg = "Erro ao fazer login.";
      let showDetails = true;

      if (error.code === "auth/invalid-email") {
        msg = "E-mail ou senha incorretos.";
        showDetails = false;
      }
      else if (error.code === "auth/user-not-found") {
        msg = "Usuário não encontrado.";
        showDetails = false;
      }
      else if (error.code === "auth/wrong-password") {
        msg = "E-mail ou senha incorretos.";
        showDetails = false;
      }
      else if (error.code === "auth/invalid-credential") {
        msg = "E-mail ou senha incorretos.";
        showDetails = false;
      }
      else if (error.code === "auth/missing-password") {
        msg = "E-mail ou senha incorretos.";
        showDetails = false;
      }

      const errorDetails = showDetails && error.message ? `\n\nDetalhes: ${error.message}` : "";

      setErrorModalMessage(`${msg}${errorDetails}`);
      setErrorModalVisible(true);
    }
  };

  return (
    
    <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "padding"} 
          style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.containerGeral}>

          <StatusBar
            backgroundColor="#18212A"
            barStyle="light-content"
          />

            <View style={styles.containerSecundario}>

              <View style={styles.logo}>
                <Image source={require('../../../assets/images/splash-screen.png')} style={styles.logoImage}/>
              </View>

              <Text style={styles.title}>Entrar</Text>

              <View style={styles.inputContainer}>
                <Feather name="mail" size={24} color="#A1A1A1" style={styles.iconStyles}/>
                <TextInput
                  style={styles.input}
                  placeholder="Digite seu e-mail"
                  placeholderTextColor={'#A1A1A1'}
                  value={username}
                  onChangeText={setUsername}
                />
              </View>

              <View style={styles.inputContainer}>
                <Feather name="lock" size={24} color="#A1A1A1" style={styles.iconStyles}/>
                <TextInput
                  style={styles.input}
                  placeholder="Senha"
                  placeholderTextColor={'#A1A1A1'}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity 
                  onPress={() => setShowPassword(!showPassword)}
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

            <Modal isVisible={goodModalVisible} onBackdropPress={() => setGoodModalVisible(false)}>
              <View style={styles.modalContentGood}>
                <View style={styles.checkIcon}>
                  <Feather name="check-circle" size={40} color="#3CB371" />
                </View>
                <Text style={styles.modalTextGood}>{goodModalMessage}</Text>

                <View>
                  <TouchableOpacity style={styles.buttonContainer} onPress={toggleModalGood}>
                    <Text style={styles.buttonText}>Fechar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <Modal isVisible={errorModalVisible} onBackdropPress={() => setErrorModalVisible(false)}>
              <View style={styles.modalContentErro}>
                <Text style={styles.modalTitleErro}>Erro</Text>
                <Text style={styles.modalText}>{errorModalMessage}</Text>

                <TouchableOpacity style={styles.buttonContainer} onPress={toggleModalError}>
                  <Text style={styles.buttonTextModal}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </Modal>

          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
