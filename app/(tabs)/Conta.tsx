import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, StatusBar, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { auth, database } from '../../firebase/firebaseConfig';
import { ref, onValue, getDatabase, update } from 'firebase/database';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updatePassword, signOut, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { useRouter } from "expo-router";

export default function Conta() {

  const [userName, setUserName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editField, setEditField] = useState<'name' | 'lastName' | null>(null);
  const [newValue, setNewValue] = useState('');
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [passwordStep, setPasswordStep] = useState<'check' | 'new'>('check');
  const [currentPassword, setCurrentPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorModalMessage, setErrorModalMessage] = useState('');
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [goodModalMessage, setGoodModalMessage] = useState('');
  const [goodModalVisible, setGoodModalVisible] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const db = getDatabase();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("../screens/Login");
    } catch (error) {
      showErrorModal('Erro ao sair: ' + (error as Error).message);
    }
  };

  const updatePasswordHandler = async () => {
    if (!newPassword || !confirmNewPassword) {
      showErrorModal('Preencha todos os campos.');
      return;
    }
    
    if (newPassword !== confirmNewPassword) {
      showErrorModal('As senhas não coincidem.');
      return;
    }

    const user = auth.currentUser;
    if (!user) return;

    try {
      await updatePassword(user, newPassword);
      setIsEditingPassword(false);
      setNewPassword('');
      setConfirmNewPassword('');
      setCurrentPassword('');
      setPasswordStep('check');
      showGoodModal('Senha atualizada com sucesso!');

      setTimeout(() => {
        setGoodModalVisible(false);
      }, 4000);

    } catch (error) {
      showErrorModal('Erro ao atualizar a senha.');
    }
  };

  const verifyCurrentPassword = async () => {
    const user = auth.currentUser;
    if (!user || !user.email) return;

    const credential = EmailAuthProvider.credential(user.email, currentPassword);

    try {
      await reauthenticateWithCredential(user, credential);
      setPasswordStep('new');
    } catch (error) {
      showErrorModal('Senha incorreta.');
    }
  };

  const handleClosePasswordModal = () => {
    setIsEditingPassword(false);
    setPasswordStep('check');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  const showErrorModal = (message: string) => {
    setErrorModalMessage(message);
    setErrorModalVisible(true);

    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    //setPasswordStep('check');
  };

  const showGoodModal = (message: string) => {
    setGoodModalMessage(message);
    setGoodModalVisible(true);
  };

  const openEditModal = (field: 'name' | 'lastName') => {
  setEditField(field);
  setNewValue(field === 'name' ? userName : userLastName);
  setIsEditingName(true);
  };

  const saveNewValue = async () => {
    const user = auth.currentUser;
    if (!user || !editField) return;

    const userRef = ref(database, `usuarios/${user.uid}`);

    try {
      await update(ref(db, `usuarios/${user.uid}`), {
        [editField === 'name' ? 'Name' : 'LastName']: newValue,
      });

      if (editField === 'name') setUserName(newValue);
      else setUserLastName(newValue);

      setIsEditingName(false);
      setEditField(null);
      setNewValue('');
      showGoodModal('Nome ou Sobrenome atualizado com sucesso!');
    } catch (error) {
      showErrorModal('Erro ao atualizar nome.');
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModalError = () => {
    setErrorModalVisible(false);
  };

  const toggleModalGood = () => {
    setGoodModalVisible(false);
  };

  const handleChangePhoto = async () => {
  // Solicita permissão
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permissionResult.granted) {
    alert("Permissão para acessar a galeria é necessária!");
    return;
  }

  // Abre galeria
  const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!result.canceled) {
      const selectedAsset = result.assets[0];
    
      // Define o caminho local para salvar a imagem
      const fileName = selectedAsset.uri.split('/').pop();
      const localUri = (FileSystem.documentDirectory ?? '') + fileName;
    
      // Copia a imagem para o armazenamento interno do app
      await FileSystem.copyAsync({
        from: selectedAsset.uri,
        to: localUri,
      });
    
      setImageUri(localUri); // Atualiza imagem no estado
      await AsyncStorage.setItem('userProfileImage', localUri);
    }
  };

  useEffect(() => {
    const user = auth.currentUser;

    const loadImage = async () => {
      const storedImage = await AsyncStorage.getItem('userProfileImage');
      if (storedImage) {
        setImageUri(storedImage);
      }
    };

    if (user) {
      const userRef = ref(database, `usuarios/${user.uid}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data && data.Name) {
          setUserName(data.Name);
          setUserLastName(data.LastName);
          setUserEmail(data.Email);
        }
      });
    }

    loadImage(); // <-- carrega imagem local salva
  }, []);

  return (
    <View style={styles.container}>

      <StatusBar
        backgroundColor="#18212A"
        barStyle="light-content"
      />

      <Text style={styles.title}>Conta</Text>

      <View style={styles.containerImage}>
        <Image
          source={imageUri ? { uri: imageUri } : require('../../assets/images/Person.png')}
          style={styles.perfilImage}
        />
      </View>

      <TouchableOpacity style={styles.buttonContainer} onPress={handleChangePhoto}>
        <Text style={styles.buttonText}>Trocar Foto</Text>
      </TouchableOpacity>

      <View style={styles.containerName}>
        <Feather name="user" size={24} color="#ffffff" />
        <View style={styles.loginTextContainer}>
          <Text style={styles.textName}>Nome</Text>
          <Text style={styles.textNameSecundario}>{userName ? userName : 'Carregando...'}</Text>
        </View>
        {/*
        <TouchableOpacity style={styles.buttonContainerAlterar} onPress={() => openEditModal('name')}>
          <Text style={styles.buttonText}>Alterar</Text>
        </TouchableOpacity>
        */}
      </View>

      <View style={styles.containerName}>
        <Feather name="user" size={24} color="#ffffff" />
        <View style={styles.loginTextContainer}>
          <Text style={styles.textName}>Sobrenome</Text>
          <Text style={styles.textNameSecundario}>{userLastName ? userLastName : 'Carregando...'}</Text>
        </View>
        {/*
        <TouchableOpacity style={styles.buttonContainerAlterar} onPress={() => openEditModal('lastName')}>
          <Text style={styles.buttonText}>Alterar</Text>
        </TouchableOpacity>
        */}
      </View>

      <View style={styles.containerName}>
        <Feather name="mail" size={24} color="#ffffff" />
        <View style={styles.loginTextContainer}>
          <Text style={styles.textName}>E-mail</Text>
          <Text style={styles.textNameSecundario}>{userEmail ? userEmail : 'Carregando...'}</Text>
        </View>
        {/*
        <TouchableOpacity style={styles.buttonContainerAlterar} onPress={() => openEditModal('name')}>
          <Text style={styles.buttonText}>Alterar</Text>
        </TouchableOpacity>
        */}
      </View>

      <View style={styles.containerName}>
        <Feather name="lock" size={24} color="#ffffff" />
        <View style={styles.loginTextContainer}>
          <Text style={styles.textName}>Senha</Text>
          <Text style={styles.textNameSecundario}>**********</Text>
        </View>
        <TouchableOpacity style={styles.buttonContainerAlterar} onPress={() => setIsEditingPassword(true)}>
          <Text style={styles.buttonText}>Alterar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.optionContainer} onPress={toggleModal}>
        <Feather name="file-text" size={24} color="#ffffff" />
        <Text style={styles.optionText}>Termos e condições de uso</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSair} onPress={handleLogout}>
        <Text style={styles.buttonTextSair}>Sair</Text>
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.modal}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
      >
        <View style={styles.modalContentTermos}>
          <View style={styles.modalTermosAbaixar} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.modalTitle}>Termos e Condições de Uso</Text>
            <Text style={styles.modalText}>
              Este app tem como objetivo facilitar o agendamento de horários em barbearias. Ao utilizá-lo, você concorda com os seguintes termos:
            </Text>
            <Text style={styles.modalText}>
              1. Uso pessoal: Este app é destinado ao uso pessoal e exclusivo da barbearia cadastrada.
            </Text>
            <Text style={styles.modalText}>
              2. Informações do usuário: O usuário é responsável pelas informações inseridas (como nome, login e senha).
            </Text>
            <Text style={styles.modalText}>
              3. Limitações: O desenvolvedor não se responsabiliza por falhas técnicas, perda de dados ou eventuais bugs.
            </Text>
            <Text style={styles.modalText}>
              4. Privacidade: Nenhuma informação sensível é compartilhada com terceiros.
            </Text>
            <Text style={styles.modalText}>
              5. Atualizações: Este app pode ser atualizado ou descontinuado a qualquer momento.
            </Text>
            <Text style={styles.modalText}>
              6. Aceitação: Ao continuar utilizando este aplicativo, você aceita estes termos.
            </Text>
            <Text style={styles.modalText}>
              Em caso de dúvidas, entre em contato com a equipe de suporte.
            </Text>
            <TouchableOpacity onPress={toggleModal} style={styles.buttonFechar}>
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>

      <Modal isVisible={isEditingName} onBackdropPress={() => setIsEditingName(false)}>
        <View style={styles.modalContentInput}>
          <Text style={styles.modalTitle}>Alterar {editField === 'name' ? 'Nome' : 'Sobrenome'}</Text>
          <Text style={styles.modalText}>Para alterar seu {editField === 'name' ? 'nome' : 'sobrenome'} basta inserir o novo {editField === 'name' ? 'nome' : 'sobrenome'} desejado.</Text>
          <TextInput
            style={styles.passwordInput}
            value={newValue}
            onChangeText={setNewValue}
          />
          <TouchableOpacity onPress={saveNewValue} style={styles.buttonFechar}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal isVisible={isEditingPassword} onBackdropPress={handleClosePasswordModal}>
        <View style={styles.modalContentInput}>
          {passwordStep === 'check' ? (
            <>
              <Text style={styles.modalTitle}>Alterar Senha</Text>
              <Text style={styles.modalText}>Para continuar, primeiro confirme sua senha atual.</Text>
              <View style={styles.inputSenhaContainer}>
                <TextInput
                  placeholder="Senha atual"
                  placeholderTextColor={'#a1a1a1'}
                  secureTextEntry={!showCurrentPassword}
                  style={styles.passwordInput}
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                />
                <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
                  <Text style={{ color: '#a1a1a1'}}>
                    {showCurrentPassword ? 'Ocultar' : 'Mostrar'}
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.buttonContainer} onPress={verifyCurrentPassword}>
                <Text style={styles.buttonText}>Verificar</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.modalTitle}>Nova senha</Text>
              <Text style={styles.modalText}>Insira sua nova senha.</Text>
              <View style={styles.inputSenhaContainer}>
                <TextInput
                  placeholder="Nova senha"
                  placeholderTextColor={'#a1a1a1'}
                  secureTextEntry={!showNewPassword}
                  style={styles.passwordInput}
                  value={newPassword}
                  onChangeText={setNewPassword}
                />
                <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                  <Text style={{ color: '#a1a1a1'}}>
                    {showNewPassword ? 'Ocultar' : 'Mostrar'}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.inputSenhaContainer}>
                <TextInput
                  placeholder="Confirmar nova senha"
                  placeholderTextColor={'#a1a1a1'}
                  secureTextEntry={!showConfirmPassword}
                  style={styles.passwordInput}
                  value={confirmNewPassword}
                  onChangeText={setConfirmNewPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Text style={{ color: '#a1a1a1'}}>
                    {showConfirmPassword ? 'Ocultar' : 'Mostrar'}
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.buttonContainer} onPress={updatePasswordHandler}>
                <Text style={styles.buttonText}>Alterar senha</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>

      <Modal isVisible={errorModalVisible} onBackdropPress={() => setErrorModalVisible(false)}>
        <View style={styles.modalContentErro}>
          <Text style={styles.modalTitleErro}>Erro</Text>
          <Text style={styles.modalText}>{errorModalMessage}</Text>

          <TouchableOpacity style={styles.buttonContainer} onPress={toggleModalError}>
            <Text style={styles.buttonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

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
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    alignSelf: 'center',
    marginBottom: 24,
    color: '#ffffff',
  },
  containerName: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  loginTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%', 
  },
  optionText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    borderBottomColor: '#ffffff',
    borderBottomWidth: 1.5,
    paddingBottom: 4,
    color: '#ffffff',
  },
  perfilImage: {
    borderRadius: 100,
    height: 80,
    width: 80,
    borderWidth: 2,
    borderColor: '#C9A64D'
  },
  containerImage: {
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonContainer: {
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#C9A64D',
    marginBottom: 24,
    borderRadius: 10,
  },
  buttonText: {
    color: '#18212A',
    fontFamily: 'Poppins_400Regular',
  },
  buttonTextSair: {
    color: '#ffffff',
    fontFamily: 'Poppins_400Regular',
  },
  buttonContainerAlterar: {
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#C9A64D',
    borderRadius: 10,
  },
  textName: {
    fontFamily: 'Poppins_400Regular',
    color: '#ffffff',
  },
  textNameSecundario: {
    fontFamily: 'Poppins_400Regular',
    color: '#A1A1A1',
  },
  buttonSair: {
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#C70039',
    marginTop: 50,
    borderRadius: 10,
  },
  modal: {
  justifyContent: 'flex-end',
  margin: 0,
  },
  modalContentTermos: {
    backgroundColor: '#50687F',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: '50%',
  },
  modalTermosAbaixar: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#cccccc',
    alignSelf: 'center',
    marginBottom: 10,
  },
  modalContentInput: {
    backgroundColor: '#50687F',
    padding: 20,
    borderRadius: 20,
    minHeight: '30%',
  },
  modalContentErro: {
    backgroundColor: '#50687F',
    padding: 20,
    borderRadius: 20,
    minHeight: '30%',
    justifyContent: 'center',
  },
  modalContentGood: {
    backgroundColor: '#50687F',
    padding: 20,
    borderRadius: 20,
    minHeight: '30%',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    marginBottom: 10,
    color:'#ffffff',
  },
  modalTitleErro: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    marginBottom: 10,
    color: '#C70039',
  },
  modalText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 24,
    textAlign: "justify",
  },
  modalTextGood: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 24,
    textAlign: 'center',
  },
  buttonFechar: {
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#C9A64D',
    borderRadius: 10,
  },
  passwordInput: {
  flex: 1,
  paddingVertical: 10,
  fontFamily: 'Poppins_400Regular',
  color: '#ffffff',
  },
  checkIcon: {
    alignItems: 'center',
    marginBottom: 24,
  },
  inputSenhaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 24,
    paddingHorizontal: 10,
    borderColor: '#a1a1a1',
  },
});
