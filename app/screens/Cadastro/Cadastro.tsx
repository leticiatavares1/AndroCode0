import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import styles from "./Styles";

export default function Cadastro() {
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
                <TextInput style={styles.input} placeholder="Digite seu nome" />
              </View>

              <View style={styles.inputContainer}>
                <Feather name="user" size={24} color="black" />
                <TextInput style={styles.input} placeholder="Digite seu sobrenome" />
              </View>

              <View style={styles.inputContainer}>
                <Feather name="phone" size={24} color="black" />
                <TextInput style={styles.input} placeholder="Digite seu WhatsApp" keyboardType="phone-pad" />
              </View>

              <View style={styles.inputContainer}>
                <Feather name="at-sign" size={24} color="black" />
                <TextInput style={styles.input} placeholder="Digite seu e-mail" keyboardType="email-address" />
              </View>

              <View style={styles.inputContainer}>
                <Feather name="lock" size={24} color="black" />
                <TextInput style={styles.input} placeholder="Digite sua senha" secureTextEntry />
              </View>

              <View style={styles.inputContainer}>
                <Feather name="lock" size={24} color="black" />
                <TextInput style={styles.input} placeholder="Confirme sua senha" secureTextEntry />
              </View>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Acessar</Text>
              </TouchableOpacity>

              <Text style={styles.fazerLogin}>
                Já possui uma conta?
                <Link href="/screens/Login/Login" style={styles.fazerLoginLink}> Faça o login </Link>
              </Text>

            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
