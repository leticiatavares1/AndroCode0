import React, { useEffect } from "react";
import { View, Text, StatusBar, TouchableOpacity} from 'react-native';
import styles from "./styles";
import { useNavigation, Link, useRouter } from "expo-router";
import { Feather } from '@expo/vector-icons';

export default function AgendamentoConfirmado() {
const navigation = useNavigation();
const router = useRouter();

useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (

    <View style={styles.containerGeral}>
      <StatusBar
        backgroundColor="#18212A"
        barStyle="light-content"
      />
      
      <View style={styles.containerSecundario}>
        <Feather name="check-circle" size={40} color="#3CB371" style={styles.icon}/>
        <Text style={styles.title}>Parabéns!</Text>
        <Text style={styles.title}>Seu horario foi agendado com sucesso!</Text>
        <Text style={styles.text}>Você pode ver seus horários agendados na aba “Agendado” ou clique <Link href="/(tabs)/Agendado" style={styles.link}>aqui</Link> para ser redirecionado. </Text>
      </View>
      
      <TouchableOpacity style={styles.buttonVoltar} onPress={() => router.push({pathname: "/(tabs)/Home"})}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}
