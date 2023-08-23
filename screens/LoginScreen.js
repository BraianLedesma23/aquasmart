import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from "axios"
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
const navigation = useNavigation();

  const [email, setEmail] = useState(''); // Agrega estado para username
  const [password, setPassword] = useState(''); // Agrega estado para password

  async function submit() {
    try {
      const res = await axios.post("http://192.168.100.15:9000/", {
        email,
        password,
      });
   // 172.18.3.51
      if (res.data === "exist") {
        navigation.navigate('PeceraScreen',{ id: email }); //AQUI VA LA REDIRECCION DE LA PAGINA DESPUES DE LOGIN
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
      <Image source={require('../assets/images/logosin.png')} style={styles.logo} />
      <Text style={styles.title}>Iniciar Sesion</Text>
      <View style={styles.section}>
        <Text style={styles.fieldTitle}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="email"
          onChangeText={text => setEmail(text)} // Actualiza el estado de username
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.fieldTitle}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)} // Actualiza el estado de password
        />
      </View>
      <View style={styles.loginsection}>
        <Button title="Login" onPress={submit} />
      </View>
      <View style={styles.registerSection}>
        <Button title="Registrarse" onPress={() => navigation.navigate('Registro')} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('AdminScreen')}>
        <Text style={styles.adminLink}>Administrador Aqua-Smart</Text>
      </TouchableOpacity>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  logo: {
    width: 200,
    height: 120,
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  section: {
    marginVertical: 10,
  },
  registerSection: {
    marginVertical: 40,
    marginTop: 10,
    width: 150,
    height: 50,
  },
  loginsection: {
    marginVertical: 0,
    marginTop: 10,
    width: 150,
    height: 50,
  },
  adminLink: {
    color: 'black',
    textDecorationLine: 'underline',
    marginTop: 20,
  },
  fieldTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 3,
    fontSize: 18,
    padding: 10,
    width: 300,
  },
});

export default LoginScreen;
