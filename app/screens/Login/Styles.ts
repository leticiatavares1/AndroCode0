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
    title: {
      fontSize: 32,
      fontFamily: "Poppins_700Bold",
      color: "#ffffff",
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
      marginBottom:10,
      paddingHorizontal: 10,
    },
    esqueceuSenha: {
      color:"#C9A64D",
      fontFamily: "Poppins_400Regular",
      textAlign: "right",
      marginBottom: 24,
    },
    criarConta: {
      marginTop: 24,
      fontFamily: "Poppins_400Regular",
      textAlign: "center",
      color: '#ffffff',
    },
    criarContaLink: {
      color: "#C9A64D",
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
    logo: {
      display: "flex",
      justifyContent:"center",
      alignItems: "center",
    },
    logoImage: {
      height: 200,
      width: 200,
    },
    showPasswordStyle: {
      color: "#A1A1A1",
      fontSize: 14,
      fontFamily: "Poppins_400Regular",
    },
    iconStyles: {
      marginRight: 5,
    },
    checkIcon: {
      alignItems: 'center',
      marginBottom: 24,
    },
    modalContentGood: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 20,
      minHeight: '30%',
      justifyContent: 'center',
    },
    modalTextGood: {
      fontFamily: 'Poppins_400Regular',
      fontSize: 14,
      color: '#000000',
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
  
export default styles