import React, { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, ScrollView, TouchableOpacity, Modal, Image, Platform} from 'react-native';
import styles from "./styles";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { auth, database } from "../../../firebase/firebaseConfig";
import { ref, set, push } from "firebase/database";

export default function AgendarServico() {
  const { service, price, category, barbeiro: barbeiroParam } = useLocalSearchParams();
  const router = useRouter();
  const [errorModalMessage, setErrorModalMessage] = useState('');
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const barbeiros = [
    {
      nome: 'Eslley',
      foto: require('../../../assets/images/eslley.jpg'),
      servicos: ['Corte de cabelo', 'Barba e Bigode', 'Sobrancelha'],
    },
    {
      nome: 'Henrique',
      foto: require('../../../assets/images/henrique.jpg'),
      servicos: ['Corte de cabelo', 'Barba e Bigode'],
    },
    {
      nome: 'José',
      foto: require('../../../assets/images/jose.jpg'),
      servicos: ['Corte de cabelo', 'Sobrancelha'],
    },
    {
      nome: 'Vitor',
      foto: require('../../../assets/images/vitor.jpg'),
      servicos: ['Corte de cabelo', 'Sobrancelha'],
    },
    {
      nome: 'Barbeiro Aleatório',
      foto: require('../../../assets/images/Person.png'),
      servicos: ['Corte de cabelo', 'Barba e Bigode', 'Sobrancelha'],
    },
  ];

  const toggleModalError = () => {
      setErrorModalVisible(false);
  };

  // Função principal para salvar o agendamento (versão simplificada)
  const handleConfirmAgendamento = async () => {
      // 1. Valida se os campos do agendamento foram preenchidos
      if (!selectedDate || !selectedTime || !selectedBarbeiro?.nome) {
          setErrorModalMessage("Por favor, selecione data, horário e um profissional para continuar.");
          setErrorModalVisible(true);
          return;
      }

      // 2. Obtém o usuário logado. Como você garantiu, ele sempre existirá nesta tela.
      const user = auth.currentUser;

      // 3. Uma verificação de segurança caso algo inesperado aconteça
      if (!user) {
          setErrorModalMessage("Usuário não encontrado. Por favor, faça o login novamente.");
          setErrorModalVisible(true);
          return;
      }

      try {
          // 4. Prepara a referência para um novo agendamento com um ID único
          const agendamentosRef = ref(database, 'agendamentos');
          const newAgendamentoRef = push(agendamentosRef);

          // 5. Salva os dados no Firebase, associando ao UID do usuário
          await set(newAgendamentoRef, {
              userId: user.uid, // UID do usuário logado
              userEmail: user.email,
              servico: service,
              categoria: category,
              preco: price,
              profissional: selectedBarbeiro.nome,
              dataAgendamento: formatDate(selectedDate),
              horarioAgendamento: selectedTime,
              status: 'Confirmado',
              dataCriacao: new Date().toISOString()
          });

          // 6. Sucesso! Navega diretamente para a tela de confirmação
          router.push({ pathname: "./AgendamentoConfirmado" });

      } catch (error: any) {
          // 7. Em caso de erro (ex: falha de rede, regras de segurança do Firebase)
          console.error("Erro ao salvar agendamento:", error); // Log para te ajudar a depurar
          setErrorModalMessage(`Ocorreu um erro ao salvar seu agendamento. Verifique sua conexão e tente novamente.`);
          setErrorModalVisible(true);
      }
  };

  // --- Estados do Componente ---

  // Estado para a data selecionada (objeto Date)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  // Estado para controlar qual botão de data está ativo ('hoje', 'amanha', 'custom')
  const [activeDateButton, setActiveDateButton] = useState<string>('');
  // Estado para o horário selecionado
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  // Estado para controlar a visibilidade do seletor de data
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  // Estado para armazenar os horários disponíveis para a data selecionada
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  useEffect(() => {
    // Verifica se selectedDate ainda não foi definida para evitar sobrescrever se o usuário já selecionou
    if (!selectedDate && !activeDateButton) {
      const today = new Date();
      setSelectedDate(today);
      setActiveDateButton('hoje');
    }
  }, []);

  // --- Funções e Lógica de Data/Hora ---

  /**
   * Formata um objeto Date para uma string "dd/mm/aaaa".
   * @param {Date} date O objeto Date a ser formatado.
   * @returns {string} A data formatada.
   */
  const formatDate = (date: Date): string => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // useEffect para recalcular os horários disponíveis sempre que a data selecionada mudar
  useEffect(() => {
    if (selectedDate) {
      const dayOfWeek = selectedDate.getDay(); // 0 = Domingo, 6 = Sábado
      const now = new Date();
      const isToday = selectedDate.toDateString() === now.toDateString();
      let startHour, endHour;

      // Define horário de funcionamento
      if (dayOfWeek === 0) { // Domingo
        setAvailableTimes([]);
        return;
      } else if (dayOfWeek === 6) { // Sábado
        startHour = 8;
        endHour = 17;
      } else { // Segunda a Sexta
        startHour = 9;
        endHour = 19;
      }

      const times = [];
      for (let hour = startHour; hour < endHour; hour++) {
        times.push(`${String(hour).padStart(2, '0')}:00`);
        // Adiciona :30, exceto para a última hora
        if (hour < endHour - 1 || (hour === endHour - 1 && endHour % 1 !== 0.5)) {
            times.push(`${String(hour).padStart(2, '0')}:30`);
        }
      }
      
      // Se for hoje, filtra horários que já passaram
      if (isToday) {
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const filteredTimes = times.filter(time => {
          const [hour, minute] = time.split(':').map(Number);
          if (hour > currentHour) return true;
          if (hour === currentHour && minute > currentMinute) return true;
          return false;
        });
        setAvailableTimes(filteredTimes);
      } else {
        setAvailableTimes(times);
      }
    } else {
      setAvailableTimes([]);
    }
    // Reseta o horário selecionado sempre que a data muda
    setSelectedTime(null);
  }, [selectedDate]);

  // --- Funções de Manipulação de Eventos ---

  const handleDateSelection = (event: DateTimePickerEvent, date: Date | undefined) => {
    setShowDatePicker(Platform.OS === 'ios'); // Mantém o seletor visível no iOS
    if (date) {
      setSelectedDate(date);
      setActiveDateButton('custom'); // Marca que uma data customizada foi escolhida
    }
  };

  const selectDatePreset = (preset: string) => {
    const newDate = new Date();
    if (preset === 'amanha') {
      newDate.setDate(newDate.getDate() + 1);
    }
    setSelectedDate(newDate);
    setActiveDateButton(preset);
  };

  const getInitialBarber = () => {
      // 1. Define o "Barbeiro Aleatório" como nosso padrão
      const defaultBarber = barbeiros.find(b => b.nome === 'Barbeiro Aleatório') || null;

      // 2. Verifica se um barbeiro específico foi passado pela navegação
      if (typeof barbeiroParam === 'string' && barbeiroParam !== 'Qualquer') {
          try {
              // Tenta usar o barbeiro que foi passado
              return JSON.parse(barbeiroParam);
          } catch (e) {
              console.warn('Erro ao fazer parse do JSON do barbeiro:', e);
              // Se falhar, usa o padrão
              return defaultBarber;
          }
      }

      // 3. Se nenhum barbeiro foi passado, usa o padrão
      return defaultBarber;
  };

  const [showBarbeiroModal, setShowBarbeiroModal] = useState(false);
  const [selectedBarbeiro, setSelectedBarbeiro] = useState(getInitialBarber());

  return (
    <View style={styles.containerGeral}>
      <ScrollView>
        <Text style={styles.title}>Confirme seu agendamento</Text>

        <Text style={styles.subTitle}>{category}</Text>

        <View style={styles.containerBoxSelect}>
          <Text style={styles.boxServiceTitle}>{service}</Text>
          <Text style={styles.boxServicePrice}>{price}</Text>
        </View>

        <Text style={styles.subTitle}>Profissional</Text>
        
        <TouchableOpacity onPress={() => setShowBarbeiroModal(true)} style={styles.containerBoxBarber}>
          <View style={styles.containerBoxBarberSecundario}>
            {selectedBarbeiro?.foto ? (
              <Image source={selectedBarbeiro.foto} style={styles.barberImage} />
            ) : (
              <Image source={require('../../../assets/images/Person.png')} style={styles.barberImage} />
            )}

            <Text style={styles.boxBarberText}>
              {selectedBarbeiro?.nome || 'Barbeiro Aleatório'}
            </Text>
          </View>

          <Text style={styles.boxServiceTitle}>Alterar</Text>
        </TouchableOpacity>

        <View style={styles.dateHeader}>
            <Text style={styles.subTitle}>Selecione uma data</Text>
            {selectedDate && <Text style={styles.selectedDateText}>{formatDate(selectedDate)}</Text>}
        </View>

        <View style={styles.containerBoxData}>
          <TouchableOpacity 
            style={[styles.buttonData, activeDateButton === 'hoje' && styles.buttonDataSelected]}
            onPress={() => selectDatePreset('hoje')}
          >
            <Text style={[styles.buttonDataText, activeDateButton === 'hoje' && styles.buttonDataTextSelected]}>Hoje</Text>
          </TouchableOpacity>
          <TouchableOpacity 
             style={[styles.buttonData, activeDateButton === 'amanha' && styles.buttonDataSelected]}
             onPress={() => selectDatePreset('amanha')}
          >
            <Text style={[styles.buttonDataText, activeDateButton === 'amanha' && styles.buttonDataTextSelected]}>Amanhã</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.buttonDataSeccond, activeDateButton === 'custom' && styles.buttonDataSelected]} 
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={[styles.buttonDataText, activeDateButton === 'custom' && styles.buttonDataTextSelected]}>Escolher dia</Text>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate || new Date()}
            mode="date"
            display="default"
            onChange={handleDateSelection}
            minimumDate={new Date()} // Não permite selecionar datas passadas
          />
        )}

        <Text style={styles.subTitle}>Selecione um horário</Text>
        
        {selectedDate && availableTimes.length === 0 && (
            <Text style={styles.noTimeText}>
                {selectedDate.getDay() === 0 ? "Fechado aos domingos." : "Não há horários disponíveis."}
            </Text>
        )}

        <View style={styles.containerBoxHorarios}>
          {availableTimes.map((hora, index) => (
            <TouchableOpacity 
                key={index} 
                style={[
                    styles.horarioButton, 
                    selectedTime === hora && styles.horarioButtonSelected
                ]}
                onPress={() => setSelectedTime(hora)}
            >
              <Text style={[styles.horarioText, selectedTime === hora && styles.horarioTextSelected]}>{hora}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.buttonAgendar} onPress={handleConfirmAgendamento}>
          <Text style={styles.buttonText}>Confirmar Agendamento</Text>
        </TouchableOpacity>

      </ScrollView>

      {showBarbeiroModal && (
        <Modal visible={true} transparent={true} animationType="fade">
          <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowBarbeiroModal(false)} activeOpacity={1}>
            <View style={styles.modalContainer}>

              <Text style={styles.subTitleModal}>Selecione um barbeiro</Text>

              <View style={styles.modalContainerBarbers}>
                {barbeiros.map((barbeiro, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.buttonsModalBarber}
                    onPress={() => {
                      setSelectedBarbeiro(barbeiro);
                      setShowBarbeiroModal(false);
                    }}
                  >
                    <Image source={barbeiro.foto} style={{ width: 60, height: 60, borderRadius: 30 }} />
                    <Text style={styles.modalBarberText}>
                      {barbeiro.nome.includes(' ') ? barbeiro.nome.split(' ').join('\n') : barbeiro.nome}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      )}

      <Modal visible={errorModalVisible} transparent={true} animationType="fade" onRequestClose={toggleModalError}>
        <TouchableOpacity activeOpacity={1} onPressOut={toggleModalError} style={styles.modalOverlay}>
          <TouchableOpacity activeOpacity={1} style={styles.modalContainer}>
            <Text style={styles.modalTitleErro}>Atenção</Text>
            {/* Usa a mensagem do estado */}
            <Text style={styles.modalText}>{errorModalMessage}</Text> 
            <TouchableOpacity style={styles.buttonContainer} onPress={toggleModalError}>
              <Text style={styles.buttonTextModal}>Fechar</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

    </View>
  );
}
