import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  containerGeral: {
    flex: 1,
    backgroundColor: '#18212A',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingTop: 18 ,
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 24,
  },
  containerBoxSelect: {
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#C9A64D",
    backgroundColor: "#1E2A38",
  },
  boxSelect: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  boxTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontFamily:'Poppins_400Regular',
  },
  boxServiceTitle: {
    color: "#ffffff",
    fontSize: 16,
  },
  boxServicePrice: {
    color: "#C9A64D", 
    fontSize: 14, 
  },
  agendarButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#C9A64D',
    borderRadius: 6,
    alignItems: 'center',
  },
  agendarButtonText: {
    color: '#18212A',
    fontSize: 14,
    fontWeight: 'bold',
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
});

export default styles