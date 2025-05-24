import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking, StatusBar } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';


export default function Informacoes() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >

      <StatusBar
              backgroundColor="#18212A"
              barStyle="light-content"
      />

      <View style={styles.containerGeral}>
        <Text style={styles.title}>Localização</Text>

        <TouchableOpacity style={styles.containerSecundario} onPress={() => Linking.openURL("https://maps.app.goo.gl/b3ZoZUFwzBmU6SQC6")}>
          <Image source={require('../../assets/images/Localizacao.png')} style={styles.boxMap}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.containerInfo} onPress={() => Linking.openURL("https://maps.app.goo.gl/b3ZoZUFwzBmU6SQC6")}>
          <Feather name="map-pin" size={24} color="#ffffff" />
          <View style={styles.textWrapper}>
            <Text style={styles.textInfo}>
              R. Ferreira Penteado, 577 - Centro, Campinas - SP, 13010-040
            </Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.title}>Horário de atendimento</Text>

        <View style={styles.containerInfo}>
          <Feather name="clock" size={24} color="#ffffff" />
          <View style={styles.textWrapper}>
            <Text style={styles.textInfo}>
              <Text style={styles.textInfoBold}>Segunda-Feira a Sexta-Feira: </Text>
              09:00 às 19:00
            </Text>
            <Text style={styles.textInfo}>
              <Text style={styles.textInfoBold}>Sábado: </Text>
              08:00 às 17:00
            </Text>
            <Text style={styles.textInfo}>
              <Text style={styles.textInfoBold}>Domingo: </Text>
              Fechado
            </Text>
          </View>
        </View>

        <Text style={styles.title}>Contato</Text>

        <TouchableOpacity style={styles.containerMaisInfo} onPress={() => Linking.openURL("tel:+5519989434467")}>
          <Feather name="phone" size={24} color="#ffffff" />
          <View style={styles.textWrapper}>
            <Text style={styles.textInfo}>(19) 98943-4467</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.containerMaisInfo} onPress={() => Linking.openURL("https://www.instagram.com/wolfstudiobarber_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==")}>
          <MaterialCommunityIcons name="instagram" size={30} color="#833AB4" />
          <View style={styles.textWrapper}>
            <Text style={styles.textInfo}>Instagram</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.containerMaisInfo} onPress={() => Linking.openURL("https://wa.me/5519989434467")}>
          <MaterialCommunityIcons name="whatsapp" size={30} color="#128c7e" />
          <View style={styles.textWrapper}>
            <Text style={styles.textInfo}>WhatsApp</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.title}>Mais Informações</Text>

        <View style={styles.containerMaisInfo}>
          <Feather name="dollar-sign" size={24} color="#ffffff" />
          <View style={styles.textWrapper}>
            <Text style={styles.textInfo}>
              <Text style={styles.textInfoBold}>Formas de pagamento: </Text>
              Visa, MasterCard, Cartão de Débito, Cartão de Crédito, Dinheiro, Pix
            </Text>
          </View>
        </View>

        <View style={styles.containerMaisInfo}>
          <Feather name="users" size={24} color="#ffffff" />
          <View style={styles.textWrapper}>
            <Text style={styles.textInfo}>
              <Text style={styles.textInfoBold}>Facilidades: </Text>
              Wi-Fi, Atendemos adultos e crianças, Televisão.
            </Text>
          </View>
        </View>

        <View style={styles.containerMaisInfo}>
          <Feather name="globe" size={24} color="#ffffff" />
          <View style={styles.textWrapper}>
            <Text style={styles.textInfo}>
              <Text style={styles.textInfoBold}>Idiomas: </Text>
              Português
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerGeral: {
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
  boxMap: {
    height: 200,
    width: 365,
    backgroundColor: '#000000',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 24,
  },
  containerSecundario: {
    alignItems: 'center',
  },
  containerInfo: {
    flexDirection: 'row',
    alignItems: "center",
    marginBottom: 24,
  },
  containerMaisInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  textWrapper: {
    flex: 1,
    marginLeft: 10,
  },
  textInfo: {
    fontFamily: 'Poppins_400Regular',
    flexWrap: 'wrap',
    color: '#ffffff',
  },
  textInfoBold: {
    fontFamily: 'Poppins_700Bold',
  },
});
