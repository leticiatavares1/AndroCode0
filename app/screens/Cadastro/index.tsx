import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, ScrollView,
  TouchableWithoutFeedback, Keyboard, Alert 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import styles from "./Styles";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth, database } from "../../../firebase/firebaseConfig";
import { ref, set } from "firebase/database";
import { useRouter } from "expo-router";

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

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
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
        Type: 1, // ou "admin" no futuro.
        DateAdd: new Date().toISOString()
      });

      Alert.alert(
        "Conta criada com sucesso!",
        "Um e-mail de verificação foi enviado. Por favor, verifique seu e-mail antes de fazer login."
      );
      router.replace("/screens/Login");
    } catch (error: any) {
      let msg = "Erro ao criar conta.";
      if (error.code === "auth/email-already-in-use") msg = "E-mail já está em uso.";
      if (error.code === "auth/invalid-email") msg = "E-mail inválido.";
      if (error.code === "auth/weak-password") msg = "A senha deve ter pelo menos 6 caracteres.";
      Alert.alert("Erro", msg);
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
                <Feather name="scissors" size={100} color="black" />
              </View>

              <Text style={styles.title}>Novo usuário</Text>

              <View style={styles.inputContainer}>
                <Feather name="user" size={24} color="black" />
                <TextInput 
                  style={styles.input} 
                  placeholder="Digite seu nome"
                  value={nome}
                  onChangeText={setNome}
                />
              </View>

              <View style={styles.inputContainer}>
                <Feather name="user" size={24} color="black" />
                <TextInput 
                  style={styles.input} 
                  placeholder="Digite seu sobrenome"
                  value={sobrenome}
                  onChangeText={setSobrenome} 
                />
              </View>

              <View style={styles.inputContainer}>
                <Feather name="phone" size={24} color="black" />
                <TextInput 
                  style={styles.input} 
                  placeholder="Digite seu WhatsApp" 
                  keyboardType="phone-pad"
                  value={whatsapp}
                  onChangeText={setWhatsapp} 
                />
              </View>

              <View style={styles.inputContainer}>
                <Feather name="at-sign" size={24} color="black" />
                <TextInput 
                  style={styles.input} 
                  placeholder="Digite seu e-mail" 
                  keyboardType="email-address" 
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View style={styles.inputContainer}>
                <Feather name="lock" size={24} color="black" />
                <TextInput 
                  style={styles.input} 
                  placeholder="Digite sua senha" 
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

              <View style={styles.inputContainer}>
                <Feather name="lock" size={24} color="black" />
                <TextInput 
                  style={styles.input} 
                  placeholder="Confirme sua senha" 
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword} 
                />
                <TouchableOpacity 
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ position: 'absolute', right: 0, padding: 10 }}  
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

            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
