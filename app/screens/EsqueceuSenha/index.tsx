import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from "./Styles"
import { useState } from 'react';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";

export default function CadastroScreen() {

  const [email, setEmail] = useState('');

  const handlePasswordReset = async () => {
    if (!email) {
      alert("Por favor, digite seu e-mail.");
      return;
    }
  
    try {
      await sendPasswordResetEmail(auth, email);
      alert("E-mail enviado com sucesso! Verifique sua caixa de entrada.");
    } catch (error: any) {
      let msg = "Erro ao enviar e-mail de redefinição.";
      if (error.code === "auth/user-not-found") msg = "E-mail não encontrado.";
      if (error.code === "auth/invalid-email") msg = "E-mail inválido.";
      alert(msg);
    }
  };
  

  return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.containerGeral}>
        <View style={styles.containerSecundario}>
    
          <View style={styles.logo}>
            <Feather name="scissors" size={100} color="black" />
          </View>
    
          <Text style={styles.title}>Esqueceu a senha?</Text>
    
          <Text style={styles.textoEsqueceuSenha}>
          Perdeu sua senha? Digite seu endereço de e-mail. Você receberá um link por e-mail para criar uma nova senha.
          </Text>
    
          <View style={styles.inputContainer}>
            <Feather name="at-sign" size={24} color="black" />
            <TextInput
              style={styles.input}
              placeholder="Digite seu e-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
    
          <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
    
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

