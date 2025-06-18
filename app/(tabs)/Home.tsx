import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, StatusBar, Animated, Easing, FlatList } from 'react-native';
import { auth, database } from '../../firebase/firebaseConfig';
import { ref, onValue } from 'firebase/database';
import { Feather } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { useRouter } from "expo-router";

type Barbeiro = {
    nome: string;
    foto: any;
    servicos: string[];
  };

const imagens = [
    require('../../assets/images/home_1.png'),
    require('../../assets/images/home_2.png'),
    require('../../assets/images/home_3.png'),
  ];

export default function Home() {

  const [userName, setUserName] = useState('');
  const [indexImagem, setIndexImagem] = useState(0);
  const animacao = useRef(new Animated.Value(0)).current;
  const barraProgresso = useRef(new Animated.Value(0)).current;
  const [isModalVisible, setModalVisible] = useState(false);
  const tempoTroca = 6000;
  const intervaloRef = useRef<NodeJS.Timeout | null>(null);
  const [barbeiroSelecionado, setBarbeiroSelecionado] = useState<Barbeiro | null>(null);
  const [showModalContent, setShowModalContent] = useState(false);


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const router = useRouter();

  function agendarRotaModal() {
    if (barbeiroSelecionado) { // Garante que um barbeiro foi selecionado
      router.push({
        pathname: "/screens/Servicos",
        params: { 
          // Aqui está a mágica: enviamos o objeto do barbeiro como texto JSON
          barbeiro: JSON.stringify(barbeiroSelecionado) 
        }
      });
      setModalVisible(false); // Opcional: fechar o modal após navegar
    }
  }

  function agendarRota(servicoSelecionado: string) {
    const barbeiro = barbeiroSelecionado ? JSON.stringify(barbeiroSelecionado) : 'Qualquer';
    router.push({ 
      pathname: "/screens/Servicos", 
      params: { 
        servico: servicoSelecionado, 
        barbeiro 
      } 
    });
  }

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

  function iniciarIntervaloTroca() {
    if (intervaloRef.current) {
      clearInterval(intervaloRef.current);
    }

    iniciarAnimacao();

    intervaloRef.current = setInterval(() => {
      trocarImagem(1);
    }, tempoTroca);
  }
  
  useEffect(() => {
    iniciarIntervaloTroca();
    return () => {
      if (intervaloRef.current) clearInterval(intervaloRef.current);
    };
  }, []);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userRef = ref(database, `usuarios/${user.uid}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data && data.Name) {
          setUserName(data.Name);
        }
      });
    }
  }, []);

  function iniciarAnimacao() {
    barraProgresso.setValue(0);
    Animated.timing(barraProgresso, {
      toValue: 1,
      duration: tempoTroca,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
  }

  function trocarImagem(direcao: number) {
    Animated.timing(animacao, {
      toValue: direcao === 1 ? -350 : 350,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      animacao.setValue(0);
      setIndexImagem((prevIndex) => {
        let novoIndex = prevIndex + direcao;
        if (novoIndex >= imagens.length) return 0;
        if (novoIndex < 0) return imagens.length - 1;
        return novoIndex;
      });

      iniciarIntervaloTroca(); // Reinicia o tempo e a animação
    });
  }

  return (
    <View style={styles.container}>

      <StatusBar
              backgroundColor="#18212A"
              barStyle="light-content"
      />

      <ScrollView>
        <View>
          <Text style={styles.title}>Olá {userName ? userName : 'Usuário'}</Text>
        </View>

        <View style={styles.imageContainer}>
          <View style={styles.imageBox}>
            <View style={styles.imageLayer}>
              <Image source={imagens[indexImagem]} style={styles.image} resizeMode="cover" />
            </View>

            <View style={styles.overlayContent}>
              <TouchableOpacity onPress={() => trocarImagem(-1)} style={styles.arrowButton}>
                <Feather name="chevron-left" size={28} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => trocarImagem(1)} style={styles.arrowButton}>
                <Feather name="chevron-right" size={28} color="#fff" />
              </TouchableOpacity>
            </View>

            <Animated.View
              style={[
                styles.progressBar,
                {
                  width: barraProgresso.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          </View>

        </View>

        <View style={styles.containerTitle}>
          <Text style={styles.sectionTitle}>Agende seu horário</Text>
        </View>
        <View style={styles.row}>

          <TouchableOpacity style={styles.serviceBox} onPress={() => agendarRota("Cabelo")}>
            <View style={styles.serviceImage}>
              <Image source={require('../../assets/images/CabeloIcon.png')} style={styles.imageIcon}/>
            </View>
            <Text style={styles.label}>Cabelo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceBox} onPress={() => agendarRota("Barba")}>
            <View style={styles.serviceImage}>
              <Image source={require('../../assets/images/BarbaIcon.png')} style={styles.imageIcon}/>
            </View>
            <Text style={styles.label}>Barba</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceBox} onPress={() => agendarRota("Sobrancelha")}>
            <View style={styles.serviceImage}>
              <Image source={require('../../assets/images/SobrancelhaIcon.png')} style={styles.imageIcon}/>
            </View>
            <Text style={styles.label}>Sobrancelha</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.containerTitle}>
          <Text style={styles.sectionTitle}>Conheça nossos profissionais</Text>
        </View>

        <View style={styles.rowSecundario}>
          {barbeiros.map((barbeiro, index) => (
            <TouchableOpacity
              key={index}
              style={styles.proBox}
              onPress={() => {
                setBarbeiroSelecionado(barbeiro);
                setModalVisible(true);
              }}
            >
              {barbeiro.foto ? (
                <Image source={barbeiro.foto} style={styles.proImage} />
              ) : (
                <View style={styles.proImage} />
              )}
              <Text style={styles.label}>{barbeiro.nome}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => {
          toggleModal();
          setShowModalContent(false);
        }}
        onSwipeComplete={() => {
          toggleModal();
          setShowModalContent(false);
        }}
        onModalShow={() => setShowModalContent(true)}
        style={styles.modal}
        swipeDirection="down"
        animationInTiming={100} // padrão é 300
        animationOutTiming={100}
      >
        <View style={styles.modalContent}>
          {showModalContent && (
            <>
              <View style={styles.modalAbaixar} />
              <View style={styles.barberFotoContainer}>
                {typeof barbeiroSelecionado?.foto === 'number' ? (
                  <Image source={barbeiroSelecionado.foto} style={styles.barberFoto} />
                ) : (
                  <View style={styles.barberFoto} />
                )}
              </View>
              
              <Text style={styles.modalTitle}>
                {barbeiroSelecionado?.nome}
              </Text>
              
              <Text style={styles.modalSubtitle}>Serviços:</Text>
              
              {barbeiroSelecionado?.servicos.map((item: string, index: number) => (
                <View key={index} style={styles.listaItem}>
                  <View style={styles.bolinha} />
                  <Text style={styles.modalText}>{item}</Text>
                </View>
              ))}

              <TouchableOpacity onPress={agendarRotaModal} style={styles.buttonAgendar}>
                <Text style={styles.buttonText}>Agendar</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18212A',
    padding: 20,
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 24,
  },
  imageContainer: {
    marginBottom: 24,
    alignItems:'center',
  },
  imageBox: {
    height: 200,
    width: '100%',
    backgroundColor: '#dddddd',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  overlayContent: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 5,
  },
  arrowButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 100,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: -4, // sobrepõe o final da imagem
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
    color:'#ffffff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  serviceBox: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  serviceImage: {
    width: 100,
    height: 100,
    backgroundColor: '#dddddd',
    borderRadius: 10,
    marginBottom: 5,
  },
  proImage: {
    width: 100,
    height: 120,
    backgroundColor: '#dddddd',
    borderRadius: 10,
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    textAlign: 'center',
    color: '#ffffff',
  },
  containerTitle:{
    alignItems:'center',
  },
  imageLayer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
   modal: {
  justifyContent: 'flex-end',
  margin: 0,
  },
  modalContent: {
    backgroundColor: '#50687F',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: '50%',
  },
  modalAbaixar: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#cccccc',
    alignSelf: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontFamily: 'Poppins_400Regular',
  },
  buttonAgendar: {
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#3CB371',
    borderRadius: 10,
    marginTop: 24,
  },
  modalSubtitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 16,
    color: '#ffffff',

  },
  modalText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#ffffff',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    marginBottom: 10,
    color:'#ffffff',
    textAlign:'center',
  },
  barberFoto:{
    backgroundColor: '#cccccc',
    height: 200,
    width: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  barberFotoContainer:{
    alignItems:'center',
  },
  listaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  bolinha: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ffffff',
    marginRight: 10,
  },
  imageIcon: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
  rowSecundario: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start', // Distribui melhor
  },
  proBox: {
    width: '30%', // Aproximadamente 1/3 da largura (ajuste se necessário)
    margin: '1.6%', // Pequena margem para dar espaçamento
    alignItems: 'center',
  },
});
