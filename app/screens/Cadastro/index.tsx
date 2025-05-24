import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, ScrollView,
  TouchableWithoutFeedback, Keyboard, Alert, Image
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import styles from "./Styles";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth, database } from "../../../firebase/firebaseConfig";
import { ref, set } from "firebase/database";
import { useRouter } from "expo-router";
import Modal from 'react-native-modal';
import { TextInputMask } from 'react-native-masked-text';

export default function Cadastro() {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorModalMessage, setErrorModalMessage] = useState('');
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [goodModalMessage, setGoodModalMessage] = useState('');
  const [goodModalVisible, setGoodModalVisible] = useState(false);

  const toggleModalError = () => {
    setErrorModalVisible(false);
  };

  const toggleModalGood = () => {
    setGoodModalVisible(false);
    router.replace("/screens/Login");
  };

  const handleSignUp = async () => {
    if (!nome || !sobrenome || !whatsapp || !email || !password || !confirmPassword) {
      setErrorModalMessage("Por favor, preencha todos os campos.");
      setErrorModalVisible(true);
      return;
    }

    if (password !== confirmPassword) {
      setErrorModalMessage("As senhas não coincidem.");
      setErrorModalVisible(true);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await sendEmailVerification(user);
      
      await set(ref(database, `usuarios/${user.uid}`), {
        Name: nome,
        LastName: sobrenome,
        WhatsApp: whatsapp,
        Email: email,
        UserType: 1, // ou "admin" no futuro.
        DateAdd: new Date().toISOString()
      });

      setGoodModalMessage("Conta criada com sucesso! Um e-mail de verificação foi enviado. Por favor, verifique seu e-mail antes de fazer login.");
      setGoodModalVisible(true);

      setTimeout(() => {
        setGoodModalVisible(false);
        router.replace("/screens/Login");
      }, 8000);

    } catch (error: any) {
      let msg = "Erro ao criar conta.";
      let showDetails = true;

      if (error.code === "auth/email-already-in-use") {
        msg = "E-mail já está em uso.";
        showDetails = false;
      }
      if (error.code === "auth/invalid-email") {
        msg = "E-mail inválido.";
        showDetails = false;
      }
      if (error.code === "auth/weak-password") {
        msg = "A senha deve ter pelo menos 6 caracteres.";
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
            <View style={styles.containerSecundario}>

              <View style={styles.logo}>
                <Image source={require('../../../assets/images/splash-screen.png')} style={styles.logoImage}/>
              </View>

              <Text style={styles.title}>Novo usuário</Text>

              <View style={styles.inputContainer}>
                <Feather name="user" size={24} color="#a1a1a1" style={styles.iconStyles}/>
                <TextInput 
                  style={styles.input} 
                  placeholder="Digite seu nome"
                  placeholderTextColor={'#a1a1a1'}
                  value={nome}
                  onChangeText={setNome}
                />
              </View>

              <View style={styles.inputContainer}>
                <Feather name="user" size={24} color="#a1a1a1" style={styles.iconStyles}/>
                <TextInput 
                  style={styles.input} 
                  placeholder="Digite seu sobrenome"
                  placeholderTextColor={'#a1a1a1'}
                  value={sobrenome}
                  onChangeText={setSobrenome} 
                />
              </View>

              <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="whatsapp" size={24} color="#a1a1a1" style={styles.iconStyles}/>
                <TextInputMask
                  type={'cel-phone'}
                  options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) '
                  }}
                  value={whatsapp}  
                  onChangeText={text => setWhatsapp(text)}
                  style={styles.input}
                  placeholder="Digite seu WhatsApp"
                  placeholderTextColor={'#a1a1a1'}
                  keyboardType="phone-pad" 
                />
              </View>

              <View style={styles.inputContainer}>
                <Feather name="mail" size={24} color="#a1a1a1" style={styles.iconStyles}/>
                <TextInput 
                  style={styles.input} 
                  placeholder="Digite seu e-mail"
                  placeholderTextColor={'#a1a1a1'}
                  keyboardType="email-address" 
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View style={styles.inputContainer}>
                <Feather name="lock" size={24} color="#a1a1a1" style={styles.iconStyles}/>
                <TextInput 
                  style={styles.input} 
                  placeholder="Digite sua senha"
                  placeholderTextColor={'#a1a1a1'}
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

              <View style={styles.inputContainer}>
                <Feather name="lock" size={24} color="#a1a1a1" style={styles.iconStyles}/>
                <TextInput 
                  style={styles.input} 
                  placeholder="Confirme sua senha"
                  placeholderTextColor={'#a1a1a1'}
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword} 
                />
                <TouchableOpacity 
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                <Text style={styles.showPasswordStyle}>
                  {showConfirmPassword ? 'Ocultar' : 'Mostrar'}
                </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Acessar</Text>
              </TouchableOpacity>

              <Text style={styles.fazerLogin}>
                Já possui uma conta?
                <Link href="/screens/Login" style={styles.fazerLoginLink}> Faça o login </Link>
              </Text>

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
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
