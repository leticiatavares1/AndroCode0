import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
containerGeral: {
    flex: 1,
    backgroundColor: "#18212A",
    padding: 20,
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    color: "#ffffff",
    textAlign: "center",
  },
  containerSecundario: {
    alignItems: "center",
    justifyContent:"center",
    flex: 1,
  },
  icon: {
    marginBottom: 15,
  },
  text: {
    fontFamily: "Poppins_400Regular",
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center"
  },
  link: {
    color: "#C9A64D",
  },
  buttonText: {
    color: '#18212A',
    fontFamily: 'Poppins_400Regular',
  },
  buttonVoltar: {
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#C9A64D',
    borderRadius: 10,
  },
});

export default styles