import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function Informacoes() {
  return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <View>
    
          <Text>Esta é a tela Informações!</Text>
    
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

