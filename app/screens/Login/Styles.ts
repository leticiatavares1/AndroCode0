import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    containerGeral: {
      flex: 1,
      padding: 20,
      backgroundColor: "white",
    },
    containerSecundario: {
      marginTop: 50,
    },
    title: {
      fontSize: 32,
      fontFamily: "Poppins_700Bold",
      color: "black",
    },
    input: {
      height: 40,
      flex: 1,
      borderColor: "black",
      borderBottomWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 5,
      paddingBottom: 0,
      fontFamily: "Poppins_400Regular"
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    esqueceuSenha: {
      color:"#A0A0A0",
      fontFamily: "Poppins_400Regular",
      textAlign: "right",
      marginBottom: 24,
    },
    criarConta: {
      marginTop: 24,
      fontFamily: "Poppins_400Regular",
      textAlign: "center",
    },
    criarContaLink: {
      color: "#A0A0A0",
    },
    button: {
      backgroundColor: "#18212A",
      padding: 8,
      borderRadius: 10,
    },
    buttonText: {
      fontFamily: "Poppins_400Regular",
      textAlign: "center",
      color: "#ffffff",
      fontSize: 16,
    },
    logo: {
      display: "flex",
      justifyContent:"center",
      alignItems: "center",
      marginBottom: 80,
    }
  });
  
export default styles