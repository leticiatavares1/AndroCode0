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
    logo: {
        display: "flex",
        justifyContent:"center",
        alignItems: "center",
        marginBottom: 50,
      },
      title: {
        fontSize: 32,
        fontFamily: "Poppins_700Bold",
      },
      textoEsqueceuSenha: {
        fontSize: 16,
        fontFamily: "Poppins_400Regular"
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
      button: {
        backgroundColor: "#18212A",
        padding: 8,
        borderRadius: 10,
        marginTop: 22,
      },
      buttonText: {
        fontFamily: "Poppins_400Regular",
        textAlign: "center",
        color: "#ffffff",
        fontSize: 16,
      },
});
  
export default styles;