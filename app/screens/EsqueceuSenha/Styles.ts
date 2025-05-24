import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  containerGeral: {
    flex: 1,
    padding: 20,
    backgroundColor: "#18212A",
  },
  containerSecundario: {
    marginTop: 40,
  },
  logo: {
    display: "flex",
    justifyContent:"center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontFamily: "Poppins_700Bold",
    color:'#ffffff',
  },
  textoEsqueceuSenha: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color:'#ffffff',
  },
  input: {
    flex: 1,
    fontFamily: "Poppins_400Regular",
    color: '#ffffff',
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: '#A1A1A1',
    borderRadius: 10,
    padding: 8,
    marginBottom:24,
    marginTop: 24,
    paddingHorizontal: 10,
  },
  iconStyles: {
    marginRight: 5,
  },
  button: {
    backgroundColor: "#C9A64D",
    padding: 8,
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    color: "#18212A",
    fontSize: 16,
  },
  logoImage: {
  height: 200,
  width: 200,
  },
  modalContentGood: {
    backgroundColor: '#50687F',
    padding: 20,
    borderRadius: 20,
    minHeight: '30%',
    justifyContent: 'center',
  },
  checkIcon: {
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTextGood: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 24,
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#C9A64D',
    marginBottom: 24,
    borderRadius: 10,
  },
  modalTitleErro: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    marginBottom: 10,
    color: '#C70039',
  },
    modalContentErro: {
    backgroundColor: '#50687F',
    padding: 20,
    borderRadius: 20,
    minHeight: '30%',
    justifyContent: 'center',
  },
    modalText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 24,
  },
    buttonTextModal: {
    color: '#18212A',
    fontFamily: 'Poppins_400Regular',
  },
});
  
export default styles;