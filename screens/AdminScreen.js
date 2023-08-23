import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from "axios"
import { useNavigation } from '@react-navigation/native';

const AdminScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit() {
    try {
      const res = await axios.post("http://192.168.100.15:9000/admin-login", {
        email,
        password,
      });

      if (res.data === "exist") {
        navigation.navigate('HomeScreen', { id: email });
      } else if (res.data === "incorrectPassword") {
        alert("Contraseña incorrecta");
      } else if (res.data === "notexist") {
        alert("El usuario no se ha registrado");
      }
    } catch (error) {
      alert("Error al procesar la solicitud");
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Administrador Aqua-Smart</Text>
      <View style={styles.section}>
        <Text style={styles.fieldTitle}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo de Administrador"
          onChangeText={text => setEmail(text)}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.fieldTitle}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
    
        <View style={styles.button}>
          <Button title="Volver" onPress={() => navigation.navigate('Login')} />
        </View>
        <View style={styles.button}>
          <Button title="Login" onPress={submit} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  section: {
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    marginHorizontal: 10,
    width: 150,
  },
  fieldTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 3,
    fontSize: 18,
    padding: 10,
    width: 300,
  },
});

export default AdminScreen;
