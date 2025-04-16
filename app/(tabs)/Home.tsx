import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function Home() {
  return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <View>
    
          <Text>Esta é a tela Home!</Text>
    
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

