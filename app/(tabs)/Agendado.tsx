import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, StyleSheet, ActivityIndicator, TouchableOpacity, Image, Linking, ScrollView } from 'react-native';
import { useRouter } from "expo-router";
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

// --- Importações do Firebase com tipos ---
import { auth, database } from '../../firebase/firebaseConfig';
import { ref, query, orderByChild, equalTo, onValue, off, DataSnapshot } from 'firebase/database';
import { onAuthStateChanged, User } from 'firebase/auth';

// --- Interface para tipar os dados do Agendamento ---
interface Agendamento {
  id: string;
  categoria: string;
  dataAgendamento: string;
  dataCriacao: string;
  horarioAgendamento: string;
  preco: string;
  profissional: string;
  servico: string;
  status: string;
  userEmail: string;
  userId: string;
}

// --- Array com dados dos barbeiros para buscar a foto ---
const barbeiros = [
    {
      nome: 'Eslley',
      foto: require('../../assets/images/eslley.jpg'),
      servicos: ['Corte de cabelo', 'Barba e Bigode', 'Sobrancelha'],
    },
    {
      nome: 'Henrique',
      foto: require('../../assets/images/henrique.jpg'),
      servicos: ['Corte de cabelo', 'Barba e Bigode'],
    },
    {
      nome: 'José',
      foto: require('../../assets/images/jose.jpg'),
      servicos: ['Corte de cabelo', 'Sobrancelha'],
    },
    {
      nome: 'Vitor',
      foto: require('../../assets/images/vitor.jpg'),
      servicos: ['Corte de cabelo', 'Sobrancelha'],
    },
    {
      nome: 'Barbeiro Aleatório',
      foto: require('../../assets/images/Person.png'),
      servicos: ['Corte de cabelo', 'Barba e Bigode', 'Sobrancelha'],
    },
];

export default function Agendado() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [proximoAgendamento, setProximoAgendamento] = useState<Agendamento | null>(null);

  // A lógica do useEffect continua a mesma, está perfeita.
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        const agendamentosRef = ref(database, 'agendamentos');
        const userQuery = query(agendamentosRef, orderByChild('userId'), equalTo(user.uid));
        const unsubscribeDB = onValue(userQuery, 
          (snapshot: DataSnapshot) => {
            const agendamentosDoUsuario: Agendamento[] = [];
            snapshot.forEach((childSnapshot) => {
              agendamentosDoUsuario.push({
                id: childSnapshot.key!,
                ...childSnapshot.val(),
              });
            });

            const parseDateTime = (dateStr: string, timeStr: string): Date => {
              const [day, month, year] = dateStr.split('/');
              const [hours, minutes] = timeStr.split(':');
              return new Date(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes));
            };

            const agora = new Date();

            const agendamentosFuturos = agendamentosDoUsuario
              .filter(ag => {
                const dataHoraAgendamento = parseDateTime(ag.dataAgendamento, ag.horarioAgendamento);
                return ag.status === 'Confirmado' && dataHoraAgendamento > agora;
              })
              .sort((a, b) => {
                const dataA = parseDateTime(a.dataAgendamento, a.horarioAgendamento);
                const dataB = parseDateTime(b.dataAgendamento, b.horarioAgendamento);
                return dataA.getTime() - dataB.getTime();
              });

            setProximoAgendamento(agendamentosFuturos.length > 0 ? agendamentosFuturos[0] : null);
            setIsLoading(false);
          }, 
          (error) => {
            console.error("Erro ao buscar agendamentos: ", error);
            setIsLoading(false);
          }
        );
        return () => unsubscribeDB();
      } else {
        setProximoAgendamento(null);
        setIsLoading(false);
      }
    });
    return () => unsubscribeAuth();
  }, []);

  // Tela de Carregamento (sem alteração)
  if (isLoading) {
    return (
      <View style={styles.containerGeral}>
        <StatusBar backgroundColor="#18212A" barStyle="light-content" />
        <Text style={styles.title}>Meus agendamentos</Text>
        <View style={styles.containerCentralizado}>
          <ActivityIndicator size="large" color="#C9A64D" />
          <Text style={styles.textLoading}>Verificando sua agenda...</Text>
        </View>
      </View>
    );
  }

  // --- Tela QUANDO HÁ um agendamento futuro (NOVO LAYOUT) ---
  if (proximoAgendamento) {
    // Encontra os dados do profissional (incluindo a foto) no nosso array
    const profissionalInfo = barbeiros.find(b => b.nome === proximoAgendamento.profissional);
    const fotoProfissional = profissionalInfo ? profissionalInfo.foto : require('../../assets/images/Person.png');

    return (
      <ScrollView contentContainerStyle={styles.containerGeral}>
        <StatusBar backgroundColor="#18212A" barStyle="light-content" />
        <Text style={styles.title}>Seu próximo compromisso</Text>
        <Text style={styles.subtitle}>Estamos ansiosos para recebê-lo! Confira os detalhes:</Text>

        <View style={styles.containerAgendamentoEncontrado}>
            <Text style={styles.labelServico}>Serviço agendado</Text>
            <Text style={styles.nomeServico}>{proximoAgendamento.servico}</Text>

            <Image source={fotoProfissional} style={styles.fotoProfissional} />
            <Text style={styles.nomeProfissional}>{proximoAgendamento.profissional}</Text>

            <Text style={styles.textoDataHora}>
                Agendado para o dia {proximoAgendamento.dataAgendamento} às {proximoAgendamento.horarioAgendamento}
            </Text>
        </View>

        <View style={styles.containerDuvidas}>
            <Text style={styles.tituloDuvidas}>Dúvidas ou observações</Text>
            <Text style={styles.textoDuvidas}>
                Em caso de dúvidas ou observações, por favor, entre em contato conosco via WhatsApp. Responderemos o mais breve possível.
            </Text>
            <TouchableOpacity style={styles.containerMaisInfo} onPress={() => Linking.openURL("https://wa.me/5519989434467")}>
                <MaterialCommunityIcons name="whatsapp" size={30} color="#25D366" />
                <Text style={styles.textInfo}>Entrar em contato</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  // Tela QUANDO NÃO HÁ agendamento futuro (sem alteração)
  return (
    <View style={styles.containerGeral}>
      <StatusBar backgroundColor="#18212A" barStyle="light-content" />
      <Text style={styles.title}>Meus agendamentos</Text>
      <View style={styles.containerCentralizado}>
        <Feather name="calendar" size={60} color="#C9A64D" style={{ marginBottom: 20 }}/>
        <Text style={styles.titleAgendar}>Sua agenda está livre!</Text>
        <Text style={styles.textAgendar}>Que tal reservar um horário para renovar o visual? É rápido e fácil.</Text>
        <TouchableOpacity style={styles.buttonAgendar} onPress={() => router.push("/screens/Servicos")}>
          <Text style={styles.buttonText}>Ver horários disponíveis</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// --- ESTILOS ATUALIZADOS ---
const styles = StyleSheet.create({
  containerGeral: {
    flexGrow: 1,
    backgroundColor: '#18212A',
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#a1a1a1',
    textAlign: 'center',
    marginBottom: 32,
  },
  containerCentralizado: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
  },
  textLoading: {
    color: '#C9A64D',
    marginTop: 10,
  },
  titleAgendar: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  textAgendar: {
    fontSize: 16,
    color: '#a1a1a1',
    textAlign: 'center',
    maxWidth: '80%',
    marginBottom: 30,
  },
  buttonAgendar: {
    backgroundColor: '#C9A64D',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: '#18212A',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // --- Novos estilos para o card de agendamento ---
  containerAgendamentoEncontrado: {
    alignItems: 'center',
    backgroundColor: '#262626',
    borderRadius: 16,
    padding: 24,
    width: '100%',
  },
  labelServico: {
    color: '#a1a1a1',
    fontSize: 14,
    marginBottom: 4,
  },
  nomeServico: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  fotoProfissional: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#C9A64D',
    marginBottom: 12,
  },
  nomeProfissional: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  textoDataHora: {
    color: '#C9A64D',
    fontSize: 16,
    fontWeight: '500',
  },
  // --- Novos estilos para a seção de dúvidas ---
  containerDuvidas: {
    marginTop: 32,
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#262626',
  },
  tituloDuvidas: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
  },
  textoDuvidas: {
    color: '#a1a1a1',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  containerMaisInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  textInfo: {
    color: '#18212A',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 16,
  },
});