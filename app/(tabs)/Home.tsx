import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth, database } from '../../firebase/firebaseConfig';
import { ref, onValue } from 'firebase/database';

export default function Home() {

  const [userName, setUserName] = useState('');
  
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

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>Olá {userName ? userName : 'Usuário'}</Text>
        </View>

        <View style={styles.placeholder} />

        <Text style={styles.sectionTitle}>Agende seu horário</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.serviceBox}>
            <View style={styles.serviceImage} />
            <Text style={styles.label}>Cabelo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.serviceBox}>
            <View style={styles.serviceImage} />
            <Text style={styles.label}>Barba</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.serviceBox}>
            <View style={styles.serviceImage} />
            <Text style={styles.label}>Sobrancelha</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Conheça nossos profissionais</Text>
        <View style={styles.row}>
          <View style={styles.proBox}>
            <View style={styles.proImage} />
            <Text style={styles.label}>Barbeiro 1</Text>
          </View>
          <View style={styles.proBox}>
            <View style={styles.proImage} />
            <Text style={styles.label}>Barbeiro 2</Text>
          </View>
          <View style={styles.proBox}>
            <View style={styles.proImage} />
            <Text style={styles.label}>Barbeiro 3</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 30,
    paddingBottom: 100,
  },
  greetingContainer: {
    marginTop: 40,
    marginBottom: 40,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  placeholder: {
    height: 150,
    backgroundColor: '#ddd',
    borderRadius: 10,
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
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
    width: 70,
    height: 70,
    backgroundColor: '#ddd',
    borderRadius: 10,
    marginBottom: 5,
  },
  proBox: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  proImage: {
    width: 70,
    height: 90,
    backgroundColor: '#ddd',
    borderRadius: 10,
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    textAlign: 'center',
  },
});
