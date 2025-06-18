import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from "./Styles"
import { useState } from 'react';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";
import Modal from 'react-native-modal';

export default function CadastroScreen() {

  const [email, setEmail] = useState('');
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

  const handlePasswordReset = async () => {
    if (!email) {
      setErrorModalMessage('Por favor, digite seu e-mail.')
      setErrorModalVisible(true);
      return;
    }
  
    try {
      await sendPasswordResetEmail(auth, email);
      setGoodModalMessage("Se este e-mail estiver registrado, você receberá um link para redefinir a senha.");
      setGoodModalVisible(true);

      setTimeout(() => {
        setGoodModalVisible(false);
      }, 8000);

    } catch (error: any) {
      let msg = "Erro ao enviar e-mail de redefinição.";
      let showDetails = true;

      if (error.code === "auth/user-not-found") {
        msg = "E-mail não encontrado.";
        showDetails = false;
      }
      else if (error.code === "auth/invalid-email") {
        msg = "E-mail inválido.";
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

              <Text style={styles.title}>Esqueceu a senha?</Text>

              <Text style={styles.textoEsqueceuSenha}>
              Perdeu sua senha? Digite seu endereço de e-mail. Você receberá um link por e-mail para criar uma nova senha.
              </Text>

              <View style={styles.inputContainer}>
                <Feather name="mail" size={24} color="#A1A1A1" style={styles.iconStyles} />
                <TextInput
                  style={styles.input}
                  placeholder="Digite seu e-mail"
                  placeholderTextColor={'#A1A1A1'}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
                <Text style={styles.buttonText}>Enviar</Text>
              </TouchableOpacity>

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
