import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from "./Styles"

export default function CadastroScreen() {
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
            />
          </View>
    
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
    
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

