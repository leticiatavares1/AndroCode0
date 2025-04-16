import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function Agendado() {
  return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <View>
    
          <Text>Esta é a tela Agendado!</Text>
    
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

